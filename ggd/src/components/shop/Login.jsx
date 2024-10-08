import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    {/*아이디,비밀번호 찾기로 이동.*/}
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/idpwdfind');
    }; {/*아이디,비밀번호 찾기로 이동.*/}
    return (
        <div className='login'>
            <h1>LOGIN</h1>
            <div className='id'>
                <p>ID</p>
                <input placeholder='ID 입력' />
            </div>
            <div className='password'>
                <p>Password</p>
                <input type="password" placeholder='비밀번호 입력' />
            </div>
            <div className='loginbutton'>
                <button>로그인</button>
            </div>
            <div className='idpwdfind'>
                <button onClick={handleClick}>아이디/비밀번호 찾기</button>
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
        </div>
    );
};

export default Login;