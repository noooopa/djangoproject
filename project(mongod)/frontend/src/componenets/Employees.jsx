import React, {useEffect} from 'react';
import InfoTable from "./InfoTable.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getClickName, handleInfo} from "../redux/emp/employeeSlice.js";
import {fetchGetEmployee} from "../redux/emp/employeeApi.js";

const styles = {
    width:"60%",
    display : "flex",
    flexDirection : "row",
    justifyContent : "space-between",
    alignItems : "center",
    gap : "20px",
    padding : "20px",
    paddingBottom: "50px"
}
const Employees = () => {
    const {infos, clicked, info} = useSelector(state => state.employees);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(handleInfo());
    }, [dispatch, clicked, info])

    useEffect(() => {
        console.log("hello. emp")
        dispatch(fetchGetEmployee());
    }, [dispatch, info]);
    return (
        <>
            <div style={styles}>
            {infos.map((info, idx) => (
                <button
                    key={idx}
                    onClick={() => {dispatch(getClickName(info.name))}}>
                    {info.name}
                </button>
            ))}
            </div>
            <InfoTable />
        </>
    );
};

export default Employees;