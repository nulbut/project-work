import React from "react";
import logo from "../images/logo.svg";
import "./scss/IdlecupHeader.scss";

const IdlecupHeader = () => {
  return (
    <header>
      <div>
        이상형 월드컵
        <img src={logo} />
      </div>
    </header>
  );
};

export default IdlecupHeader;
