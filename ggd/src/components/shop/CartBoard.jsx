import React from "react";
import "./scss/Table.scss";

const CartBoard = ({ cName, children }) => {
  return (
    <table className="Table">
      <thead>
        <tr>
          <th className="TavleHeader w-10">{cName[0]}</th>
          <th className="TavleHeader w-10">{cName[1]}</th>
          <th className="TavleHeader w-10">{cName[2]}</th>
          <th className="TavleHeader w-10">{cName[3]}</th>
          <th className="TavleHeader w-10">{cName[4]}</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default CartBoard;
