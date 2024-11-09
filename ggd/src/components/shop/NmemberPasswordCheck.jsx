import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const NmemberPasswordCheck = () => {
    const nav = useNavigate();
  const id = sessionStorage.getItem("nid");
  console.log(id);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const sendLogin = (form) => {
    axios
      .post("/loginproc", form)
      .then((res1) => {
        if (res1.data.res1 === "ok") {
          nav("/nmemberupdate");
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
    <div className="Main">
      <form onSubmit={handleSubmit(sendLogin)}>
        <div>
          <p>Password</p>
          <input type="hidden" value={id} {...register("nid")} />
          <input
            type="password"
            placeholder="비밀번호"
            {...register("npw", {
              required: { value: true, message: "비밀번호 입력해주세요." },
            })}
          />
          <span className="error">{errors?.bpw?.message}</span>
        </div>
        <div>
          <Button type="submit">확인</Button>
          <Button onClick={handleBack}>취소</Button>
        </div>
      </form>
    </div>
    );
};

export default NmemberPasswordCheck;