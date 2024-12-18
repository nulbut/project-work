import React from "react";
import "./scss/ProductTable.scss";

const BproductStockTable = ({ hname, children }) => {
  return (
    <div>
      <table className="Table">
        <thead>
          <tr>
            <th className="TableHeader">{hname[0]}</th>
            <th className="TableHeader">{hname[1]}</th>
            <th className="TableHeader">{hname[2]}</th>
            <th className="TableHeader">{hname[3]}</th>
            <th className="TableHeader">{hname[4]}</th>
            {/* <th className="TableHeader">{hname[5]}</th>
            <th className="TableHeader">{hname[6]}</th>
            <th className="TableHeader">{hname[7]}</th> */}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default BproductStockTable;
