import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.svg";
import "./Home.scss";

const Home = () => {
  return (
    <div className="container">
      <Link className="left-content" to="/idlecup">
        {/* 이상형월드컵 */}
      </Link>
      <div className="left-container"></div>

      <Link className="right-content" to="/ShoppingMall">
        {/* 쇼핑몰 */}
      </Link>
      <div className="right-container"></div>

      <img className="logo" src={logo} />
    </div>
  );
};

export default Home;
