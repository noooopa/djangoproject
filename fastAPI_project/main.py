import os, json
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from starlette.middleware.cors import CORSMiddleware
from redis import asyncio
from postgres_db import get_employees as get_employees_from_pg

URL = "redis://127.0.0.1:6379"
DATA = "employees"



class Employee(BaseModel):
    name: str = Field(..., max_length=100)
    age: int = Field(..., gt=0)
    job: str = Field(..., max_length=100)
    language: str = Field(..., max_length=100)
    pay: int = Field(..., ge=0)

app = FastAPI(title="employees")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

redis_client: asyncio.Redis | None = None

@app.on_event("startup")
async def startup():
    global redis_client
    redis_client = asyncio.from_url(URL, encoding="utf-8", decode_responses=True)

    existing = await redis_client.exists(DATA)
    print("existing", existing)
    if not existing:
        seed_json = get_employees_from_pg()  # 동기 함수 (await X)
        if seed_json:
            rows = json.loads(seed_json)               # [{"name":...}, ...]
            values = [json.dumps(row) for row in rows] # 각 항목을 개별 문자열로
            if values:
                await redis_client.rpush(DATA, *values)

@app.on_event("shutdown")
async def shutdown():
    if redis_client:
        await redis_client.close()

async def get_employees(skip: int = 0, limit: int = 100):
    emps = await redis_client.lrange(DATA, skip, limit)
    return [json.loads(x) for x in emps]

async def _find_index_by_name(name: str) -> Optional[int]:
    items = await redis_client.lrange(DATA, 0, -1)
    for idx, raw in enumerate(items):
        try:
            if json.loads(raw).get("name") == name:
                return idx
        except Exception:
            continue
    return None

@app.get("/app/emp/", response_model=List[Employee])
async def read_employees(skip: int = 0, limit: int = -1):
    rows = await get_employees(skip, limit)
    return [Employee(**x) for x in rows]

@app.post("/app/emp/")
async def register_employee(emp: Employee):
    await redis_client.rpush(DATA, emp.model_dump_json())
    return emp

@app.put("/app/emp/{name}", response_model=Employee)
async def update_employee(name: str, emp: Employee):
    if name != emp.name:
        raise HTTPException(status_code=400, detail="Path name and body name mismatch")

    idx = await _find_index_by_name(name)
    if idx is None:
        raise HTTPException(status_code=404, detail="employee not found")

    await redis_client.lset(DATA, idx, emp.model_dump_json())
    return emp

@app.delete("/app/emp/{name}")
async def delete_employee(name: str):
    idx = await _find_index_by_name(name)
    if idx is None:
        raise HTTPException(status_code=404, detail="employee not found")

    raw = await redis_client.lindex(DATA, idx)
    removed = await redis_client.lrem(DATA, 1, raw)
    return {"name": name, "deleted": bool(removed)}