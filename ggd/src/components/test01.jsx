import React from 'react';
import "./scss/Header.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fontawesome/free-solid-svg-icons";

//24-10-07 09:30 시작
const test01 = ({ lstate, onLogout }) => {
    const { logid, mlink } = lstate;
    const homeLink = logid === "" ? "/" : "/main";

    return (
        <div>
            
        </div>
    );
};

export default test01;