import React from "react";

const BproductTable = ({ hname, children }) => {
  return (
    <div>
      <table className="Table">
        <thead>
          <tr>
            <th className="TableHeader w-10">{hname[0]}</th>
          </tr>
          <tr>
            <th className="TableHeader w-10">{hname[1]}</th>
            <th className="TableHeader w-10">{hname[2]}</th>
            <th className="TableHeader w-10">{hname[3]}</th>
            <th className="TableHeader w-10">{hname[4]}</th>
            <th className="TableHeader w-10">{hname[5]}</th>
            <th className="TableHeader w-10">{hname[6]}</th>
            <th className="TableHeader w-10">{hname[7]}</th>
            <th className="TableHeader w-10">{hname[8]}</th>
            <th className="TableHeader w-10">{hname[9]}</th>
            <th className="TableHeader w-10">{hname[10]}</th>
            <th className="TableHeader w-10">{hname[11]}</th>
          </tr>
        </thead>
        <tobody>{children}</tobody>
      </table>
    </div>
  );
};

export default BproductTable;
