import React, { useCallback, useContext, useEffect, useState } from "react";
import Paging from "./Paging";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Table from "./Table";
import "./scss/Table.scss";
import "./scss/Admin.scss";
import { AdminPageContextStore } from "./AdminPageStatus";

const df = (date) => moment(date).format("YYYY-MM-DD");

const NuserList = () => {
  const nav = useNavigate();

  const pageSt = useContext(AdminPageContextStore);

  //   const [startDate, setStartDate] = useState("");
  //   const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState({
    //페이징 관련 정보 저장 state
    totalPage: 0,
    pageNum: 1,
  });

  //   console.log(endDate);
  //   console.log(startDate);

  const [list, setList] = useState({});

  const admin = sessionStorage.getItem("bid");
  const pnum = sessionStorage.getItem("pageNum");

  const getUserList = (pnum) => {
    const pm = {
      pageNum: pnum,
      startDate: pageSt.startDate,
      endDate: pageSt.endDate,
      searchColumn: pageSt.searchColumn,
      searchKeyword: pageSt.searchKeyword,
    };
    console.log(pm);

    axios
      .get("/admin/list", {
        params: pm,
      })
      .then((res) => {
        console.log(res.data);
        const { mlist, totalPage, pageNum } = res.data;
        setPage({ totalPage: totalPage, pageNum: pageNum });
        setList(mlist);
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

  const onSearch = useCallback(() => {
    getUserList(1);
  }, [
    pageSt.searchColumn,
    pageSt.searchKeyword,
    pageSt.startDate,
    pageSt.endDate,
  ]);

  const onStartChange = (e) => {
    console.log(e.target.value);
    pageSt.setStartDate(e.target.value);
  };

  const onEndChange = (e) => {
    console.log(e.target.value);
    pageSt.setEndDate(e.target.value);
  };

  const onSearchChange = (e) => {
    console.log(e.target.value);
    const column = e.target.value;
    if (column === "ID") {
      pageSt.setSearchKeyword("");
      pageSt.setStartDate("");
      pageSt.setEndDate("");
    }
    pageSt.setSearchColumn(column);
  };

  const onKeywordChange = (e) => {
    console.log(e.target.value);
    pageSt.setSearchKeyword(e.target.value);
  };

  return (
    <>
      <div className="search-form">
        <h3>기간별 일반회원 가입일자 조회</h3>
        <form>
          <div className="search">
            <select id="Id" name="ID" onChange={onSearchChange}>
              <option value="ID" selected={pageSt.searchColumn === "ID"}>
                ID
              </option>
              <option value="이름" selected={pageSt.searchColumn === "이름"}>
                이름
              </option>
            </select>
            <input
              placeholder="이름"
              value={pageSt.searchKeyword}
              onChange={onKeywordChange}
            />
            <button type="button" onClick={onSearch}>
              검색
            </button>
          </div>
          <div>
            <label>시작 날짜:</label>
            <input
              type="date"
              value={pageSt.startDate}
              onChange={onStartChange}
              required
            />
          </div>
          <div>
            <label>종료 날짜:</label>
            <input
              type="date"
              value={pageSt.endDate}
              onChange={onEndChange}
              required
            />
          </div>
          <button type="button" onClick={onSearch}>
            조회
          </button>
        </form>
      </div>
      <Table hName={["ID", "이름", "연락처", "이메일", "가입날짜", "비고"]}>
        {userList}
      </Table>
      <Paging page={page} getList={getUserList} />
    </>
  );
};

export default NuserList;
