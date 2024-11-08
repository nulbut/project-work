import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import "./scss/Login.scss";
import "./scss/Button.scss";

const Login = ({ sucLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location, "location");
  // const [state, setState] = useState("");
  // console.log(state);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const sendLogin = (form) => {
    console.log(form);
    //넘어오는 값 확인용
    // console.log(form);
    const bform = {
      bid: watch("nid"),
      bpw: watch("npw"),
    };
    //넘어오는 값 확인용
    // console.log(bform);
    axios
      .all([axios.post("/loginproc", form), axios.post("/bloginproc", bform)])
      .then(
        axios.spread((res1, res2) => {
          console.log(res1, res2);
          if (res1.data.res1 == "ok") {
            //일반회원 아이디, 패스워드 일치
            sucLogin(res1.data.nid, res1.data.nnickname, "n");
            sessionStorage.setItem("nid", res1.data.nid);
            sessionStorage.setItem("nnickname", res1.data.nnickname);
            if (location.state?.where == "ideal") {
              navigate("/idlecup");
            } else {
              navigate("/shoppingmall");
            }
          } else if (res1.data.res1 == "fail2") {
            //일반회원 회원정보 없음
            if (res2.data.res2 == "ok") {
              //사업자 회원 아이디, 패스워드 일치
              sucLogin(res2.data.bid, res2.data.bcname, "b");
              sessionStorage.setItem("bid", res2.data.bid);
              sessionStorage.setItem("nnickname", res2.data.bcname);
              console.log(sessionStorage);
              navigate("/shoppingmall");
            } else {
              // 사업자 회원 패스워드 불일치
              alert(res2.data.msg);
            }
          } else if (res1.data.res1 == "fail1") {
            // 일반회원 패스워드 불일치
            alert(res1.data.msg);
          }
          // else if (res2.data.res2 == "ok") {
          //   sucLogin(res2.data.bid);
          //   sessionStorage.setItem("bid", res2.data.bid);
          //   sessionStorage.setItem("bcname", res2.data.bcname);
          //   navigate("/shoppingmall");
          // }
          else if (res2.data.res2 == "fail") {
            alert(res1.data.msg);
          } else if (res1.data.res1 == "fail") {
            alert(res2.data.msg);
          }
        })
      )
      .catch((err) => {
        alert("로그인 실패!");
        console.log(err);
      });
  };

  const handleClick = () => {
    navigate("/idpwdfind");
  };

  return (
    <div className="login">
      <div className="head-login">
        <h1>LOGIN</h1>
        <br />
      </div>
      <form className="content-login" onSubmit={handleSubmit(sendLogin)}>
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
          <Button className="Button" type="submit">
            로그인
          </Button>
        </div>
        <div className="idpwdfind">
          <Button className="Button" onClick={handleClick}>
            아이디/비밀번호 찾기
          </Button>
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
