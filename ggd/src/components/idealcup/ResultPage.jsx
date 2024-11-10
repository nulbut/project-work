// src/components/ResultPage.jsx
import React from "react";
import "./scss/ResultPage.scss";
import AdGrid from "./AdGrid";
import StatTable from "./StatTable";
import CommentSection from "./CommentSection";

const ResultPage = () => {
  const winner = {
    name: "홍길동",
    image: "../images/11.JPG",
  };

  const statistics = [
    { category: "우승 비율", value: "75%" },
    { category: "승률", value: "80%" },
    { category: "승리 수", value: "15" },
    { category: "참여 횟수", value: "20" },
  ];
  return (
    <div className="resultPage">
      <div className="leftColumn">
        <div className="winnerPhoto">
          <img src={winner.image} alt="Winner" />
          <AdGrid />
        </div>
        <div className="second-result">
          <div className="buttons">
            <div>
              <button className="button">첫 번째 버튼</button>
              <button className="button">첫 번째 버튼</button>
              <button className="button">첫 번째 버튼</button>
            </div>
            <div>
              <button className="button">첫 번째 버튼</button>
              <button className="button">첫 번째 버튼</button>
            </div>
          </div>
          <StatTable statistics={statistics} />
        </div>
      </div>

      <CommentSection />
    </div>
  );
};

export default ResultPage;
