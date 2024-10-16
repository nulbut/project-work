import axios from "axios";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

let ck = false; //아이디 중복 체크

const JoinB = () => {
  const nav = useNavigate();

  //입력값 유효성 체크를 위한 useForm 사용
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  //아이디 중복 체크
  const bidCheck = () => {
    let b_id = watch("bid"); //watch로 form 입력값 가져옴.

    if (b_id === "") {
      alert("아이디를 입력해주세요.");
      ck = false;
      return;
    }
    //서버로 id 전송하여 중복여부 확인
    const sendbId = { bid: b_id }; //보낼 데이터를 객체 형태로 작성.

    axios
      .post("/bidCheck", sendbId)
      .then((res) => {
        if (res.data.res === "ok") {
          alert(res.data.msg); //"사용 가능한 아이디 입니다" 출력
          ck = true;
        } else {
          alert(res.data.msg); //"사용할 수 없는 아이디입니다." 출력
          ck = false;
        }
      })
      .catch((err) => {
        //error 표시
        console.log(err);
        ck = false;
      });
  };

  const bpw = useRef();
  bpw.current = watch("bpw"); //비밀번호 필드 값 가져오기

  const onBSubmit = (form) => {
    if (ck === false) {
      alert("아이디 중복 확인을 해주세요.");
      return;
    }

    //form 전송
    axios
      .post("/bjoinproc", form)
      .then((res) => {
        if ((res.data = "ok")) {
          alert("가입 완료되었습니다.");
          nav("/login"); //가입 성공 시 로그인 페이지로 이동
        } else {
          alert("가입 실패.");
        }
      })
      .catch((err) => {
        alert("가입 실패. 관리자에게 문의해주세요.");
        console.log(err);
      });
  };

  return (
    <div className="join">
      <form className="content" onSubmit={handleSubmit(onBSubmit)}>
        <h1>JOIN</h1>
        <div className="essential">
          <p>* 표시 필수 입력</p>
        </div>
        <div className="companyname">
          <p>상호 *</p>
          <input
            placeholder="사업자 상호 입력"
            className="input"
            {...register("bcname", {
              required: {
                value: true,
                message: "상호는 필수 입력 값입니다.",
              },
            })}
          />
          <span className="error">{errors?.bcname?.message}</span>
        </div>
        <div className="entrepreneurnum">
          <p>
            사업자등록번호 *<button>사업자등록번호 확인</button>
          </p>
          <input
            placeholder='"-" 제외한 13자리 숫자 입력'
            className="input"
            {...register("bcnum", {
              required: {
                value: true,
                message: "사업자등록번호는 필수 입력 값입니다.",
              },
            })}
          />
        </div>
        <div className="taxationtype">
          <p>과세유형 *</p>
          <select
            {...register("bttype", {
              required: {
                value: true,
                message: "과세유형은 필수 입력 값입니다.",
              },
            })}
          >
            <option value={1}>일반 과세자</option>
            <option value={2}>간이 과세자</option>
          </select>
          <span className="error">{errors?.bttype?.message}</span>
        </div>
        <div className="breality">
          <p>업태 *</p>
          <input
            placeholder="업태 입력"
            className="input"
            {...register("bbreality", {
              required: {
                value: true,
                message: "업태 입력은 필수 입력 값입니다.",
              },
            })}
          />
          <span className="error">{errors?.bbreality?.message}</span>
        </div>
        <div className="btype">
          <p>업종 *</p>
          <input
            placeholder="업종 입력"
            className="input"
            {...register("bbtype", {
              required: {
                value: true,
                message: "업종 입력은 필수 입력 값입니다.",
              },
            })}
          />
          <span className="error">{errors?.bbtype?.message}</span>
        </div>
        <div className="address">
          <p>주소 *</p>
          <p>
            <input placeholder="우편번호" className="input" />
            <button>아이콘 들어갈것</button>
          </p>
          <p>
            <input placeholder="사업자 주소" />
          </p>
          <p>
            <input placeholder="상세 주소" />
          </p>
        </div>
        <div className="bid">
          <p>
            ID *
            <Button type="button" onClick={bidCheck}>
              ID 중복 확인
            </Button>
          </p>
          <input
            placeholder="영어 대/소문자 4~12자"
            className="input"
            {...register("bid", {
              required: {
                value: true,
                message: "아이디는 필수 입력 값입니다.",
              },
            })}
          />
          <span className="error">{errors?.bid?.message}</span>
        </div>
        <div className="representativename">
          <p>대표자 이름 *</p>
          <input
            placeholder="대표자 이름"
            className="input"
            {...register("bname", {
              required: {
                value: true,
                message: "대표자 이름은 필수 입력 값입니다.",
              },
            })}
          />
          <span className="error">{errors?.bname?.message}</span>
        </div>
        <div className="representativegender">
          <p>대표자 성별 *</p>
          <input type="radio" value={1} {...register("bgender")} />
          남성
          <input type="radio" value={2} {...register("bgender")} />
          여성
        </div>
        <div className="representativebirthday">
          <p>대표자 생년월일 *</p>
          <input
            type="date"
            className="input"
            placeholder="YYYY-MM-DD"
            {...register("bbday", {
              required: {
                value: true,
                message: "대표자 생년월일은 필수 입력값입니다.",
              },
            })}
          />
          <span className="error">{errors?.bbday?.message}</span>
        </div>
        <div className="representativephoennum">
          <p>대표자 전화번호 *</p>
          <input
            className="input"
            placeholder=" - 를 제외한 번호 입력"
            {...register("bphonenum", {
              required: {
                value: true,
                message: "대표자 전화번호는 필수 입력값입니다.",
              },
            })}
          />
          <span className="error">{errors?.bphonenum?.message}</span>
        </div>
        <div className="banknum">
          <p>정산 입금계좌 *</p>
          <select
            {...register("bbanknum", {
              required: {
                value: true,
                message: "은행 코드 필수로 선택해주세요",
              },
            })}
          >
            <option value={""}>은행선택</option>
            <option value={1}>KB국민은행</option>
            <option value={2}>신한은행</option>
            <option value={3}>우리은행</option>
            <option value={4}>KEB하나은행</option>
            <option value={5}>부산은행</option>
            <option value={6}>경남은행</option>
            <option value={7}>대구은행</option>
            <option value={8}>광주은행</option>
            <option value={9}>전북은행</option>
            <option value={10}>제주은행</option>
            <option value={11}>SC제일은행</option>
            <option value={12}>씨티은행</option>
            <option value={13}>토스뱅크</option>
            <option value={14}>케이뱅크</option>
            <option value={15}>카카오뱅크</option>
          </select>
          <span className="error">{errors?.bbanknum?.message}</span>
          <p>
            <input
              placeholder='"-"제외 입력'
              className="input"
              {...register("bbaccunt", {
                required: {
                  value: true,
                  message: "계좌번호는 필수 입력값입니다.",
                },
              })}
            />
            <span className="error">{errors?.bbaccunt?.message}</span>
          </p>
        </div>
        <div className="managername">
          <p>담당자 이름</p>
          <input placeholder="담당자 이름" {...register("bmname")} />
        </div>
        <div className="managephoennum">
          <p>담당자 전화번호</p>
          <input
            className="input"
            placeholder=" - 를 제외한 번호 입력"
            {...register("bmphonenum")}
          />
        </div>
        <div className="manageremail">
          <p>담당자 Email</p>
          <input placeholder="you@example.com" {...register("bmemail")} />
        </div>
        <div className="password">
          <p>Password *</p>
          <input
            type="password"
            placeholder="영문,숫자,특수문자 중 2종류 이상을 조합하여 최소 8자리"
            {...register("bpw", {
              required: {
                value: true,
                message: "비밀번호는 필수 입력 값입니다.",
              },
              minLength: { value: 8, message: "최소 8자리 이상 입력해주세요." },
            })}
          />
          <span className="error">{errors?.bpw?.message}</span>
        </div>
        <div className="passwordcheck">
          <p>비밀번호 확인 *</p>
          <input
            type="password"
            placeholder="영문,숫자,특수문자 중 2종류 이상을 조합하여 최소 8자리"
            {...register("bpwcheck", {
              required: {
                value: true,
                message: "비밀번호 확인은 필수 입력 값입니다.",
              },
              validate: (value) => value === bpw.current,
            })}
          />
          {errors?.bpwcheck?.type === "required" && (
            <span className="error">{errors?.bpwcheck?.message}</span>
          )}
          {errors?.bpwcheck?.type === "validate" && (
            <span className="error">비밀번호가 일치하지 않습니다.</span>
          )}
        </div>
        <div className="joinbutton">
          <Button type="submit">가입하기</Button>
        </div>
      </form>
    </div>
  );
};

export default JoinB;
