import React from "react";
import logo from "../images/logo.svg";
import "./scss/IdealcupHeader.scss";

const IdealcupHeader = () => {
  return (
    <header>
      <div className="header-content">
        GGD's 이상형 월드컵
        <img src={logo} />
      </div>
    </header>
  );
};

export default IdealcupHeader;
