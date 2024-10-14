import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from './Button';

const JoinN = () => {
    const nav = useNavigate();

    let ck = false; //아이디 중복 체크 

    //입력값 유효성 체크를 위한 useForm사용 
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors }, 
    } = useForm();

    const nidCheck = () => {
        let n_id = watch("nid"); //watch로 form의 입력값을 가져옴. 

        if (n_id === "") {
            alert("아이디를 입력해주세요.");
            ck = false;
            return;
        }
        //서버로 id를 전송하여 중복여부 확인
        const sendId = { nid : n_id }; //보낼 데이터를 객체 형태로 작성.

        axios
            .post("/nidCheck", sendId)
            .then((res) => {
                if(res.data.res === "ok") {
                    alert(res.data.msg); //"사용 가능한 아이디 입니다."출력
                    ck = true;
                }else {
                    alert(res.data.msg); //"중복된 아이디 입니다." 출력
                    ck = false;
                }
            })
            .catch((err) => {
                //error 표시 
                console.log(err);
                ck = false;
            });
    };

    const onSubmit = (form) => {
        // if (ck == false){
        //     alert("ID 중복 확인을 해주세요.");
        //     return;
        // }

        axios
            .post("/joinproc", form)
            .then((res) => {
                if(res.data="ok"){
                    alert("가입 성공했습니다. 환영합니다!");
                    nav("/login"); //가입 성공 시 로그인 페이지로 이동.
                }
                else{
                    alert("가입 실패. 관리자에게 문의해주세요.");
                }
            })
            .catch((err) => {
                alert("가입 실패. 관리자에게 문의해주세요.");
                console.log(err);
            });
    };

    

    return (
        <div className='join'>
            <form className="content" 
             onSubmit={handleSubmit(onSubmit)}
            >
                <h1>LOGIN</h1>
               <div className='id'>
                <p>ID
                    <span className='error'>{errors?.nid?.message}</span>
                    <Button type="button">
                    ID 중복 확인
                </Button>
                </p>
                <input placeholder='영어/대소문자 4~12자'
                    className='input'
                    {...register("nid",{
                        required: { value: true, message: "아이디는 필수 입력 값입니다."},
                    })}
                />
               </div>
               <div className='nickname'>
               <p>닉네임 
                {/* <button onClick={nnickCheck} outline>
                닉네임 중복 확인
               </button> */}
               <Button type="button">닉네임 중복 확인</Button>
               </p>
               <input 
                placeholder='영어/대소문자 4~12자' 
                    className='input'
                    {...register("nnickname",{
                        required: { value: true, message: "닉네임은 필수 입력 값입니다."},
                    })}
               />
               <span className='error'>{errors?.nnickname?.message}</span>
               </div>
               <div className='password'>
               <p>Password</p>
               <input 
               type='password' 
               placeholder=
               '영문,숫자,특수문자 중 2종류 이상을 조합하여 최소 8자리' 
               name="password"
               {...register("npw",{
                required: { value : true, message: "비밀번호는 필수 입력 값입니다."},
                minLength: { value : 8, message: "최소 8자리 이상 입력해주세요."},
                
               })}
               
               />
               <span className='error'>{errors?.npw?.message}</span>
               <p>비밀번호 확인</p>
               <input 
               type='password' 
               placeholder=
               '영문,숫자,특수문자 중 2종류 이상을 조합하여 최소 8자리'
               name="confirmPassword"
               />
               </div>
               <div className='name'>
                <p>이름</p>
                <input 
                className='input'
                placeholder='이름'
                {...register("nname", {
                    required: {value: true, message: "이름은 필수 입력값입니다."},
                })}
                />
                <span className='error'>{errors?.nname?.message}</span>
               </div>
               <div className='gender'>
                <p>성별</p>
                <input type='radio' value={1}
                {...register("ngender")}
                />남성
                <input type='radio' value={2}
                {...register("ngender")}
                />여성
               </div>
               <div className='birthday'>
                <p>생년월일</p>
                <input 
                className='input'
                placeholder='YYYY-MM-DD' 
                {...register("nbday", {
                    required: {value: true, message: "생년월일은 필수 입력값입니다."}
                })}
                />
                <span className='error'>{errors?.nbday?.message}</span>
               </div>
               <div className='phonenum'>
                <p>핸드폰 번호</p>
                <p><select {...register("nphonenum")}>
                    <option value={"010"}>010</option>
                    <option value={"02"}>02</option>
                    <option value={"032"}>032</option>
                    <option value={"070"}>070</option>
                </select>
                -<input 
                className='input'
                {...register("nphonenum", {
                    required: {value: true, message: "핸드폰 번호는 필수 입력값입니다."}
                })}
                />
                -<input 
                className='input'
                {...register("nphonenum", {
                    required: {value: true, message: "핸드폰 번호는 필수 입력값입니다."}
                })}
                />
                <span className='error'>{errors?.nphonenum?.message}</span>
                </p>
               </div>
               <div className='email'>
                <p>Email</p>
                <p><input
                 placeholder='you@example.com'
                 className='input'
                 {...register("nemail",{
                    required: {value:true, message:"이메일 주소는 필수 입력값입니다."}
                 })}
                  />
                  <span className='error'>{errors?.nemail?.message}</span>
                <Button>E-mail인증</Button>
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
                <Button type="submit">가입하기</Button>
               </div>
            </form>
        </div>
    );
};

export default JoinN;