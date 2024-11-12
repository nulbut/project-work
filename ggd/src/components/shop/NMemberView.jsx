import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";

const NMemberView = () => {
  const nav = useNavigate();
  const nnick = sessionStorage.getItem("nnickname");
  const id = sessionStorage.getItem("nid");

  const [nmemberInfo, setNmemberInfo] = useState({
    nid: id,
    npw : "",
    nname: "",
    nbday: "",
    nphonenum: "",
    nemail: "",
    naddress: "",
  });

  const { nid, nname, nbday, nphonenum, nemail, naddress } = nmemberInfo;

  useEffect(() => {
    axios
      .get("/getNMember", { params: { nid: id } })
      .then((res) => {
        setNmemberInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //회원수정으로 이동
  const updatego = () => {
    nav("NmUpdate", { state: { nid: id } });
  };
  return (
    <div className="Mypage">
      <div className="Title">
        <h3>{nnick}님 회원 정보</h3>
        <hr />
      </div>
      <div className="Titlesvr">
        <p>아이디 {id}</p>
        <p className="button">
          회원정보 변경 <Button onClick={updatego}>변경</Button>
        </p>
      </div>
      <div className="content1">
        <h4>회원정보</h4>
        <p>이름 {nname}</p>
        <p>생년월일 {nbday}</p>
        <p>전화번호 {nphonenum}</p>
        <p>이메일 {nemail}</p>
        <p>주소 {naddress}</p>
      </div>
      <div>
        <Link to="/nmemberSecession">회원탈퇴하기</Link>
      </div>
    </div>
  );
};

export default NMemberView;
