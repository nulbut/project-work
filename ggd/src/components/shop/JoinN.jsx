import React from 'react';
import Button from './Button';

const JoinN = () => {
    return (
        <div className='join'>
            <form className="Content">
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
               <input placeholder=
               '영문,숫자,특수문자 중 2종류 이상을 조합하여 최소 8자리' />
               <p>비밀번호 확인</p>
               <input placeholder=
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