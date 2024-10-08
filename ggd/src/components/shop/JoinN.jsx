import React from 'react';
import { useNavigate } from 'react-router-dom';

const JoinN = () => {
    // const nav = useNavigate();

    // let ck = false; //아이디 중복 체크 

    // //입력값 유효성 체크를 위한 useForm사용 
    // const {
    //     handleSubmit,
    //     register,
    //     watch,
    //     formState: { errors }, 
    // } = useForm();

    // const idCheck = () => {
    //     let mid = watch("nid"); //watch로 form의 입력값을 가져옴. 

    //     if (nid === "") {
    //         alert("아이디를 입력해주세요.");
    //         ck = false;
    //         return;
    //     }
    //     //서버로 id를 전송하여 중복여부 확인
    //     const sendId = { nid : nid }; //보낼 데이터를 객체 형태로 작성.

    //     axios
    //         .post("/idCheck", sendId)
    //         .then((res) => {
    //             if(res.data.res === "ok") {
    //                 alert(res.data.msg); //"사용 가능한 아이디 입니다."출력
    //                 ck = true;
    //             }else {
    //                 alert(res.data.msg); //"중복된 아이디 입니다." 출력
    //                 ck = false;
    //             }
    //         })
    //         .catch((err) => {
    //             //error 표시 
    //             console.log(err);
    //             ck = false;
    //         });
    // };

    // const onSubmit = (form) => {
    //     if (ck == false){
    //         alert("ID 중복 확인을 해주세요.");
    //         return;
    //     }

    //     axios
    //         .post("/joinproc", form)
    //         .then((res) => {
    //             if(res.data="ok"){
    //                 alert("가입 성공했습니다. 환영합니다!");
    //                 nav("/login"); //가입 성공 시 로그인 페이지로 이동.
    //             }
    //             else{
    //                 alert("가입 실패. 관리자에게 문의해주세요.");
    //             }
    //         })
    //         .catch((err) => {
    //             alert("가입 실패. 관리자에게 문의해주세요.");
    //             console.log(err);
    //         });
    // };

    return (
        <div className='join'>
            <form className="Content" 
            // onSubmit={handleSubmit(onSubmit)}
            >
               <div className='id'>
                <p>ID
                    <button>
                    ID 중복 확인
                </button>
                </p>
                <input placeholder='영어/대소문자 4~12자' />
               </div>
               <div className='nickname'>
               <p>닉네임 
                <button>
                닉네임 중복 확인
               </button>
               </p>
               <input placeholder='영어/대소문자 4~12자' />
               </div>
               <div className='password'>
               <p>Password</p>
               <input type='password' placeholder=
               '영문,숫자,특수문자 중 2종류 이상을 조합하여 최소 8자리' />
               <p>비밀번호 확인</p>
               <input type='password' placeholder=
               '영문,숫자,특수문자 중 2종류 이상을 조합하여 최소 8자리' />
               </div>
               <div className='name'>
                <p>이름</p>
                <input placeholder='이름' />
               </div>
               <div className='gender'>
                <p>성별</p>
                <input type='radio' />남성
                <input type='radio' />여성
               </div>
               <div className='birthday'>
                <p>생년월일</p>
                <input placeholder='YYYY-MM-DD' />
               </div>
               <div className='phonenum'>
                <p>핸드폰 번호</p>
                <p><select>
                    <option value="1">010</option>
                    <option value="2">02</option>
                    <option value="3">032</option>
                    <option value="4">070</option>
                </select>
                -<input />
                -<input />
                </p>
               </div>
               <div className='email'>
                <p>Email</p>
                <p><input placeholder='you@example.com' />
                <button>E-mail인증</button>
                </p>
               </div>
               <div className='address'>
                <p>
                    <input placeholder='우편번호' />
                    <button>아이콘들어갈수있나?</button>
                </p>
                <div><input placeholder='주소 입력' /></div>
                <div><input placeholder='상세 주소 입력' /></div>
               </div>
               <div className='joinbutton'>
                <button>가입하기</button>
               </div>
            </form>
        </div>
    );
};

export default JoinN;