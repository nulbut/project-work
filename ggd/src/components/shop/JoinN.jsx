import React from 'react';
import Button from './Button';

const JoinN = () => {
    return (
        <div className='join'>
            <form className="Content">
               <div className='id'>
                <div>ID</div>
                <Button>
                    ID 중복 확인
                </Button>
                <input placeholder='영어/대소문자 4~12자' />
               </div>
               <div className='nickname'>
               <div>닉네임</div>
               <input placeholder='영어/대소문자 4~12자' />
               <Button>
                닉네임 중복 확인
               </Button>
               </div>
               <div className='password'>
               <div>Password</div>
               <input placeholder=
               '영문,숫자,특수문자 중 2종류 이상을 조합하여 최소 8자리' />
               <div>비밀번호 확인</div>
               <input placeholder=
               '영문,숫자,특수문자 중 2종류 이상을 조합하여 최소 8자리' />
               </div>
               <div className='name'>
                <div>이름</div>
                <input placeholder='이름' />
               </div>
               <div className='gender'>
                <div>성별</div>
                <input type='radio' />
               </div>
            </form>
        </div>
    );
};

export default JoinN;