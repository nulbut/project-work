import axios from "axios";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import Table from "./Table";
import Paging from "./Paging";
import Button from "../idealcup/Button";
import Nwrite from "./Nwrite";
import NoticeList from "./NoticeList";

const Notice = () => {
  const nav = useNavigate();
  const [viewName, setViewName] = useState(<NoticeList />);
  // const aid = sessionStorage.getItem("mid");

  const buttons = [
    {
      name: "등록",
      // path: "/UserListPage",
      // Element: UserList,
    },
  ];

  const viewChange = () => {
    setViewName(<NoticeList />);
  };

  const moveMenu = () => {
    setViewName(<Nwrite viewChange={viewChange} />);
  };

  return (
    <div className="Main">
      <div className="Content">
        <h1>공지사항</h1>
        <Button size="small" wsize="s-50" onClick={moveMenu}>
          등록
        </Button>
        {/* {buttons.map((butn, idx) => {
          return (
            <Link className="sideber-menu" to={butn.path} key={idx}>
              <Button
                size="large"
                color="black"
                onClick={() => moveMenu(butn.name)}
              >
                {butn.name}
              </Button>
            </Link>
          );
        })} */}
        {viewName}
      </div>
      {/* <div className="desc">{viewName}</div> */}
    </div>
  );
};

export default Notice;
