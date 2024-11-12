import Button from "./Button";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./scss/IdPasswordFind2.scss";

const IdPasswordFind2 = () => {
  const nav = useNavigate();
  const { state } = useLocation();
  const { fid } = state;

  console.log(fid);

  //비밀번호 재설정 이동
  const changpass = () => {
    nav("/changepass", { state: { fid: fid } });
  };
  return (
    <div className="IdPasswordFind2">
      <div className="message">아이디 {fid} 입니다.</div>
      <Button className="button" onClick={changpass}>
        비밀번호 재설정
      </Button>
    </div>
  );
};

export default IdPasswordFind2;
