import React, { useEffect, useState } from "react";
import Button from "../idealcup/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./scss/BmemberView.scss";

const BMemberView = () => {
  const nav = useNavigate();
  const bnick = sessionStorage.getItem("nnickname");
  const id = sessionStorage.getItem("bid");

  //   const { state } = useLocation();
  //   const { id } = state;

  //   console.log(id);
  const [bmemberInfo, setBmemberInfo] = useState({
    bid: id,
    bcnum: "",
    bttype: "",
    bbreality: "",
    bbtype: "",
    bemail: "",
    baddress: "",
    bname: "",
    bbday: "",
    bphonenum: "",
    bbanknum: "",
    bbaccunt: "",
    bmname: "",
    bmphonenum: "",
    bmemail: "",
  });

  const {
    bid,
    bcnum,
    bttype,
    bbreality,
    bbtype,
    bemail,
    baddress,
    bname,
    bbday,
    bphonenum,
    bbanknum,
    bbaccunt,
    bmname,
    bmphonenum,
    bmemail,
  } = bmemberInfo;

  const [code, setCode] = useState("");
  const [buserCode, setBuserCode] = useState("");

  useEffect(() => {
    axios
      .get("/getBMemeber", { params: { bid: id } })
      .then((res) => {
        // console.log(res.data);
        setBmemberInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //회원수정으로 이동
  const updatego = () => {
    nav("/bmemberupdate", { state: { bid: id } });
  };



  return (
    <div className="Mypage">
      <div className="Title">
        <h3>{bnick}님 회원 정보</h3>
        <hr />
      </div>
      <div className="Titlesvr">
        <h4>아이디 <p>{id}</p></h4>
        <h4>사업자번호 <p>{bcnum}</p></h4>
        <p className="button">
          회원정보 변경 <Button onClick={updatego}>변경</Button>
        </p>
      </div>
      <hr />
      <div className="content1">
        <p>상호 : {bnick}</p>
        <p>과세유형 : {bttype}</p>
        <p>업태 : {bbreality}</p>
        <p>업종 : {bbtype}</p>
        <p>주소 : {baddress}</p>
      </div>
      <hr />
      <div className="content2">
        <h4>대표자</h4>
        <p>이름 : {bname}</p>
        <p>생년월일 : {bbday}</p>
        <p>전화번호 : {bphonenum}</p>
        <p>Email : {bemail}</p>
        <h4>정산 입금 계좌</h4>
        <p>은행 : {bbanknum}</p>
        <p>계좌번호 : {bbaccunt}</p>
        <h4>담당자</h4>
        <p>이름 : {bmname}</p>
        <p>전화번호 : {bmphonenum}</p>
        <p>Email : {bmemail}</p>
      </div>
      <div>
        <hr />
        <Link to={"/membersecession"}>회원탈퇴하기</Link>
      </div>
    </div>
  );
};

export default BMemberView;
