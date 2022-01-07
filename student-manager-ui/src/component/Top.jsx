import React from 'react';
import {NavBar} from "antd-mobile";
import {useNavigate} from "react-router-dom";

const Top = (props) => {
    const navigate = useNavigate()
    const back = () => {
        navigate("/")
    }
    return (
        <NavBar onBack={back}>
            {props.title}
        </NavBar>
    );
};

export default Top;
