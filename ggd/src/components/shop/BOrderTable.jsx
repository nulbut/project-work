import React from "react";

const BOrderTable = ({ hname, children }) => {
  return (
    <div>
      <table className="Table">
        <thead>
          <tr>
            <th className="TableHeader">{hname[0]}</th>
            <th className="TableHeader">{hname[1]}</th>
            <th className="TableHeader">{hname[16]}</th>
            <th className="TableHeader">{hname[17]}</th>
            <th className="TableHeader">{hname[19]}</th>
            <th className="TableHeader">{hname[20]}</th>
          </tr>
          <tr></tr>
          <tr></tr>
        </thead>
      </table>
    </div>
  );
};

export default BOrderTable;
