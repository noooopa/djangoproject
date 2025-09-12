import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPutEmployee} from "../redux/emp/employeeApi.js";

const initialState = {
    name:"",
    age:"",
    job:"",
    language:"",
    pay:""
}

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: "300px",
    margin : "20px auto",
    padding : "20px",
    border : "1px solid #ccc",
    borderRadius:"10px",
    backgroundColor:"#f9f9f9",
    boxShadow : "0 4px 8px rgba(0, 0, 0, 0.12)",
}

const labelStyle = {
    marginBottom: "10px",
    display : "flex",
    flexDirection: "column",
    fontWeight: "bold",
    color: "#333333",

}

const inputStyle = {
    padding : "10px",
    borderRadius:"10px",
    border: "1px solid #ccc",
    fontSize: "14px",
}

const Update = () => {
    const {clicked, infos} = useSelector(state => state.employees);
    const dispatch = useDispatch();
    const [employee, setEmployee] = useState(initialState);

    useEffect(() => {
        clicked && infos && setEmployee(infos.find(infos => infos.name === clicked))
    }, [infos, clicked]) //employee의 값은 이벤트 없이 불러와져야 하기 때문에 useEffect를 사용한다.
    //의존성으로 infos, clicked를 설정

    const handleChange = e => {
        const { name, value } = e.target;
        setEmployee( prev => ({...prev, [name] : value}));
    } //employee의 값을 name에 맞는 value로 설정
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchPutEmployee(employee));
    } //Main으로 employee 값을 보냄
        return (
            <>
                <form onSubmit={handleSubmit} style={formStyle}>
                    <label style={labelStyle}>이름
                        <input type="text" style={inputStyle} name="name" value={employee.name} disabled />
                    </label>
                    <label style={labelStyle}>나이
                        <input type="text" style={inputStyle} name="age" value={employee.age} onChange={handleChange} required={true} />
                    </label >
                    <label style={labelStyle}>직업
                        <input type="text" style={inputStyle} name="job" value={employee.job} onChange={handleChange} required={true} />
                    </label >
                    <label style={labelStyle}>언어
                        <input type="text" style={inputStyle} name="language" value={employee.language} onChange={handleChange} required={true} />
                    </label>
                    <label style={labelStyle}>급여
                        <input type="text" style={inputStyle} name="pay" value={employee.pay} onChange={handleChange} required={true} />
                    </label>
                    <button>제출</button>
                </form>
            </>
        );
    }


export default Update;