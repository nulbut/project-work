import React, { useEffect, useState } from "react";
import Paging from "../shop/Paging";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "./Table";
import "./scss/Table.scss";
import "./scss/Admin.scss";




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

  const user = sessionStorage.getItem("bid");
  const pnum = sessionStorage.getItem("pageNum");

  const getUserList = (pnum) => {
    // axios
    //   .get("/list", { params: { pageNum: pnum } })
    //   .then((res) => {
    //     const { list, totalPage, pageNum } = res.data;
    //     setPage({ totalPage: totalPage, pageNum: pageNum });
    //     setList(list);
    //     sessionStorage.setItem("pageNum", pageNum);
    //   })
    //   .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (user === null) {
      //   nav("/", { replace: true });
      //   return; // 로그인 안한 경우 첫 화면으로 이동
    }
    pnum !== null ? getUserList(pnum) : getUserList(1);
  }, []);

  let userList = null;
  if (list.length === 0) {
    userList = (
      <TableRow key={0}>
        <TableColumn span={6}>회원이 없습니다.</TableColumn>
      </TableRow>
    );
  } else {
    userList = Object.values(list).map((item, idx) => (
      <TableRow key={idx}>
        <TableColumn wd={10}>{item.hId}</TableColumn>
        <TableColumn wd={20}>{item.hName}</TableColumn>
        <TableColumn wd={30}>{item.hPhone}</TableColumn>
        <TableColumn wd={40}>{item.hEmail}</TableColumn>
        <TableColumn wd={50}>{item.hsigndt}</TableColumn>
        <TableColumn wd={60}>
            <select>
                <option selected={item.hState === ""? true: false}></option>
                <option selected={item.hState === ""? true: false}></option>
                <option selected={item.hState === ""? true: false}></option>
                <option selected={item.hState === ""? true: false}></option>
            </select>
        </TableColumn>
      </TableRow>
    ));
  }

  const onSearch = () => {};

  return (
    <div>
      <h1>기간별 회원 조회</h1>
      <form onSubmit={onSearch}>
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
        {UserList}
      </Table>
      <Paging page={page} getList={getUserList} />
    </div>
  );
};

export default UserList;
