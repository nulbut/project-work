import React from "react";
import {Link} from "react-router-dom";
import logo from "./images/1.JPG";

const Header = () => {
  return <div>
    <Link to="/ShoppingMall">GGD'S</Link> 
    <Link to="/Idlecup" ><img src={logo} alt="logo" /></Link>
  
  </div>
};

export default Header;
