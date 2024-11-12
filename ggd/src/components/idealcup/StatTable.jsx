// src/components/StatTable.jsx
import React, { useEffect, useState } from "react";
import "./scss/StatTable.scss";
import axios from "axios";

const StatTable = ({ iwcCode, contentCode }) => {
  const [data, setData] = useState({
    iwc: "",
    content: "",
    rank: "",
  });

  useEffect(() => {
    const axiosGet = async () => {
      await axios
        .get("/getGameWinner", {
          params: { iwcCode: iwcCode, iwcContentsCode: contentCode },
        })
        .then((res) => {
          console.log(res);
          setData(res.data);
        })
        .catch((err) => console.log(err));
    };

    axiosGet();
  }, []);
  console.log(data);
  return (
    <table className="statTable">
      <thead>
        <tr>
          <th>순위(월드컵 내)</th>
          <th>
            우승비율
            <hr />
            (최종 우승 수 / 전체 게임 수)
          </th>
          <th>
            승률
            <hr />
            (승리 횟수/ 1:1 대결 수)
          </th>
          <th>카테고리</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{data.rank}</td>
          <td style={{ width: "300px" }}>
            {data.content.iwcContentFinalcount}/{data.iwc.iwcComplete}
            <progress
              value={data.content.iwcContentFinalcount}
              max={data.iwc.iwcComplete}
            ></progress>
          </td>
          <td style={{ width: "300px" }}>
            {data.content.iwcContentWincount}/{data.content.iwcContentVscount}
            <progress
              value={data.content.iwcContentWincount}
              max={data.content.iwcContentVscount}
            ></progress>
          </td>
          {data.content.iwcContentsCategory == "" ? (
            <td>미등록</td>
          ) : (
            <td>{data.content.iwcContentsCategory}</td>
          )}
        </tr>
      </tbody>
    </table>
  );
};

export default StatTable;
