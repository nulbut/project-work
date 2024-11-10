import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddressInput from "../AddressInput";
import Button from "./Button";

const NMemberUpdate = () => {
  const nav = useNavigate();
  const [addr, setAddr] = useState("");
  //아이디 받아오기
  const { state } = useLocation();
  const { nid } = state;
  console.log(nid);
  const [nmemberInfo, setNmemberInfo] = useState({
    nid: nid,
    nnickname: "",
    nname: "",
    nbday: "",
    nphonenum: "",
    nemail: "",
    naddress: "",
  });
  const { nname, nnickname, nbday, nphonenum, nemail, naddress } = nmemberInfo;

  //서버로 부터 회원 정보 받아오기
  useEffect(() => {
    axios
      .get("/getNMember", { params: { nid: nid } })
      .then((res) => {
        setNmemberInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const onch = useCallback(
    (e) => {
      const nmemberObj = {
        ...nmemberInfo,
        [e.target.name]: e.target.value,
      };
      setNmemberInfo(nmemberObj);
    },
    [nmemberInfo]
  );

  const onWrite = useCallback(
    (e) => {
      e.preventDefault(); //페이지 변환 방지하는 함수

      const nmemberfotmData = new FormData();
      console.log(nmemberfotmData);

      nmemberfotmData.append(
        "nmemberInfo",
        new Blob([JSON.stringify(nmemberInfo)], { type: "application/json" })
      );

      for (let key of nmemberfotmData.keys()) {
        console.log(key);
      }

      axios
        .post("/nmemberwriteProc", nmemberfotmData)
        .then((res) => {
          if (res.data === "ok") {
            alert("회원정보 수정 성공");
            nav("NMview", { state: { nid: nid } });
          } else {
            alert("수정 실패");
          }
        })
        .catch((err) => {
          alert("수정 애러");
          console.log(err);
        });
    },
    [nmemberInfo]
  );
  return (
    <div className="Update">
      <form className="Content" onSubmit={onWrite}>
        <h1>JOIN</h1>
        <div className="">
          <p>이름</p>
          <input
            placeholder=" 이름 입력"
            className="Input"
            name="nname"
            value={nname}
            onChange={onch}
            autoFocus
            required
          />
        </div>
        <div className="">
          <p>닉네임</p>
          <input
            placeholder="닉네임 입력"
            className="Input"
            name="nnickname"
            value={nnickname}
            onChange={onch}
            autoFocus
            required
          />
        </div>
        <div className="">
          <p>생년 월 일</p>
          <input
            placeholder="생년월일 입력"
            className="Input"
            name="nbday"
            value={nbday}
            onChange={onch}
            autoFocus
            required
          />
        </div>
        <div className="">
          <p>전화번호</p>
          <input
            placeholder="전화번호 입력"
            className="Input"
            name="nphonenum"
            value={nphonenum}
            onChange={onch}
            autoFocus
            required
          />
        </div>
        <div className="">
          <p>주소</p>
          <div>
            <AddressInput setAddr={setAddr} />
          </div>
        </div>
        <div className="">
          <p>Email</p>
          <input
            placeholder="you@example.com"
            className="Input"
            name="nemail"
            value={nemail}
            onChange={onch}
            autoFocus
            required
          />
        </div>
        <div className="joinbutton">
          <Button type="submit">회원정보 수정</Button>
        </div>
      </form>
    </div>
  );
};

export default NMemberUpdate;
