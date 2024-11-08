import classNames from "classnames";
import React from "react";

const TableRow = ({ children, bg }) => {
  return <tr className={classNames("TableRow", bg)}>{children}</tr>;
};

export default TableRow;
