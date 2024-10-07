import React from 'react';
import Button from './Button';

const JoinN = () => {
    return (
        <div className='join'>
            <form className="Content">
               <div>
                <div>ID</div>
                <Button>
                    ID 중복 확인
                </Button>
                <input placeholder='영어/대소문자 4~12자' />
               </div>
               <div>닉네임</div>
               <Button>
                닉네임 중복 확인
               </Button>
               <input placeholder='영어/대소문자 4~12자' />
               <div>Password</div>
               
            </form>
        </div>
    );
};

export default JoinN;