import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../idealcup/Button";

const AdminLogin = ({ sucLogin }) => {
  const nav = useNavigate();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const sendLogin = (form) => {
    axios
      .post("/admin/adminLoginProc", form)
      .then((res) => {
        if (res.data.res === "ok") {
          // sucLogin(res.data.id);
          //sessionStorage에 id 값 저장
          sessionStorage.setItem("mid", res.data.id);
          nav("/adminex"); //게시판 목록 화면으로 이동.
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        alert("로그인 실패");
        console.log(err);
      });
  };

  return (
    <div className="Login">
      <form className="Content" onSubmit={handleSubmit(sendLogin)}>
        <h1>GGD's 관리자 로그인</h1>
        <input
          className="Input"
          placeholder="아이디"
          {...register("mid", {
            required: { value: true, message: "아이디는 필수 입력값입니다." },
          })}
        />
        <span className="Error">{errors?.mid?.message}</span>
        <input
          className="Input"
          placeholder="비밀번호"
          type="password"
          {...register("mpwd", {
            required: { value: true, message: "비밀번호는 필수 입력값입니다." },
            // minLength: { value: 8, message: "8자리 이상 입력해 주세요." },
          })}
        />
        <span className="Error">{errors?.mpwd?.message}</span>
        <Button type="submit" size="large">
          로그인
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;
