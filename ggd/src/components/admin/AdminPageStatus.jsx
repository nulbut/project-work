import React, { createContext, useState } from "react";

export const AdminPageContextStore = createContext();

const AdminPageStatus = (props) => {
  const [searchColumn, setSearchColumn] = useState("ID");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [pageNumNotice, setPageNumNotice] = useState(1);
  const [pageNumReport, setPageNumReport] = useState(1);
  const [viewPage, setViewPage] = useState();

  const pageStatus = {
    searchColumn,
    setSearchColumn,
    searchKeyword,
    setSearchKeyword,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    pageNum,
    setPageNum,
    pageNumNotice,
    setPageNumNotice,
    pageNumReport,
    setPageNumReport,
    viewPage,
    setViewPage,
  };

  return (
    <AdminPageContextStore.Provider value={pageStatus}>
      {props.children}
    </AdminPageContextStore.Provider>
  );
};

export default AdminPageStatus;
