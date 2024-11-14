import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import TableRow from "../admin/TableRow";
import TableColumn from "../admin/TableColumn";

const df = (date) => moment(date).format("YYYY-MM-DD");

const UrevList = () => {
  const uid = sessionStorage.getItem("uid");
  const pnum = sessionStorage.getItem("pageNumreview");
  const [ritem, setRtiem] = useState({});
  const [page, setPage] = useState({
    totalPage: 0,
    pageNum: 1,
  });

  const getList = (pnum) => {
    axios
      .get("/rvlist", { params: { pageNum: pnum } })
      .then((res) => {
        const { rvList, totalPage, pageNum } = res.data;
        setPage({ totalPage: totalPage, pageNum: pageNum });
        setRtiem(rvList);
        sessionStorage.setItem("pageNum", pageNum);
      })
      .catch((err) => console.log(err));
  };

  let list = null;
  if (ritem.length === 0) {
    list = (
      <TableRow key={0}>
        <TableColumn span={2}></TableColumn>
      </TableRow>
    );
  }

  return <div></div>;
};

export default UrevList;
