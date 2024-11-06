import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminPageContextStore } from "./AdminPageStatus";
import ReportList from "./ReportList";
import "./scss/Admin.scss";

const Report = () => {
  const nav = useNavigate();
  const pageSt = useContext(AdminPageContextStore);

  useEffect(() => {
    pageSt.setViewPage(<ReportList />);
  }, []);

  const buttons = [
    {
      name: "처리",
      // path: "/UserListPage",
      // Element: UserList,
    },
  ];

  const viewChange = () => {
    console.log("viewChange");
    pageSt.setViewPage(<ReportList />);
  };

  return <div className="admin-main">{pageSt.viewPage}</div>;
};

export default Report;
