import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, replace, useNavigate } from "react-router-dom";
import Button from "./Button";
import "./scss/Login.scss";

const Login = ({ sucLogin }) => {
  const navigate = useNavigate();
const Login = ({ sucLogin }) => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const sendLogin = (form) => {
    console.log(form);
    const bform = { bid: watch("nid"), bpw: watch("npw") };
    console.log(bform);
    axios
      //.post("/loginproc", form || "/bloginproc", form)
      .all([axios.post("/loginproc", form), axios.post("/bloginproc", bform)])
      .then(
        axios.spread((res1, res2) => {
          console.log(res1, res2);
          if (res1.data.res1 == "ok") {
            sucLogin(res1.data.nid);
            sessionStorage.setItem("nid", res1.data.nid);
            navigate("/shoppingmall");
          } else if (res1.data.res1 == "fail2") {
            if (res2.data.res2 == "ok") {
              sucLogin(res2.data.bid);
              sessionStorage.setItem("bid", res2.data.bid);
              navigate("/shoppingmall");
            } else {
              alert(res2.data.msg);
            }
          } else if (res1.data.res1 == "fail1") {
            alert(res1.data.msg);
          }

          // else if (res1.data.res1 == "fail" && res2.data.res2 == "fail") {
          //   alert(res1.data.msg);
          // }
          else if (res2.data.res2 == "ok") {
            sucLogin(res2.data.bid);
            sessionStorage.setItem("bid", res2.data.bid);
            navigate("/shoppingmall");
          } else if (res2.data.res2 == "fail") {
            alert(res1.data.msg);
          } else if (res1.data.res1 == "fail") {
            alert(res2.data.msg);
          }

          // if (res1.data.res1 || res2.data.res2 === "ok") {
          //   sucLogin(res1.data.nid);
          //   sucLogin(res2.data.bid);
          //   sessionStorage.setItem(
          //     "nid",
          //     res1.data.nid && "bid",
          //     res2.data.bid
          //   );
          //   sessionStorage.setItem("bid", res2.data.bid);
          //   navigate("/shoppingmall");
          // } else {
          //   alert(res1.data.msg);
          // }
        })
      )
      .catch((err) => {
        alert("로그인 실패!");
        console.log(err);
      });
  };
  const sendLogin = (form) => {
    axios
      .post("/loginproc", form)
      .then((res) => {
        if (res.data.res === "ok") {
          sucLogin(res.data.nid);
          //sessionStorage에 id 값 저장

          sessionStorage.setItem("nid", res.data.nid);
          // sessionStorage.setItem("nnickname",res.data.nnickname);
          // 로그인 반응 확인용
          // alert("로그인 성공!")
          // id 전송 확인용
          // console.log(sessionStorage);
          navigate(-1, { replace: true }); //이전페이지
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        alert("로그인 실패!");
        console.log(err);
      });
  };

  const handleClick = () => {
    navigate("/idpwdfind");
  };
  const handleClick = () => {
    navigate("/idpwdfind");
  };

  return (
    <div className="login">
      <form className="content" onSubmit={handleSubmit(sendLogin)}>
        <h1>LOGIN</h1>
        <div className="id">
          <p>ID</p>
          <input
            className="input"
            placeholder="ID 입력"
            {...register("nid", {
              required: { value: true, message: "아이디를 입력해주세요." },
            })}
          />
          <span className="error">{errors?.nid?.message}</span>
        </div>
        <div className="password">
          <p>Password</p>
          <input
            className="input"
            type="password"
            placeholder="비밀번호 입력"
            {...register("npw", {
              required: { value: true, message: "비밀번호를 입력해주세요." },
              minLength: { value: 8, message: "최소 8자리 이상 입력해주세요" },
            })}
          />
          <span className="error">{errors?.npw?.message}</span>
        </div>
        <div className="loginbutton">
          <Button type="submit">로그인</Button>
        </div>
        <div className="idpwdfind">
          <Button onClick={handleClick}>아이디/비밀번호 찾기</Button>
        </div>
        <div className="join">
          <Link to="/joinchoice">회원이 아니신가요? 회원가입 하기</Link>
        </div>
        <div>
          {/*위치 표시용*/}
          <button>네이버 아이디로 로그인</button>
          <br />
          <button>카카오계정으로 로그인</button>
          <br />
          <button>Google로 로그인</button>
        </div>
      </form>
    </div>
  );
  return (
    <div className="login">
      <form className="content" onSubmit={handleSubmit(sendLogin)}>
        <h1>LOGIN</h1>
        <div className="id">
          <p>ID</p>
          <input
            className="input"
            placeholder="ID 입력"
            {...register("nid", {
              required: { value: true, message: "아이디를 입력해주세요." },
            })}
          />
          <span className="error">{errors?.nid?.message}</span>
        </div>
        <div className="password">
          <p>Password</p>
          <input
            className="input"
            type="password"
            placeholder="비밀번호 입력"
            {...register("npw", {
              required: { value: true, message: "비밀번호를 입력해주세요." },
              minLength: { value: 8, message: "최소 8자리 이상 입력해주세요" },
            })}
          />
          <span className="error">{errors?.npw?.message}</span>
        </div>
        <div className="loginbutton">
          <Button type="submit">로그인</Button>
        </div>
        <div className="idpwdfind">
          <Button onClick={handleClick}>아이디/비밀번호 찾기</Button>
        </div>
        <div className="join">
          <Link to="/joinchoice">회원이 아니신가요? 회원가입 하기</Link>
        </div>
        <div>
          {/*위치 표시용*/}
          <button>네이버 아이디로 로그인</button>
          <br />
          <button>카카오계정으로 로그인</button>
          <br />
          <button>Google로 로그인</button>
        </div>
      </form>
    </div>
  );
};

export default Login;

