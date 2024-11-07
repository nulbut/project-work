import axios from "axios";
import React, { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

let ck = false; //아이디 중복 체크
let cnumclick = false; //사업자등록번호 확인
let eck = false; //이메일 확인
let neck = false; //닉네임 중복 체크

const JoinB = () => {
  const nav = useNavigate();

  const bemail = sessionStorage.getItem("bemail");
  const [code, setCode] = useState("");
  const [userCode, setUserCode] = useState("");

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

  //사업자등록번호 확인 기능
  const bnumcSubmit = () => {
    let b_cnum = watch("bcnum");
    if (b_cnum === "") {
      alert("사업자등록번호 입력해주세요.");
      cnumclick = "fail";
    } else {
      alert("사업자등록번호 확인 되었습니다.");
      cnumclick = "ok";
    }
  };

  const bpw = useRef();
  bpw.current = watch("bpw"); //비밀번호 필드 값 가져오기

  const onBSubmit = (form) => {
    if (ck === false) {
      alert("아이디 중복 확인을 해주세요.");
      return;
    }
    if (cnumclick === false) {
      alert("사업자등록번호 확인을 해주세요.");
      return;
    }
    if (eck === false) {
      alert("이메일 인증 해주세요.");
      return;
    }
    if (neck === false) {
      alert("이미 가입된 이메일 입니다.");
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

  //e-mail 인증
  const mailCh = () => {
    let conf = window.confirm("이메일 인증 받으시겠습니까?");
    let bemail = watch("bemail");
    if (!conf) {
      return;
    }
    // const bmail = watch("bemail");
    // axios
    //   .get("/bmailconfirm", { params: { bmail: bmail } })
    //   .then((res) => {
    //     console.log(res.data);
    //     setCode(res.data);
    //     alert("인증번호가 발송 되었습니다.");
    //   })
    //   .catch((err) => console.log(err));

    const snedBMail = { bemail: bemail };

    axios
      .all([
        axios.post("/bemailCheck", snedBMail), //이메일 중복 체크
        axios.get("/bmailconfirm", { params: { bemail: bemail } }), //이메일 인증
      ])
      .then(
        axios.spread((res8, res) => {
          if (res8.data.res8 === "ok") {
            neck = true;
            console.log(res.data);
            setCode(res.data);
            alert("인증번호가 발송 되었습니다.");
          } else {
            alert(res8.data.msg);
            neck = false;
          }
        })
      )
      .catch((err) => console.log(err));
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
      alert("인증번호 다시 확인 해주세요.");
    }
  };

  //가입 날짜 가져오기
  const today = new Date();

  //날짜 형식 2024-01-01 형식으로 변경
  const formattedDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  return (
    <div className="join">
      <form className="content" onSubmit={handleSubmit(onBSubmit)}>
        <input type="hidden" value={2} {...register("bmnum")} />
        <input type="hidden" value={1} {...register("bstatus")} />
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
            사업자등록번호 *
            <Button type="button" onClick={bnumcSubmit}>
              사업자등록번호 확인
            </Button>
          </p>
          <input
            placeholder="- 제외한 13자리 입력"
            className="input"
            {...register("bcnum", {
              required: {
                value: true,
                message: "사업자등록번호는 필수 입력 값입니다.",
              },
              pattern: {
                value: /^(\d{3,3})+[-]+(\d{2,2})+[-]+(\d{5,5})/,
                minLength: 12,
                maxlength: 12,
                message: "'000-00-00000'형식의 사업자등록번호를 입력해주세요.",
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
            <option value={"일반 과세자"}>일반 과세자</option>
            <option value={"간이 과세자"}>간이 과세자</option>
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
        <div className="email">
          <p>사업자 EMail *</p>
          <input
            placeholder="you@example.com"
            className="input"
            {...register("bemail", {
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
          <span className="error">{errors?.bemail?.message}</span>
          <Button type="button" outline onClick={mailCh}>
            E-mail전송
          </Button>
          <input
            className="input"
            placeholder="인증번호를 입력해주세요"
            onChange={onch}
            value={userCode}
          />
          <Button type="button" outline onClick={emailmatch}>
            E-mail인증
          </Button>
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
          <input
            type="radio"
            value={1}
            {...register("bgender", {
              required: {
                value: true,
                message: "성별 필수입력 값입니다.",
              },
            })}
          />
          <span className="error">{errors?.bgender?.message}</span>
          남성
          <input
            type="radio"
            value={2}
            {...register("bgender", {
              required: {
                value: true,
                message: "성별 필수입력 값입니다.",
              },
            })}
          />
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
              pattern: {
                value: /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/,
                message: "'010-1234-5678' 형식으로 입력 해주세요.",
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
            <option value={"KB국민은행"}>KB국민은행</option>
            <option value={"신한은행"}>신한은행</option>
            <option value={"우리은행"}>우리은행</option>
            <option value={"KEB하나은행"}>KEB하나은행</option>
            <option value={"부산은행"}>부산은행</option>
            <option value={"경남은행"}>경남은행</option>
            <option value={"대구은행"}>대구은행</option>
            <option value={"광주은행"}>광주은행</option>
            <option value={"전북은행"}>전북은행</option>
            <option value={"제주은행"}>제주은행</option>
            <option value={"SC제일은행"}>SC제일은행</option>
            <option value={"씨티은행"}>씨티은행</option>
            <option value={"토스뱅크"}>토스뱅크</option>
            <option value={"케이뱅크"}>케이뱅크</option>
            <option value={"카카오뱅크"}>카카오뱅크</option>
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
                pattern: {
                  value: /([0-9,\-]{3,6}\-[0-9,\-]{2,6}\-[0-9,\-])/,
                  message: "올바른 형식의 계좌번호를 입력해주세요.",
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
            {...register("bmphonenum", {
              pattern: {
                value: /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/,
                message: "'010-1234-5678' 형식으로 입력 해주세요.",
              },
            })}
          />
          {errors?.bmphonenum?.type === "pattern" && (
            <span className="error">
              '010-1234-5678' 형식으로 입력 해주세요.
            </span>
          )}
        </div>
        <div className="manageremail">
          <p>담당자 Email</p>
          <input
            placeholder="you@example.com"
            // type="email"
            {...register("bmemail", {
              pattern: {
                value:
                  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i,
                message: "'you@example.com' 형식으로 입력 해주세요.",
              },
            })}
          />
          {errors?.bmemail?.type === "pattern" && (
            <span className="error">
              'you@example.com' 형식으로 입력 해주세요.
            </span>
          )}
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
