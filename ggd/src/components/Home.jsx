import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.svg";

const Home = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/idlecup">이상형월드컵</Link>
        </li>
        <li>
          <img src={logo} width={"50%"} />
        </li>
        <li>
          <Link to="/ShoppingMall">쇼핑몰</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
