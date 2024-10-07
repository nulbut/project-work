import React from 'react';
import "./scss/Header.scss";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons";


const header = ({ lstate, onLogout }) => {
    const {logid, mlink} = lstate;
    const mainLink = logid === "" ? "/" : "main";
    return (
        <div>
            <Link to={mainLink}>
            <h1>GGD'S</h1>
            </Link>
            <div>
                <a href='main.jsx'>
                    <img src="1.JPG" alt="" />
                </a>
            </div>
            <div>
                <Link>
                <FontAwesomeIcon icon={faList} />
                </Link>
            </div>
        </div>
        
    );
};

export default header;