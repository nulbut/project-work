import React, { useState, useEffect } from "react";
import "./scss/IdealcupGameResult.scss";
const IdealcupGameResult = ({ onClose, data }) => {
  console.log(data);
  return (
    <div>
      <div className="lightbox-result">
        <div className="lightbox-content-result">
          <span className="close-btn-result" onClick={onClose}>
            &times;
          </span>
          <h2>즐거운 이상형 월드컵이 되셨나요?</h2>
          <p>통계 페이지로 넘어갑니다.</p>
          <button onClick={() => (window.location.href = "/resultpage")}>
            통계 보기
          </button>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default IdealcupGameResult;
