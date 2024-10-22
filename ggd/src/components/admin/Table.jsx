import React from "react";

const Table = ({ hName, children }) => {
  const theadlist = Object.values(hName).map((hitem, idx) => {
    return (
      <th className="TableHeader w-10" key={idx}>
        {hitem}
      </th>
    );
  });
  return (
    <table className="Table">
      <thead>
        <tr>{theadlist}</tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
