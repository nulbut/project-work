import Button from "./Button";
import React from 'react';

const BMemberPasswordCheck = () => {
    return (
        <div className='Main'>
            <div>
                <p>Password</p>
                <input type="password" />
            </div>
            <div>
                <Button>확인</Button>
                <Button>취소</Button>
            </div>
        </div>
    );
};

export default BMemberPasswordCheck;