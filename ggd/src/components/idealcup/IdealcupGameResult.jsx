import React, { useState, useEffect } from "react";
import "./scss/IdealcupGameResult.scss";
import { useNavigate } from "react-router-dom";
const IdealcupGameResult = ({ onClose, data }) => {
  console.log(data);
  const nav = useNavigate();
  const goResult = () => {};
  return (
    <div>
      <div className="lightbox-result">
        <div className="lightbox-content-result">
          <span className="close-btn-result" onClick={onClose}>
            &times;
          </span>
          <h2>즐거운 이상형 월드컵이 되셨나요?</h2>
          <p>결과 페이지로 넘어갑니다.</p>
          <button onClick={() => nav("/resultpage", { state: { data: data } })}>
            결과 보기
          </button>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default IdealcupGameResult;
