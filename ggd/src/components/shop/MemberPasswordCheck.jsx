import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const MemberPasswordCheck = () => {
  const nav = useNavigate();
  const nid = sessionStorage.getItem("nid");
  console.log(nid);

  const {
    handleSubmit,
    register,
    warch,
    formState: { errors },
  } = useForm();

  const sendLogin = (nform) => {
    axios
      .post("/loginproc", nform)
      .then((res1) => {
        if (res1.data.res1 === "ok") {
          nav("NMview");
        } else {
          alert("비밀번호를 다시 확인해주세요.");
        }
      })
      .catch((err) => {
        alert("인증 실패!");
        console.log(err);
      });
  };

  //뒤로가기 함수
  const handleBack = () => {
    nav(-1);
  };

  return (
    <div className="Main">
      <form onSubmit={handleSubmit(sendLogin)}>
        <div>
          <p>Password</p>
          <input type="hidden" value={nid} {...register("nid")} />
          <input
            type="password"
            placeholder="비밀번호"
            {...register("npw", {
              required: { value: true, message: "비밀번호 입력해주세요." },
            })}
          />
          <span className="error">{errors?.npw?.message}</span>
        </div>
        <div>
          <Button type="submit">확인</Button>
          <Button onClick={handleBack}>취소</Button>
        </div>
      </form>
    </div>
  );
};

export default MemberPasswordCheck;
