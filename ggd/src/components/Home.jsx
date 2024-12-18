import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.svg";
import game from "./images/game.svg";
import "./Home.scss";

const Home = () => {
  return (
    <div className="containerHome">
      <Link className="left-content" to="/idlecup">
        {/* <div className="select-logo">
          <img src={game} />
          
        </div> */}
        <div className="logotextleft">이상형월드컵</div>
      </Link>
      <div className="left-container"></div>

      <Link className="right-content" to="/ShoppingMall">
        <div className="logotextright">쇼핑몰</div>
      </Link>
      <div className="right-container"></div>

      <img className="logo" src={logo} />
    </div>
  );
};

export default Home;
