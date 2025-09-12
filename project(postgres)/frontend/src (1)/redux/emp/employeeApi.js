import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

export const fetchGetEmployee = createAsyncThunk(
    "fetchGetEmployee",
    async (_, thunkAPI ) => {
        try{
            const response = await axios.get("http://localhost:8000/app/emp/")
            return response.data;
        } catch (e){
            return thunkAPI.rejectWithValue("데이터 로드 실패");
        }

    }
)

export const fetchPostEmployee = createAsyncThunk(
    "fetchPostEmployee",
    async (emp, thunkAPI ) => {
        try{
            const response = await axios.post("http://localhost:8000/app/emp/", emp);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("데이터 전송 실패");
        }
    }
)

export const fetchDeleteEmployee = createAsyncThunk(
    "fetchDeleteEmployee",
    async (name, thunkAPI ) => {

        try{
            const response = await axios.delete(`http://localhost:8000/app/emp/${name}`);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("데이터 삭제 실패")
        }
    }
)

export const fetchPutEmployee = createAsyncThunk(
    "fetchPutEmployee",
    async (emp, thunkAPI ) => {
        console.log("Api", emp)
        try{
            const response = await axios.put(`http://localhost:8000/app/emp/${emp.name}`, emp);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("데이터 수정 실패")
        }
    }
)