import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';

const Login = ({sucLogin}) => {
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        watch,
        formState: {errors},
    } = useForm();


    const sendLogin = (form) => {
        axios
            .post("/loginproc", form)
            .then((res) => {
                if(res.data.res === "ok"){
                    sucLogin(res.data.nid);
                    //sessionStorage에 id 값 저장
                    sessionStorage.setItem("nid",res.data.nid);
                    alert("로그인 성공!")
                    // id 전송 확인용 
                    // console.log(sessionStorage);
                    navigate("/shoppingmall"); //쇼핑몰 화면으로 이동 
                }
                else {
                    alert(res.data.msg);
                }
            }).catch((err) => {
                alert("로그인 실패!");
                console.log(err);
            });
    };

    const handleClick = () => {
        navigate('/idpwdfind');
    }; 

    return (
        <div className='login'>
            <form className='Content' onSubmit={handleSubmit(sendLogin)}>
            <h1>LOGIN</h1>
            <div className='id'>
                <p>ID</p>
                <input 
                className='input'
                placeholder='ID 입력'
                {...register("nid", {
                    required: {value:true, message: "아이디를 입력해주세요."},
                })} 
                />
                <span className='error'>{errors?.nid?.message}</span>
            </div>
            <div className='password'>
                <p>Password</p>
                <input 
                className='input'
                type="password" 
                placeholder='비밀번호 입력' 
                {...register("npw", {
                    required: {value:true, message:"비밀번호를 입력해주세요."},
                    minLength: {value: 8, message:"최소 8자리 이상 입력해주세요"}
                })}
                />
                <span className='error'>{errors?.npw?.message}</span>
            </div>
            <div className='loginbutton'>
                <Button type="submit">로그인</Button>
            </div>
            <div className='idpwdfind'>
                <Button onClick={handleClick}>아이디/비밀번호 찾기</Button>
            </div>
            <div className='join'>
                <Link to="/joinchoice">회원이 아니신가요? 회원가입 하기</Link> 
            </div>
            <div> 
                {/*위치 표시용*/}
                <button>네이버 아이디로 로그인</button>
                <br />
                <button>카카오계정으로 로그인</button>
                <br />
                <button>Google로 로그인</button>
            </div> 
            </form>
            
        </div>
    );
};

export default Login;