// src/components/AdGrid.jsx
import React from "react";
import "./scss/AdGrid.scss";

const AdGrid = () => {
  const ads = new Array(6).fill("광고"); // 광고 6개 예시 데이터

  return (
    <div className="adGrid">
      {ads.map((ad, index) => (
        <div key={index} className="adItem">
          <div className="adContent">{ad}</div>
        </div>
      ))}
    </div>
  );
};

export default AdGrid;
