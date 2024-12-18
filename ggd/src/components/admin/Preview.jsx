import React, { useCallback, useEffect, useState } from "react";
import { AdminPageContextStore } from "./AdminPageStatus";
import axios from "axios";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import Table from "./Table";
import Paging from "./Paging";
import moment from "moment";

const df = (date) => moment(date).format("YYYY-MM-DD");

const Preview = () => {
  const [rvitem, setRvitem] = useState([]);

  //   const PageSt = useContext(AdminPageContextStore);

  const getrvList = () => {
    console.log("getrvList");
    axios
      .get("admin/getrvlist")
      .then((res) => {
        console.log(res.data);
        setRvitem(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getrvList();
  }, []);

  let list = null;
  if (rvitem.length === 0) {
    list = (
      <TableRow key={0}>
        <TableColumn span={4}>아직 후기가 없습니다.</TableColumn>
      </TableRow>
    );
  } else {
    list = rvitem.map((item) => (
      <TableRow key={item.unum}>
        <TableColumn wd={10}>{item.ucode}</TableColumn>
        <TableColumn wd={20}>{item.upreivew}</TableColumn>
        <TableColumn wd={30}>{item.uid}</TableColumn>
        <TableColumn wd={40}>{df(item.urdate)}</TableColumn>
        <TableColumn wd={10}>
          <button onClick={() => deleteReview(item.unum)}>삭제</button>
        </TableColumn>
      </TableRow>
    ));
  }

  const deleteReview = useCallback((unum) => {
    let conf = window.confirm("삭제 할까요?");
    if (!conf) {
      return;
    }

    axios
      .post("/admin/deleterv", null, { params: { uNum: unum } })
      .then((res) => {
        if (res.data.res === "ok") {
          alert("삭제 완료");
          getrvList(res.data);
        } else {
          alert("삭제 실패");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  //   useEffect(() => {
  //     // if (!admin) {
  //     //     nav("/", { replace: true });
  //     //     return; // 로그인 안한 경우 첫 화면으로 이동
  //     // }
  //     unum !== null ? getrvList(unum) : getrvList(1);
  //   }, []);

  return (
    <div className="Content">
      <h1>후기 관리</h1>
      <Table hName={["상품코드", "내용", "ID", "날짜", "관리"]}>{list}</Table>
      {/* <Paging getrvList={getrvList} /> */}
    </div>
  );
};

export default Preview;
