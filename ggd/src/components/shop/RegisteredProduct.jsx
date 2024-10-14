import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import ProductViewLayout from "./ProductViewLayout";

import TableRow from "./TableRow";
import TableColumn from "./TableColumn";

const df = (date) => moment(date).format("YYYY-MM-DD HH:mm:ss");

const RegisteredProduct = () => {
  const nav = useNavigate();
  
  const mid = "asd";

  const options = [
    { value: "pdName", label: "제품명"},
    { value: "pdDetail", label: "내용"},
  ];

  const [bitem, setBitem] = useState({});
  const [page, setPage] = useState({
    totalPage: 0,
    pageNum: 1,
  });

  const getList = (page) => {
    console.log("test");

    axios
    .get("/pdlist", { params: { pageNum: page }})
    .then((res) => {
        const { blist, totalPage, pageNum } = res.data;
        setPage({ totalPage: totalPage, pageNum: pageNum});
        setBitem(blist);
    })
    .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (mid === null) {
        nav("/", { replace: true });
        return;
    }

    getList(1);
  }, []);

  let list = null;
  if (bitem.length === 0) {
    list = (
        <TableRow key={0}>
            <TableColumn span={4}>게시글이 없습니다.</TableColumn>
        </TableRow>
    );
  } else {
    list = Object.values(bitem).map((item) => (
      <TableRow key={item.pdCode}>
        <TableColumn wd="w-10">{item.pdCode}</TableColumn>
        <TableColumn wd="w-40">
            <div onClick={() => getBoard(item.pdCode)}>{item.pdCode}</div>
        </TableColumn>
        <TableColumn wd="w-20">{item.pdAuthor}</TableColumn>
        <TableColumn wd="w-30">{df(item.rdate)}</TableColumn>
      </TableRow>
    ));
  }
  

  return (
    <div>
        <ProductViewLayout hName={["NO", "Title", "Writer", "Date"]}>
            {list}
        </ProductViewLayout>
    </div>
  )
};

export default RegisteredProduct;