import React from 'react';
import { Link } from 'react-router-dom';

const join_choice = () => {
    return (
        <div>
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

export default join_choice;