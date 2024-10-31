import axios from "axios";
import moment from "moment";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import Table from "./Table";
import Paging from "./Paging";
import Button from "../idealcup/Button";
import Nwrite from "./Nwrite";
import NoticeList from "./NoticeList";
import { AdminPageContextStore } from "./AdminPageStatus";

const Notice = () => {
  const nav = useNavigate();
  const pageSt = useContext(AdminPageContextStore);

  //const [viewName, setViewName] = useState(<NoticeList viewChange={viewChange}/>);
  // const aid = sessionStorage.getItem("mid");
  useEffect(() => {
    pageSt.setViewPage(<NoticeList />);
  },[]);

  const buttons = [
    {
      name: "등록",
      // path: "/UserListPage",
      // Element: UserList,
    },
  ];

  const viewChange = () => {
    console.log("viewChange");
    pageSt.setViewPage(<NoticeList />);
  };

  // const moveMenu = () => {
  //   setViewName(<Nwrite viewChange={viewChange} />);
  // };

  return <div className="Main">{pageSt.viewPage}</div>;
};

export default Notice;
