import React from "react";
import "./scss/Table.scss";

const InquiryBoard = ({ bName, children }) => {
  return (
    <table className="Table">
      <thead>
        <tr>
          <th className="TableHeader w-10">{bName[0]}</th>
          <th className="TableHeader w-10">{bName[1]}</th>
          <th className="TableHeader w-10">{bName[2]}</th>
          <th className="TableHeader w-10">{bName[3]}</th>
          <th className="TableHeader w-10">{bName[4]}</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default InquiryBoard;
