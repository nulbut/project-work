import React from 'react';
import { useNavigate } from 'react-router-dom';

const join_n = () => {
    return (
        <div className='Join_N'>
            <form className="Content" onSubmit={handleSubmit(onSubmit)}>
               <input className='Input'
               placeholder='ID' /> 
               <Button type="button">
                ID 중복 확인
               </Button>
               <input className="Input"
               placeholder='닉네임' />
               <Button type="button">
                닉네임 중복 확인
               </Button>
            </form>
        </div>
    );
};

export default join_n;