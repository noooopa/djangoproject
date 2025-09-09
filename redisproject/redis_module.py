import redis
import psycopg2
from psycopg2 import connect

connect = psycopg2.connect(host="localhost", database="postgres", user="postgres", password="1234")




if __name__ == "__main__":
    r = redis.Redis(host='localhost', port=6379, db=0)

    emp_list = r.lrange("emp", 0, -1)
    [{key: value for key, value in r.getall(emp).items()} for emp in emp_list ]
    exit()


    r.set("name", "John")

    r.lpush("fruits", "apple", "banana", "orange")
    # print(r.lrange("fruits", 0, -1))

    r.hset("employee:1", mapping={
        "name": "John",
        "age": 22,
        "job": "frontend",
        "language": "Python",
        "pay": 400
    })
    r.hset("employee:2", mapping={
        "name": "Peter",
        "age": 22,
        "job": "frontend",
        "language": "Python",
        "pay": 400
    })
    r.hset("employee:3", mapping={
        "name": "Sue",
        "age": 22,
        "job": "frontend",
        "language": "Python",
        "pay": 400
    })
    r.hset("employee:4", mapping={
        "name": "Susan",
        "age": 22,
        "job": "frontend",
        "language": "Python",
        "pay": 400
    })

    r.lpush("emp",  "employee1","employee2", "employee3", "employee4")

    print(r.lrange("emp", 0, -1))

    emp1 = r.lpop("emp")
    print(emp1)