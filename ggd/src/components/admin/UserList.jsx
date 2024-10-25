import React, { useEffect, useState } from "react";
import Paging from "./Paging";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Table from "./Table";
import "./scss/Table.scss";
import "./scss/Admin.scss";

const df = (date) => moment(date).format("YYYY-MM-DD");

const UserList = () => {
  const nav = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState({
    //페이징 관련 정보 저장 state
    totalPage: 0,
    pageNum: 1,
  });

  const [list, setList] = useState({});

  const admin = sessionStorage.getItem("bid");
  const pnum = sessionStorage.getItem("pageNum");

  const getUserList = (pnum) => {
    axios
      .get("/admin/list", {
        params: { pageNum: pnum, startDate: startDate, endDate: endDate },
      })
      .then((res) => {
        console.log(res.data);
        const { mlist, totalPage, pageNum } = res.data;
        setPage({ totalPage: totalPage, pageNum: pageNum });
        setList(mlist);
        // sessionStorage.setItem("userList", userList);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // if (!admin) {
    //     nav("/", { replace: true });
    //     return; // 로그인 안한 경우 첫 화면으로 이동
    // }
    pnum !== null ? getUserList(pnum) : getUserList(1);
  }, []);

  let userList = null;
  console.log(list);
  if (list.length === 0) {
    console.log("length 0");
    userList = (
      <TableRow key={0}>
        <TableColumn span={6}>회원이 없습니다.</TableColumn>
      </TableRow>
    );
  } else {
    userList = Object.values(list).map((item, idx) => (
      <TableRow key={idx}>
        <TableColumn wd={10}>{item.nid}</TableColumn>
        <TableColumn wd={20}>{item.nname}</TableColumn>
        <TableColumn wd={30}>{item.nphonenum}</TableColumn>
        <TableColumn wd={40}>{item.nemail}</TableColumn>
        <TableColumn wd={50}>{df(item.nsigndt)}</TableColumn>
        <TableColumn wd={60}>
          <select>
            <option selected={item.hState === "" ? true : false}></option>
            <option selected={item.hState === "" ? true : false}></option>
            <option selected={item.hState === "" ? true : false}></option>
            <option selected={item.hState === "" ? true : false}></option>
          </select>
        </TableColumn>
      </TableRow>
    ));
  }

  const onSearch = (e) => {
    e.preventDefualt();
    getUserList(1);
  };

  return (
    <div className="menu">
      <h1>기간별 회원 조회</h1>
      <form onSubmit={onSearch}>
        <div search>
          <select id="Id" name="ID">
            <option value="ID">ID</option>
            <option value="이름">이름</option>
          </select>
          <input placeholder="이름" />
          <button>검색</button>
        </div>
        <div>
          <label>시작 날짜:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>종료 날짜:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">조회</button>
      </form>
      <Table hName={["ID", "이름", "연락처", "이메일", "가입날짜", "비고"]}>
        {userList}
      </Table>
      <Paging page={page} getList={getUserList} />
    </div>
  );
};

export default UserList;