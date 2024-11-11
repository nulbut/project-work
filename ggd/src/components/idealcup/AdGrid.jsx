// src/components/AdGrid.jsx
import React, { useEffect, useState } from "react";
import "./scss/AdGrid.scss";
import axios from "axios";

const AdGrid = ({ category }) => {
  const ads = new Array(3).fill("광고"); // 광고 6개 예시 데이터
  const [used, setUsed] = useState([]);

  console.log(used);
  useEffect(() => {
    axios
      .get("/getAdList", { params: { category: category } })
      .then((res) => {
        console.log(res);
        setUsed(res.data.used);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(used);
  return (
    <div className="adGrid">
      {used?.map(
        (
          ad,
          index //신규상품
        ) => (
          <div key={index} className="adItem">
            <div className="adContent">
              {ad.usedName}
              <img
                src={`../usupload/${ad.usedproductFileTblList[0]?.usedFileSysname}`}
              />
            </div>
          </div>
        )
      )}
      {used?.map(
        (
          ad,
          index //중고상품
        ) => (
          <div key={index} className="adItem">
            <div className="adContent">
              {ad.usedName}
              <img
                src={`../usupload/${ad.usedproductFileTblList[0]?.usedFileSysname}`}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default AdGrid;
