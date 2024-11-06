import React, { useState } from "react";
import "./scss/MyTable.scss";

const BproductTable = ({ hname, children }) => {
  return (
    <div>
      <table className="Table">
        <thead>
          <tr>
            <th className="TableHeader" rowspan="2">
              {hname[0]}
            </th>
            <th className="TableHeader" colspan="5">
              {hname[1]}
            </th>
            <th className="TableHeader" rowspan="2">
              {hname[7]}
            </th>
            <th className="TableHeader" rowspan="2">
              {hname[8]}
            </th>
          </tr>
          <tr>
            <th className="TableHeader">{hname[2]}</th>
            <th className="TableHeader">{hname[3]}</th>
            <th className="TableHeader">{hname[4]}</th>
            <th className="TableHeader">{hname[5]}</th>
            <th className="TableHeader">{hname[6]}</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default BproductTable;
