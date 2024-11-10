// src/components/StatTable.jsx
import React from "react";
import "./scss/StatTable.scss";

const StatTable = ({ statistics }) => {
  return (
    <table className="statTable">
      <thead>
        <tr>
          <th>카테고리</th>
          <th>값</th>
        </tr>
      </thead>
      <tbody>
        {statistics.map((stat, index) => (
          <tr key={index}>
            <td>{stat.category}</td>
            <td>{stat.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StatTable;
