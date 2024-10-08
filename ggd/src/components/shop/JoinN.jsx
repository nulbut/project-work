import React from 'react';
import Button from './Button';

const JoinN = () => {
    return (
        <div className='join'>
            <form className="Content">
               <div className='id'>
                <div>ID</div>
                <button>
                    ID 중복 확인
                </button>
                <input placeholder='영어/대소문자 4~12자' />
               </div>
               <div className='nickname'>
               <div>닉네임</div>
               <button>
                닉네임 중복 확인
               </button>
               <input placeholder='영어/대소문자 4~12자' />
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
                <input type='radio' />남성
                <input type='radio' />여성
               </div>
               <div className='birthday'>
                <div>생년월일</div>
                <input placeholder='YYYY-MM-DD' />
               </div>
               <div className='phonenum'>
                <div>핸드폰 번호</div>
                <select>
                    <option value="1">010</option>
                    <option value="2">02</option>
                    <option value="3">032</option>
                    <option value="4">070</option>
                </select>
               </div>
            </form>
        </div>
    );
};

export default JoinN;