import React, { useCallback, useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const IdPasswordFind = () => {
  const nav = useNavigate();

  const nemail = sessionStorage.getItem("nemail");
  const [code, setCode] = useState("");
  const [userCode, setUserCode] = useState("");

  const {
    register,
    watch,
    formState: { errors },
  } = useForm();

  //e=mail 인증
  const mailCh = () => {
    let conf = window.confirm("이메일 인증을 받으시겠습니까?");
    if (!conf) {
      return;
    }
    const nmail = watch("nemail");
    axios
      .get("/mailconfirm", { params: { nmail: nmail } })
      .then((res) => {
        console.log(res.data);
        setCode(res.data);
        alert("인증번호가 발송 되었습니다.");
      })
      .catch((err) => console.log(err));
  };

  const onch = useCallback((e) => {
    const newcode = e.target.value;
    setUserCode(newcode);
  });

  const emailmatch = () => {
    if (code === userCode) {
      alert("인증번호 일치 합니다.");
    } else {
      alert("인증번호 다시 확인해주세요.");
    }
  };

  return (
    <div>
      {/*아이디,비밀번호 찾기*/}
      <h1>아이디, 비밀번호 찾기</h1>

      <p>가입하셨던 성함과 이메일을 기입 해주십시오.</p>
      <div className="contetnt">
        <div className="name">
          <p>이름</p>
          <input
            placeholder="이름,대표자 이름"
            {...register("nname", {
              required: {
                value: true,
                message: "이름 or 대표자 이름 입력해주세요.",
              },
            })}
          />
        </div>
        <div className="email">
          <p>E-mail</p>
          <input
            placeholder="you@example.com"
            {...register("nemail", {
              required: {
                value: true,
                message: "이메일 주소는 필수 입력값입니다.",
              },
              pattern: {
                value:
                  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i,
                message: "'you@example.com' 형식으로 입력 해주세요.",
              },
            })}
          />
          <input placeholder="인증번호 입력" onChange={onch} value={userCode} />
        </div>
        <div className="button">
          <Button onClick={mailCh}>인증 메일 보내기</Button>
          <Button onClick={emailmatch}>인증번호 확인</Button>
        </div>
      </div>
    </div>
  );
};

export default IdPasswordFind;
