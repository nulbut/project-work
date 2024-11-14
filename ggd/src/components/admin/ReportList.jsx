import React, { useCallback, useContext, useEffect, useState } from "react";
import { AdminPageContextStore } from "./AdminPageStatus";
import axios from "axios";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import moment from "moment";
import Table from "./Table";
import Paging from "./Paging";
import ReportView from "./ReportView";
import "./scss/Admin.scss";

const df = (date) => moment(date).format("YYYY-MM-DD");

const ReportList = () => {
  const pnum = sessionStorage.getItem("pageNumReport");
  const [aitem, setAitem] = useState({});
  const [page, setPage] = useState({
    totalPage: 0,
    pageNum: 1,
  });

  const pageSt = useContext(AdminPageContextStore);

  const truncateContent = (content) => {
    if (content.length > 20) {
      return content.substring(0, 20) + "..."; // 50자 이상이면 잘라서 '...' 추가
    }
    return content; // 50자 미만이면 그대로 반환
  };
  const renderReason = (reason) => {
    // reason에 따라 다른 값을 리턴
    switch (reason) {
      case "spam":
        return "스팸";
      case "harassment":
        return "괴롭힘";
      case "abuse":
        return "폭력";
      default:
        return "기타";
    }
  };
  const getrList = (pnum) => {
    axios
      .get("/admin/report", { params: { pageNum: pnum } })
      .then((res) => {
        const { rList, totalPage, pageNum } = res.data;
        setPage({ totalPage: totalPage, pageNum: pageNum });
        setAitem(rList);
        sessionStorage.setItem("pageNumReport", pageNum);
      })
      .catch((err) => console.log(err));
  };

  let list = null;
  if (aitem.length === 0) {
    list = (
      <TableRow key={0}>
        <TableColumn span={5}>신고함이 비어있습니다.</TableColumn>
      </TableRow>
    );
  } else {
    list = Object.values(aitem).map((item, index) => (
      <TableRow key={item.rnum}>
        <TableColumn wd="w-10">{index + 1}</TableColumn>
        <TableColumn wd="w-10">
          <div onClick={() => getReport(item.rnum)}>
            {renderReason(item.rreason)}
          </div>
        </TableColumn>
        <TableColumn wd="w-40">{truncateContent(item.rcontent)}</TableColumn>
        <TableColumn wd="w-20">{item.ruid}</TableColumn>
        <TableColumn wd="w-10">{df(item.rdate)}</TableColumn>
        <TableColumn wd="w-10">{item.rstatus}</TableColumn>
      </TableRow>
    ));
  }

  const getReport = useCallback((rnum) => {
    pageSt.setViewPage(<ReportView rnum={rnum} />);
  });

  useEffect(() => {
    // if (!admin) {
    //     nav("/", { replace: true });
    //     return; // 로그인 안한 경우 첫 화면으로 이동
    // }
    pnum !== null ? getrList(pnum) : getrList(1);
  }, []);

  return (
    <div className="Content">
      <h1>신고함</h1>
      <Table hName={["번호", "신고사유", "내용", "ID", "날짜", "처리"]}>
        {list}
      </Table>
      <Paging page={page} getList={getrList} />
    </div>
  );
};

export default ReportList;
