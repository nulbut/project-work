import React from 'react';
import { Link } from 'react-router-dom';

const JoinChoice = () => {
    return (
        <div className='joinchoice'>
            <h1>LOGIN</h1>
            <ul>
                <li>
                    <Link to="/join_n">개인 회원</Link>
                </li>
                <li>
                    <Link to="/join_b">사업자 회원</Link>
                </li>
            </ul>
        </div>
    );
};

export default JoinChoice;