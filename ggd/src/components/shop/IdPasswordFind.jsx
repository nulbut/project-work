import React from 'react';

const IdPasswordFind = () => {
    return (
        <div>
            {/*아이디,비밀번호 찾기*/}
            <h1>아이디, 비밀번호 찾기</h1>

            <p>가입하셨던 성함과 이메일을 기입 해주십시오.</p>
            <div className='contetnt'>
                <div className='name'>
                    <p>이름</p>
                    <input placeholder='이름' />
                </div>
                <div className='email'>
                    <p>E-mail</p>
                    <input placeholder='you@example.com' />
                </div>
                <div className='button'>
                    <button>인증 메일 보내기</button>
                </div>
            </div>
        </div>
    );
};

export default IdPasswordFind;