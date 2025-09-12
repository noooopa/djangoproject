import React, {useEffect} from 'react';
import Employees from "./Employees.jsx";
import Register from "./Register.jsx";
import Update from "./Update.jsx";
import {useDispatch, useSelector} from "react-redux";
import {handleClick} from "../redux/emp/employeeSlice.js";
import {fetchGetEmployee, fetchDeleteEmployee} from "../redux/emp/employeeApi.js";

//데이터 받을 때는 selector, 함수를 받을 때는 dispatch

const controls = [
    "register", "update", "delete", "reset"
]

const style = {
    width: "60%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    padding : "20px"
}
const Main = () => {
    const {ctrl, info, clicked} = useSelector((state) => state.employees); //store에 있는 이름
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchGetEmployee())
    }, [dispatch,clicked, info]);
    const handleControl = (c) =>{
        dispatch(handleClick(c))
        if(ctrl === "delete"){
            dispatch(fetchDeleteEmployee(clicked))
        }
    }
    return (
        <>
            <div>
                <Employees  />
            </div>
            <div style={style}>
                {controls.map((control, index) => (
                    <button key={index} onClick={()=>handleControl(control)}>{control}</button>
                ))}
            </div>
            <div>
                {ctrl==="register" && (<Register />)}
                {ctrl==="update" && (
                    <Update/>)}
            </div>
        </>
    );
};

export default Main;