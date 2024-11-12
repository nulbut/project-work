import React, { useCallback, useEffect, useRef, useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "./Button";
import "./scss/JoinN.scss";
import AddressInput from "../AddressInput";

let ck = false; //아이디 중복 체크
let nck = false;
let eck = false;
let neck = false; //닉네임 중복 체크

const JoinN = (props) => {
  const nav = useNavigate();

  const nemail = sessionStorage.getItem("nemail");
  const [code, setCode] = useState("");
  const [userCode, setUserCode] = useState("");
  const [addr, setAddr] = useState("");

  //   const [ckid, setCkid] = useState(false);

  //   console.log("체크", ck);

  //입력값 유효성 체크를 위한 useForm사용
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  //아이디 중복 체크
  const nidCheck = () => {
    let n_id = watch("nid"); //watch로 form의 입력값을 가져옴.

    if (n_id === "") {
      alert("아이디를 입력해주세요.");
      ck = false;
      //setCkid(false);
      return;
    }
    //서버로 id를 전송하여 중복여부 확인
    const sendId = { nid: n_id }; //보낼 데이터를 객체 형태로 작성.

    axios
      .post("/nidCheck", sendId)
      .then((res) => {
        if (res.data.res === "ok") {
          alert(res.data.msg); //"사용 가능한 아이디 입니다."출력
          ck = true;
          //setCkid(true);
          //   console.log("중복 확인", ck);
        } else {
          alert(res.data.msg); //"중복된 아이디 입니다." 출력
          ck = false;
          //setCkid(false);
        }
        // console.log(ck);
      })
      .catch((err) => {
        //error 표시
        console.log(err);
        ck = false;
      });
    // console.log("체크2", ck);
  };

  //닉네임 중복 체크
  const nickCheck = () => {
    let nnickname = watch("nnickname");

    if (nnickname === "") {
      alert("닉네임을 입력해주세요.");
      nck = false;
      return;
    }

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

  const npw = useRef();
  npw.current = watch("npw"); //비밀번호 필드 값 가져오기

  const onSubmit = (form) => {
    // console.log("체크 아이디", ck);
    // console.log("체크 닉", nck);
    console.log(form);
    if (ck == false) {
      alert("아이디 중복 확인을 해주세요.");
      return;
    }
    if (nck == false) {
      alert("닉네임 중복 확인을 해주세요.");
      return;
    }
    if (eck == false) {
      alert("이메일 인증을 해주세요.");
      return;
    }
    if (neck == false) {
      alert("이미 가입된 이메일 입니다.");
    }
    //form 전송

    console.log(addr);
    const sendForm = { ...form, naddress: addr };
    // console.log(sendForm);
    axios
      .post("/joinproc", sendForm)
      .then((res) => {
        if ((res.data = "ok")) {
          alert("가입 완료되었습니다.");
          nav("/login"); //가입 성공 시 로그인 페이지로 이동.
        } else {
          alert("가입 실패. 관리자에게 문의해주세요.");
        }
      })
      .catch((err) => {
        alert("가입 실패. 관리자에게 문의해주세요.");
        console.log(err);
      });
  };

  //e-mail 인증
  const mailCh = () => {
    let conf = window.confirm("이메일 인증 받으시겠습니까?");
    let nemail = watch("nemail");
    if (!conf) {
      return;
    }

    const sendMail = { nemail: nemail };
    axios
      .all([
        axios.post("/nemailCheck", sendMail), //이메일 중복 체크
        axios.get("/mailconfirm", { params: { nemail: nemail } }), //이메일 인증
      ])
      .then(
        axios.spread((res7, res) => {
          console.log(res7, res);
          if (res7.data.res7 === "ok") {
            neck = true;
            console.log(res.data);
            setCode(res.data);
            alert("인증번호가 발송 되었습니다.");
          } else {
            alert(res7.data.msg); //이미 가입된 이메일 입니다.
            neck = false;
          }
        })
      )
      .catch((err) => {
        console.log(err);
        neck = false;
      });
  };

  const onch = useCallback((e) => {
    const newCode = e.target.value;
    setUserCode(newCode);
  });

  const emailmatch = () => {
    if (userCode === "") {
      alert("인증번호가 입력되지 않았습니다.");
      return;
    }
    if (code === userCode) {
      alert("인증번호 일치 합니다.");
      eck = true;
    } else {
      eck = false;
      alert("인증번호를 다시 확인해주세요.");
    }
  };

  //전화번호 하이픈 자동입력
  // const [inputValue, setInputValue] = useState("");
  // const autohyphen = (e) => {
  //   const regex = /^[0-9\b -]{0,13}$/;
  //   if (regex.test(e.target.value)) {
  //     setInputValue(e.target.value);
  //     useEffect(() => {
  //       if (inputValue.length === 13) {
  //         setInputValue(
  //           inputValue
  //             .replace(/-/g, "")
  //             .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
  //         );
  //       }
  //     }, [inputValue]);
  //   }
  // };

  //가입 날짜 가져오기
  // const today = new Date();

  //날짜 형식 2024-01-01 형식으로 변경
  // const formattedDate = `${today.getFullYear()}-${
  //   today.getMonth() + 1
  // }-${today.getDate()}`;

  const onmailch = () => {
    const email = watch("nemail");
    console.log(email);
  };

  return (
    <div className="join-n-form">
      <form className="join-n-content" onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" value={1} {...register("nmnum")} />
        <input type="hidden" value={1} {...register("nstatus")} />
        <h1>JOIN</h1>

        <div className="join-id">
          ID
          <input
            placeholder="영어/대소문자 4~12자"
            className="join-input"
            {...register("nid", {
              required: {
                value: true,
                message: "아이디는 필수 입력 값입니다.",
              },
            })}
          />
          <span className="join-error">{errors?.nid?.message}</span>
          <Button type="button" onClick={nidCheck} outline>
            ID 중복 확인
          </Button>
        </div>

        <div className="join-nickname">
          닉네임
          <input
            placeholder="영어/대소문자 4~12자"
            className="join-input"
            {...register("nnickname", {
              required: {
                value: true,
                message: "닉네임은 필수 입력 값입니다.",
              },
            })}
          />
          <Button type="button" onClick={nickCheck}>
            닉네임 중복 확인
          </Button>
          <span className="join-error">{errors?.nnickname?.message}</span>
        </div>

        <div className="join-password">
          <p>Password</p>
          <input
            type="password"
            placeholder="영문,숫자,특수문자 중 2종류 이상을 조합하여 최소 8자리"
            className="join-input"
            {...register("npw", {
              required: {
                value: true,
                message: "비밀번호는 필수 입력 값입니다.",
              },
              minLength: { value: 8, message: "최소 8자리 이상 입력해주세요." },
            })}
          />
          <span className="join-error">{errors?.npw?.message}</span>
          <p>비밀번호 확인</p>
          <input
            type="password"
            placeholder="영문,숫자,특수문자 중 2종류 이상을 조합하여 최소 8자리"
            className="join-input"
            {...register("npwcheck", {
              required: {
                value: true,
                message: "비밀번호 확인은 필수 입력 값입니다.",
              },
              validate: (value) => value === npw.current,
            })}
          />
          {errors?.npwcheck?.type === "required" && (
            <span className="join-error">{errors?.npwcheck?.message}</span>
          )}
          {errors?.npwcheck?.type === "validate" && (
            <span className="join-error">비밀번호가 일치하지 않습니다.</span>
          )}
        </div>

        <div className="join-name">
          <p>이름</p>
          <input
            className="join-input"
            placeholder="이름"
            {...register("nname", {
              required: { value: true, message: "이름은 필수 입력값입니다." },
            })}
          />
          <span className="join-error">{errors?.nname?.message}</span>
        </div>

        <div className="join-gender">
          <p>성별</p>
          <input
            type="radio"
            value={1}
            {...register("ngender", {
              required: {
                value: true,
                message: "성별 필수 입력 값입니다.",
              },
            })}
          />
          남성
          <input
            type="radio"
            value={2}
            {...register("ngender", {
              required: {
                value: true,
                message: "성별 필수 입력 값입니다.",
              },
            })}
          />
          여성
        </div>
        <span className="join-error">{errors?.ngender?.message}</span>

        <div className="join-birthday">
          <p>생년월일</p>
          <input
            type="date"
            className="join-input"
            placeholder="YYYY-MM-DD"
            {...register("nbday", {
              required: {
                value: true,
                message: "생년월일은 필수 입력값입니다.",
              },
            })}
          />
          <span className="join-error">{errors?.nbday?.message}</span>
        </div>

        <div className="join-phonenumber">
          <p>전화 번호</p>
          <input
            className="join-input"
            name="numberValue"
            placeholder=" - 를 포함한 번호 입력"
            {...register("nphonenum", {
              required: {
                value: true,
                message: "전화번호는 필수 입력값입니다.",
              },
              pattern: {
                value: /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/,
                message: "'010-1234-5678' 형식으로 입력 해주세요.",
              },
            })}
          />
          <span className="join-error">{errors?.nphonenum?.message}</span>
        </div>

        <div className="join-email">
          <p>Email</p>
          <p>
            <input
              placeholder="you@example.com"
              className="join-input"
              onChange={onmailch}
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
            <span className="join-error">{errors?.nemail?.message}</span>
            <Button type="button" outline onClick={mailCh}>
              E-mail전송
            </Button>
            <input
              className="join-input"
              placeholder="인증번호를 입력해주세요"
              onChange={onch}
              value={userCode}
            />
            <Button type="button" outline onClick={emailmatch}>
              E-mail인증
            </Button>
          </p>
        </div>
        <div className="join-address">
          <AddressInput className="join-input" setAddr={setAddr} />
          {/* <span className="error">{errors?.naddress?.message}</span> */}
        </div>

        <div className="join-submit">
          <Button type="submit">가입하기</Button>
        </div>
      </form>
    </div>
  );
};

export default JoinN;
