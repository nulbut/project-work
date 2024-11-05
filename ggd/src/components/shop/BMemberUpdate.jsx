import axios from 'axios';
import Button from "./Button";
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const BMemberUpdate = () => {
    const nav = useNavigate();
    //아이디 받아오기
    const { state } = useLocation();
    const { bid } = state;

    

    console.log(bid);

    const [bmemberInfo, setBmemberInfo] = useState({
        bid : bid,
        bcname: "",
        bcnum : "",
       bttype : "",
       bbreality : "",
       bbtype : "",
       bemail : "",
    //    baddress : "",
       bname : "",
       bbday : "",
       bphonenum : "",
       bbanknum : "",
       bbaccunt : "",
       bmname : "",
       bmphonenum : "",
       bmemail : "",
    });

    const {
        bcname,
        bcnum,
        bttype,
        bbreality,
        bbtype,
        bemail,
        // baddress,
        bname,
        bbday,
        bphonenum,
        bbanknum,
        bbaccunt,
        bmname,
        bmphonenum,
        bmemail,

    } = bmemberInfo;

    //서버로부터 회원 정보 받아오기 
    useEffect(() => {
        axios  
            .get("/getBMemeber", { params : {bid : bid}})
            .then((res) => {
                setBmemberInfo(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    }, []);


    const onch = useCallback(
        (e) => {
            const bmemberObj = {
                ...bmemberInfo,
                [e.target.name]: e.target.value,
            };
            setBmemberInfo(bmemberObj);
        },
        [bmemberInfo]
    );

    const onWrite = useCallback(
        (e) => {
            e.preventDefault();//페이지 변환 방지하는 함수 

            axios
                .post("/bmemberwriteProc",{param : {bid : bid}})
                .then((res) => {
                    if(res.data === "ok") {
                        alert("회원정보 수정 성공");
                        nav("/bmemberview",sessionStorage.setItem("bid",res.data.bid))
                    } else {
                        alert("수정 실패");
                    }
                })
                .catch((err) => {
                    alert("수정 에러");
                    console.log(err);
                });
        },
        [bmemberInfo]
    );

    return (
        <div>
            <form className="content" onSubmit={onWrite}>
        <h1>JOIN</h1>
        <div className="essential">
          <p>* 표시 필수 입력</p>
        </div>
        <div className="companyname">
          <p>상호 *</p>
          <input
            placeholder="사업자 상호 입력"
            className="input"
            name='bcname'
            value={bcname}
            onChange={onch}
            autoFocus
            required
          />
        </div>
        <div className="entrepreneurnum">
          <p>
            사업자등록번호 *
            {/* <Button type="button" onClick={bnumcSubmit}>
              사업자등록번호 확인
            </Button> */}
          </p>
          <input
            placeholder="'000-00-00000'형식의 사업자등록번호를 입력해주세요."
            className="input"
            name='bcnum'
            value={bcnum}
            onChange={onch}
            autoFocus
            required
            
          />
        </div>
        <div className="taxationtype">
          <p>과세유형 *</p>
          <select
            name='bttype'
            value={bttype}
            onChange={onch}
            autoFocus
            required
          >
            <option value={1}>일반 과세자</option>
            <option value={2}>간이 과세자</option>
          </select>
        </div>
        <div className="breality">
          <p>업태 *</p>
          <input
            placeholder="업태 입력"
            className="input"
            name='bbreality'
            value={bbreality}
            onChange={onch}
            autoFocus
            required
          />
         
        </div>
        <div className="btype">
          <p>업종 *</p>
          <input
            placeholder="업종 입력"
            className="input"
            name='bbtype'
            value={bbtype}
            onChange={onch}
            autoFocus
            required
          />
        </div>
        <div className="email">
          <p>사업자 EMail *</p>
          <input
            placeholder="you@example.com"
            className="input"
            name='bemail'
            value={bemail}
            onChange={onch}
            autoFocus
            required
          />
          {/* <Button type="button" outline onClick={mailCh}>
            E-mail전송
          </Button> */}
          {/* <input
            className="input"
            placeholder="인증번호를 입력해주세요"
            onChange={onch}
            value={userCode}
          />
          <Button type="button" outline onClick={emailmatch}>
            E-mail인증
          </Button> */}
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
        <div className="representativename">
          <p>대표자 이름 *</p>
          <input
            placeholder="대표자 이름"
            className="input"
            name='bname'
            value={bname}
            onChange={onch}
            autoFocus
            required
          />
        </div>
        <div className="representativebirthday">
          <p>대표자 생년월일 *</p>
          <input
            type="date"
            className="input"
            placeholder="YYYY-MM-DD"
            name='bbday'
            value={bbday}
            onChange={onch}
            autoFocus
            required
          />
        </div>
        <div className="representativephoennum">
          <p>대표자 전화번호 *</p>
          <input
            className="input"
            placeholder="'010-1234-5678' 형식으로 입력 해주세요."
            name='bphonenum'
            value={bphonenum}
            onChange={onch}
            autoFocus
            required
          />
        </div>
        <div className="banknum">
          <p>정산 입금계좌 *</p>
          <select
            name='bbanknum'
            value={bbanknum}
            onChange={onch}
            autoFocus
            required
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
          <p>
            <input
              placeholder='"-"제외 입력'
              className="input"
              name='bbaccunt'
            value={bbaccunt}
            onChange={onch}
            autoFocus
            required
            />
          </p>
        </div>
        <div className="managername">
          <p>담당자 이름</p>
          <input 
          placeholder="담당자 이름"
          className="input"
              name='bmname'
            value={bmname}
            onChange={onch}
            autoFocus
            required
          />
        </div>
        <div className="managephoennum">
          <p>담당자 전화번호</p>
          <input
            className="input"
            placeholder="'010-1234-5678' 형식으로 입력 해주세요."
            name='bmphonenum'
            value={bmphonenum}
            onChange={onch}
            autoFocus
            required
          />
        </div>
        <div className="manageremail">
          <p>담당자 Email</p>
          <input
            placeholder="you@example.com"
            name='bmemail'
            value={bmemail}
            onChange={onch}
            autoFocus
            required
          />
        </div>
        {/* <div className="password">
          <p>Password *</p>
          <input
            type="password"
            placeholder="영문,숫자,특수문자 중 2종류 이상을 조합하여 최소 8자리"
            
          />
          
        </div> */}
        <div className="passwordcheck">
          {/* <p>비밀번호 확인 *</p>
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
          )} */}
        </div>
        <div className="joinbutton">
          <Button type="submit">회원정보 수정</Button>
        </div>
      </form>
        </div>
    );
};

export default BMemberUpdate;