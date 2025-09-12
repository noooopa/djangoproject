import {createSlice, } from '@reduxjs/toolkit';
import {fetchDeleteEmployee, fetchPostEmployee, fetchGetEmployee} from "./employeeApi.js";

const initialInfo =  {
    name: "",
    age : "",
    job : "",
    language : "",
    pay : ""
}
const initialState = {
    infos: [],
    clicked: "",
    ctrl: "",
    info : initialInfo,
    loading: false,
    error: false,
}//외부에서 데이터 가져오기

const employeeSlice = createSlice({
    name: "employeeSlice", //의미 없음
    initialState, //key 와 value 값이 같기 때문에 생략
    reducers: {
        getClickName: (state, action) => { //state == prev. 이미 복사되어 있음
            state.clicked = action.payload;
        }, // 이름 받아오는 함수
        handleClick: (state, action) => {
            if (action.payload === "delete") {
                state.clicked = "";
                state.ctrl = "delete";
                state.info = initialInfo;
                return;
            }
            if (action.payload === "reset") {
                return {...state}
            }//action 은 인수를 받는 것
            state.ctrl = action.payload;
        }, //registry, delete, reset, update 시 페이지 보여주기
        // handleRegister: (state, action) => {
        //     if (state.infos.some(info => info.name === action.payload.name)) {
        //         return alert("이미 존재하는 이름입니다.")
        //     }//아이디 중복 확인
        //     state.infos = [...state.infos, action.payload];
        //     state.clicked = action.payload.name;
        // },//register 하는 버튼
        // handleUpdate: (state, action) => {
        //     state.infos = state.infos.map(info => info.name === action.payload.name ?
        //         action.payload : info);
        // }, //update 하는 버튼
        handleInfo: (state) => {
            console.log("info")
            if(state.clicked === "") state.info = initialInfo;
            state.info = state.infos.find(info => info.name === state.clicked);
        } //정보 가져오기
    },
    extraReducers: (builder) => {
        builder
            // fetchGet 처리
            .addCase(fetchGetEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGetEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.infos = action.payload;
            })
            .addCase(fetchGetEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // fetchPost 처리
            .addCase(fetchPostEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPostEmployee.fulfilled, (state, action) => {
                state.loading = false;
                const {payload} = action;
                delete payload.id
                state.info = payload;
            })
            .addCase(fetchPostEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // // fetchDelete 처리
            // .addCase(fetchDeleteEmployee.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            // .addCase(fetchDeleteEmployee.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.info = action.payload;
            // })
            // .addCase(fetchDeleteEmployee.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload;
            // })
    },



    //함수 짜는 곳. key value로 짠다.
})

export const {
    getClickName,
    handleClick,
    handleUpdate,
    handleRegister,
    handleInfo
} = employeeSlice.actions;
export default employeeSlice.reducer; //store에 저장하기 위해