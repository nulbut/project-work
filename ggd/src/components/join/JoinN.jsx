import React from 'react';

const JoinN = () => {
    return (
        <div className='join'>
            <form className="Content" onSubmit={handleSubmit(onSubmit)}>
               <input className='input'
               placeholder='ID' /> 
               <Button type="button">
                ID 중복 확인
               </Button>
               <input className="input"
               placeholder='닉네임' />
               <Button type="button">
                닉네임 중복 확인
               </Button>
               
            </form>
        </div>
    );
};

export default JoinN;