import axios from "axios";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";

const ChangePass = () => {
  //비밀번호 변경
  const nav = useNavigate();

  const { state } = useLocation();
  const { fid } = state;
  //아이디 불러오는지 확인
  // console.log(fid);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const npw = useRef();
  npw.current = watch("npw", "npwcheck", "bpw", "bpwcheck");
  // console.log(npw);
  //비밀번호 재설정 함수
  const sendPass = (form) => {
    const nform = {
      ...form,
      nid: fid,
    };
    const bfrom = {
      bpw: watch("npw"),
      bpwcheck: watch("npwcheck"),
      bid: fid,
    };
    console.log(form);
    console.log(bfrom);
    axios
      .all([axios.post("/changepass", form), axios.post("/bchangepass", bfrom)])
      .then(
        axios.spread((res5, res6) => {
          console.log(res5, res6);
          if (res5.data === "ok") {
            //일반회원 비밀번호 변경 성공
            alert("비밀번호가 변경되었습니다.");
            nav("/login");
          } else if (res5.data === "fail5") {
            //일반회원 비밀번호 변경 실패
            alert("비밀번호 변경 실패하였습니다.");
            if (res6.data === "ok") {
              //사업자 회원 비밀번호 변경 성공
              alert("비밀번호가 변경되었습니다.");
            } else if (res6.data === "fail6") {
              //사업자 회원 비밀번호 변경 실패
              alert("비밀번호 변경 실패하였습니다.");
            }
          }
        })
      )
      .catch((err) => {
        alert("전송 실패");
        console.log(err);
      });
  };
  return (
    <div className="changepass">
      <form className="content" onSubmit={handleSubmit(sendPass)}>
        <h1>비밀번호 변경 화면</h1>
        <input type="hidden" value={fid} {...register("nid")} />
        <input type="hidden" value={fid} {...register("bid")} />
        <div>
          <p>새로운 비밀번호를 입력해주세요.</p>
          <input
            className="input"
            placeholder="영문,숫자,특수문자 중 2종류 이상을 조합하여 최소 8자리"
            type="password"
            {...register("npw", {
              required: {
                value: true,
                message: "비밀번호는 필수 입력 값입니다.",
              },
              minLength: {
                value: 8,
                message: "최소 8자리 이상 입력해주세요. ",
              },
            })}
          />
          <span className="error">{errors?.npw?.message}</span>
          <p>비밀번호 확인</p>
          <input
            className="input"
            placeholder="영문,숫자,특수문자 중 2종류 이상을 조합하여 최소 8자리"
            type="password"
            {...register("npwcheck", {
              required: {
                value: true,
                message: "비밀번호 확인 필수 입력 값입니다.",
              },
              validate: (value) => value === npw.current,
            })}
          />
          {errors?.npwcheck?.types === "required" && (
            <span className="error">{errors?.npwcheck?.message}</span>
          )}
          {errors?.npwcheck?.types === "validate" && (
            <span className="error">비밀번호가 일치하지 않습니다.</span>
          )}
        </div>
        <Button type="submit">비밀번호 변경하기</Button>
      </form>
    </div>
  );
};

export default ChangePass;
