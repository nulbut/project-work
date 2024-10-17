import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import ProductViewLayout from "./ProductViewLayout";
import Paging from "./Paging";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";

const df = (date) => moment(date).format("YYYY-MM-DD HH:mm:ss");

const RegisteredProduct = () => {
  const nav = useNavigate();

  const mid = "asd";

  const options = [
    { value: "productName", label: "제품명" },
    { value: "productDetail", label: "내용" },
  ];

  const [bitem, setBitem] = useState({});
  const [page, setPage] = useState({
    totalPage: 0,
    pageNum: 1,
  });

  const getList = (page) => {
    console.log("test");

    axios
      .get("/pdlist", { params: { pageNum: page } })
      .then((res) => {
        console.log(res.data);
        const { bList, totalPage, pageNum } = res.data;
        setPage({ totalPage: totalPage, pageNum: pageNum });
        setBitem(bList);
        console.log(bitem);
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
        <TableColumn span={4}>등록된 상품이 없습니다.</TableColumn>
      </TableRow>
    );
  } else {
    list = Object.values(bitem).map((item) => (
      <TableRow key={item.productCode}>
        <TableColumn wd="w-10">{item.productCode}</TableColumn>
        <TableColumn wd="w-40">
        <div onClick={() => ProductList(item.productCode)}>
            {item.productName}
          </div>
        </TableColumn>
        <TableColumn wd="w-20">{item.sellerId}</TableColumn>
        <TableColumn wd="w-30">{df(item.ProductDate)}</TableColumn>
      </TableRow>
    ));
  }
  

  return (
    <div>
      <ProductViewLayout hName={["번호", "상품", "판매자", "등록날짜"]}>
        {list}
      </ProductViewLayout>
    </div>
  );
};

export default RegisteredProduct;
