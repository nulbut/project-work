import React, { useEffect, useState } from "react";
import Paging from "./Paging";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Table from "./Table";
import "./scss/Table.scss";
import "./scss/Admin.scss";
import "./scss/AdminMain.scss";
import BuserList from "./BuserList";
import NuserList from "./NuserList";

const df = (date) => moment(date).format("YYYY-MM-DD");

const UserList = ({ props, user }) => {
  console.log(user);
  const nav = useNavigate();
  const [viewName, setViewName] = useState();

  useEffect(() => {
    user == "일반 회원"
      ? setViewName(<NuserList />)
      : setViewName(<BuserList />);
  }, [user]);

  const uhandleClick = (num) => {
    if (num == 1) {
      setViewName(<NuserList />);
    } else {
      setViewName(<BuserList />);
    }
  };

  return (
    <div className="admin-menu">
      <h2>회원 목록</h2>
      <div className="change">
        <h3 onClick={() => uhandleClick(1)} style={{ cursor: "pointer" }}>
          일반
        </h3>
        <h3 onClick={() => uhandleClick(2)} style={{ cursor: "pointer" }}>
          사업자
        </h3>
      </div>
      <div className="view-name">{viewName}</div>
    </div>
  );
};

export default UserList;
