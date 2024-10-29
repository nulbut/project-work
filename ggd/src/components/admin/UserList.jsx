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
import BuserList from "./BuserList";
import NuserList from "./NuserList";

const df = (date) => moment(date).format("YYYY-MM-DD");

const UserList = () => {
  const nav = useNavigate();

  const [viewName, setViewName] = useState(<NuserList />);

  const uhandleClick = (num) => {
    if (num == 1) {
      setViewName(<NuserList />);
    } else {
      setViewName(<BuserList />);
    }
  };

  return (
    <div className="menu">
      <div className="change">
        <h3 onClick={() => uhandleClick(1)} style={{ cursor: "pointer" }}>
          일반
        </h3>
        <h3 onClick={() => uhandleClick(2)} style={{ cursor: "pointer" }}>
          사업자
        </h3>
      </div>
      <>{viewName}</>
    </div>
  );
};

export default UserList;
