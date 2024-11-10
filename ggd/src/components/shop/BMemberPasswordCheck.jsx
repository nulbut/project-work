import { useForm } from "react-hook-form";
import Button from "./Button";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./scss/MemberPasswordCheck.scss";



const BMemberPasswordCheck = () => {
  const nav = useNavigate();
  const id = sessionStorage.getItem("bid");
  console.log(id);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const sendLogin = (bform) => {
    axios
      .post("/bloginproc", bform)
      .then((res2) => {
        if (res2.data.res2 === "ok") {
          // sessionStorage.setItem("bid", res2.data.bid);
          nav("/bmemberview");
        } else {
          alert("비밀번호 다시 확인해주세요.");
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
    <div className="BMemberPasswordCheck_Main">
      <form onSubmit={handleSubmit(sendLogin)}>
        <div>
          <p>Password</p>
          <hr />
          <input type="hidden" value={id} {...register("bid")} />
          <input
            className="BMemberPasswordCheck_input"
            type="password"
            placeholder="비밀번호"
            {...register("bpw", {
              required: { value: true, message: "비밀번호 입력해주세요." },
            })}
          />
          <span className="error">{errors?.bpw?.message}</span>
        </div>
        <div className="BMemberPasswordCheck_ButtonGroup">
          <Button type="submit">확인</Button>
          <Button onClick={handleBack}>취소</Button>
        </div>
      </form>
    </div>
  );
};

export default BMemberPasswordCheck;
