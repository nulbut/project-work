import React from "react";
import {Link} from "react-router-dom";
import logo from "./images/1.JPG";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons";


const Header = () => {
  return <div>
    <Link to="/ShoppingMall">GGD'S</Link> 
    <Link to="/Idlecup" ><img src={logo} alt="logo" /></Link>
    <FontAwesomeIcon icon={faList} />
  
  </div>
};

export default Header;
