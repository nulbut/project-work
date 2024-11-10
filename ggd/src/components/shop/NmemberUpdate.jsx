import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import AddressInput from "../AddressInput";

let nck = false; //닉네임 중복 체크
const NmemberUpdate = () => {
  const nav = useNavigate();
  const nid = sessionStorage.getItem("nid");
  const [addr, setAddr] = useState("");

  //  console.log(nid);

  //입력값 유효성 체크
  const {
    watch,
    formState: { errors },
  } = useForm();

  const [nmemberInfo, setNmemberInfo] = useState({
    nid: nid,
    nnickname: "",
    nname: "",
    ngender: "",
    nbday: "",
    nphonenum: "",
    naddress: "",
    nemail: "",
  });

  const { nnickname, nname, ngender, nbday, nphonenum, naddress, nemail } =
    nmemberInfo;

  //서버로부터 회원 정보 받아오기

  useEffect(() => {
    axios
      .get("/getNMember", { params: { nid: nid } })
      .then((res) => {
        setNmemberInfo(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const sendInfo = { ...nmemberInfo, naddress: addr };
  const onch = useCallback(
    (e) => {
      const nmemberObj = {
        ...sendInfo,
        [e.target.name]: e.target.value,
      };

      setNmemberInfo(nmemberObj);
    },
    [sendInfo]
  );

  //회원정보 작성
  const onWrite = useCallback(
    (e) => {
      e.preventDefault(); //페이지 변환 방지하는 함수

      const nmemberformData = new FormData();
      console.log(nmemberformData);

      nmemberformData.append(
        "nmemberInfo",
        new Blob([JSON.stringify(sendInfo)], { type: "application/json" })
      );

      for (let key of nmemberformData.keys()) {
        // console.log(key);
      }

      axios
        .post("/nmemberwriteproc", nmemberformData)
        .then((res) => {
          if (res.data === "ok") {
            alert("회원정보 수정 성공");
            nav("/mypage", { state: { nid: nid } });
          } else {
            alert("수정 실패");
          }
        })
        .catch((err) => {
          alert("수정 에러");
          console.log(err);
        });
    },
    [sendInfo]
  );

  //닉네임 중복 체크
  const nickCheck = () => {
    let nnickname = watch("nnickname");

    if (nnickname === "") {
      alert("닉네임을 입력해주세요.");
      nck = false;
      return;
    }
    console.log(sendInfo);

    const sendNick = { nnickname: nnickname };

    axios
      .post("/nnickCheck", sendNick)
      .then((res) => {
        if (res.data.res === "ok") {
          alert(res.data.msg); //사용 가능한 닉네임입니다. 출력
          nck = true;
        } else {
          alert(res.data.msg); // 이미 사용중인 닉네임 입니다. 출력
          nck = false;
        }
      })
      .catch((err) => {
        console.log(err);
        nck = false;
      });
  };

  return (
    <div className="join-n-form">
      <form className="join-n-content" onSubmit={onWrite}>
        <h1>회원정보 수정</h1>
        <div className="join-nickname">
          닉네임
          <input
            placeholder="영어/대소문자 4~12자"
            className="join-input"
            name="nnickname"
            value={nnickname}
            onChange={onch}
            autoFocus
            required
          />
          <Button type="button" onClick={nickCheck}>
            닉네임 중복 확인
          </Button>
        </div>
        <div className="join-name">
          <p>이름</p>
          <input
            className="join-input"
            placeholder="이름"
            name="nname"
            value={nname}
            onChange={onch}
            autoFocus
            required
          />
        </div>
        {/* <div className='join-gender'>
                    <p>성별</p>
                    <input 
                        type='radio'
                        className='radio'
                        name='ngender'
                        value={ngender}
                        autoFocus
                        required
                    />
                    남성
                    <input 
                        type='radio'
                        className='radio'
                        name='ngender'
                        value={ngender}
                        autoFocus
                        required
                        />
                    여성
                </div> */}
        <div className="join-birthday">
          <input
            type="date"
            className="join-inpu"
            placeholder="YYYY-MM-DD"
            name="nbday"
            value={nbday}
            onChange={onch}
            autoFocus
            required
          />
        </div>
        <div className="join-phonenumber">
          <input
            className="join-input"
            placeholder="- 를 포함한 번호 입력"
            name="nphonenum"
            value={nphonenum}
            onChange={onch}
            autoFocus
            required
          />
        </div>
        <div className="join-email">
          <p>Email</p>
          <input
            className="join-input"
            placeholder="you@example.com"
            name="nemail"
            value={nemail}
            onChange={onch}
            autoFocus
            required
          />
        </div>
        <div className="join-address">
          <AddressInput
            className="join-input"
            setAddr={setAddr}
            name="naddress"
            value={naddress}
            onChange={onch}
          />
        </div>
        <div className="joinbutton">
          <Button type="submit">회원정보 수정</Button>
        </div>
      </form>
    </div>
  );
};

export default NmemberUpdate;
