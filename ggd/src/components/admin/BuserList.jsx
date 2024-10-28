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

const BuserList = () => {
  const nav = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState({
    //페이징 관련 정보 저장 state
    totalPage: 0,
    pageNum: 1,
  });

  const [blist, setBlist] = useState({});

  const admin = sessionStorage.getItem("bid");
  const pnum = sessionStorage.getItem("pageNum");

  const getBuserList = (pnum) => {
    axios
      .get("/admin/blist", {
        params: { pageNum: pnum, startDate: startDate, endDate: endDate },
      })
      .then((res) => {
        console.log(res.data);
        const { blist, totalPage, pageNum } = res.data;
        setPage({ totalPage: totalPage, pageNum: pageNum });
        setBlist(blist);
        // sessionStorage.setItem("userList", userList);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // if (!admin) {
    //     nav("/", { replace: true });
    //     return; // 로그인 안한 경우 첫 화면으로 이동
    // }
    pnum !== null ? getBuserList(pnum) : getBuserList(1);
  }, []);

  let buserList = null;
  console.log(blist);
  if (blist.length === 0) {
    console.log("length 0");
    buserList = (
      <TableRow key={0}>
        <TableColumn span={6}>회원이 없습니다.</TableColumn>
      </TableRow>
    );
  } else {
    buserList = Object.values(blist).map((item, idx) => (
      <TableRow key={idx}>
        <TableColumn wd={10}>{item.bid}</TableColumn>
        <TableColumn wd={20}>{item.bname}</TableColumn>
        <TableColumn wd={30}>{item.bphonenum}</TableColumn>
        <TableColumn wd={40}>{item.bemail}</TableColumn>
        <TableColumn wd={50}>{df(item.bsigndt)}</TableColumn>
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
    getBuserList(1);
  };

  return (
    <>
      <h3>기간별 사업자회원 가입일자 조회</h3>
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
        {buserList}
      </Table>
      <Paging page={page} getList={getBuserList} />
    </>
  );
};

export default BuserList;
