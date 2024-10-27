import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ChangePass = () => {
  //비밀번호 변경
  const nav = useNavigate();

  const { state } = useLocation();
  const { fid } = state;
  console.log(fid);
  return (
    <div>
      <h1>비밀번호 변경 화면</h1>
    </div>
  );
};

export default ChangePass;
