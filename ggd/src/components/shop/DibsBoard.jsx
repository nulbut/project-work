import React from "react";
import "./scss/Table.scss";

const DibsBoard = ({ dName, children }) => {
  return (
    <table className="Table">
      <thead>
        <tr>
          <th className="TableHeader w-10">{dName[0]}</th>
          <th className="TableHeader w-10">{dName[1]}</th>
          <th className="TableHeader w-10">{dName[2]}</th>
          <th className="TableHeader w-10">{dName[3]}</th>
          <th className="TableHeader w-10">{dName[4]}</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default DibsBoard;
