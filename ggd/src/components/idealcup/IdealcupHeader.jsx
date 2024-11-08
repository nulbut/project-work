import React from "react";
import logo from "../images/logo.svg";
import "./scss/IdealcupHeader.scss";
import { Link } from "react-router-dom";

const IdealcupHeader = ({ lstate, onLogout }) => {
  const { loginid, mlink } = lstate;

  return (
    <header>
      <div className="header-content">
        GGD's 이상형 월드컵
        <img src={logo} />
      </div>
      <div className="ihc">
        <div className="Content2">
          <Link to={mlink} state={{ where: "ideal" }}>
            {loginid !== "" ? `${loginid}님` : "로그인"}
          </Link>

          {loginid !== "" ? (
            <span onClick={onLogout}>로그아웃</span>
          ) : (
            <Link to={"/joinchoice"}>회원가입</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default IdealcupHeader;
