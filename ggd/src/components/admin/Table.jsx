import React from "react";

const Table = ({ hName, children }) => {
  return (
    <table className="Table">
      <thead>
        <tr>
          <th className="TableHeader w-10">{hName[0]}</th>
          <th className="TableHeader w-10">{hName[1]}</th>
          <th className="TableHeader w-10">{hName[2]}</th>
          <th className="TableHeader w-10">{hName[3]}</th>
          <th className="TableHeader w-10">{hName[4]}</th>
          <th className="TableHeader w-10">{hName[5]}</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
