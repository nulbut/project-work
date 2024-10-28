import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";

const IdPasswordFind2 = () => {
  const nav = useNavigate();
  //아이디 불러오기
  const { state } = useLocation();
  const { fid } = state;
  console.log(fid);

  //비밀번호 재설정으로 이동
  const changePass = () => {
    nav("/changepass", { state: { fid } });
  };

  //로그인 화면으로 이동
  const logingo = () => {
    nav("/login");
  };
  return (
    <div>
      <h1>아이디알려주는곳. 비밀번호 재설정할지 물어보기.</h1>
      <p>아이디 : {fid} 입니다.</p>
      <Button onClick={changePass}>비밀번호 재설정</Button>
      <Button onClick={logingo}>로그인</Button>
    </div>
  );
};

export default IdPasswordFind2;
