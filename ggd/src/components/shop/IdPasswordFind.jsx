import React, { useCallback, useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./scss/IdPasswordFind.scss";

let mailck = false; // 이메일 인증 확인 여부

const IdPasswordFind = () => {
  const nav = useNavigate();

  const nemail = sessionStorage.getItem("nemail");
  const [code, setCode] = useState("");
  const [userCode, setUserCode] = useState("");

  const {
    handleSubmit,
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
    const nemail = watch("nemail");
    axios
      .get("/mailconfirm", { params: { nemail: nemail } })
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
    if (code === "") {
      alert("인증번호가 입력되지 않았습니다.");
      return;
    }
    if (code === userCode) {
      alert("인증번호 일치 합니다.");
      mailck = true;
    } else {
      mailck = false;
      alert("인증번호를 다시 확인해주세요.");
    }
  };

  const idfund = (form) => {
    console.log(form);
    const bform = {
      banme: watch("nname"),
      bemail: watch("nemail"),
    };
    console.log(bform);
    //이메일 인증 확인 유무
    if (mailck == false) {
      alert("이메일 인증을 진행해주세요.");
      return;
    }

    //form 전송
    axios
      .all([
        axios.post("/nidfindproc", form),
        axios.post("/bidfindproc", bform),
      ])
      .then(
        axios.spread((res3, res4) => {
          console.log(res3, res4);
          if (res3.data.res3 == "ok") {
            //일반 회원 이메일 일치
            // sessionStorage.setItem("nid", res3.data.nid);
            // alert(res3.data.nid);
            console.log(res3.data.nid);
            nav("/idpwdfind2", { state: { fid: res3.data.nid } });
          } else if (res3.data.res3 == "fail3") {
            //일반 회원 이메일 불일치
            if (res4.data.res4 == "ok") {
              //사업자 이메일 일치
              // sessionStorage.setItem("bid", res4.data.bid);
              nav("/idpwdfind2", { state: { fid: res4.data.bid } });
            } else {
              //사업자 이메일 불일치
              alert(res4.data.msg);
            }
          } else {
            //일반, 사업자 회원 불일치 경우
            alert(res3.data.msg);
          }
        })
      )
      .catch((err) => {
        alert("아이디 찾기 실패!");
        console.log(err);
      });
  };

  return (
    <div>
      <form className="content" onSubmit={handleSubmit(idfund)}>
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
            <input
              placeholder="인증번호 입력"
              onChange={onch}
              value={userCode}
            />
          </div>
          <div className="button">
            <Button type="button" outline onClick={mailCh}>
              인증 메일 보내기
            </Button>
            <Button type="button" outline onClick={emailmatch}>
              인증번호 확인
            </Button>
          </div>
          <div>
            <Button type="submit">아이디 찾기</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default IdPasswordFind;
