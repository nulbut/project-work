import React from "react";
import { Link } from "react-router-dom";
import "./scss/JoinChoice.scss";
const JoinChoice = () => {
  return (
    <div className="joinchoice">
      <h1>JOIN</h1>
      <div className="card-container">
        <Link className="card" to="/join_n">
          개인 회원
        </Link>

        <Link className="card" to="/join_b">
          사업자 회원
        </Link>
      </div>
    </div>
  );
};

export default JoinChoice;
