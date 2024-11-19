import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Button from "./Button";
import ProductTable from "./ProductTable";
import Paging from "./Paging";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";

const df = (date) => moment(date).format("YYYY-MM-DD");

const ProductRegistered = () => {
  const nav = useNavigate();
  const sellerId = sessionStorage.getItem("nid");
  const pnum = sessionStorage.getItem("pageNum");
  const [bitem, setBitem] = useState({});
  const [page, setPage] = useState({
    //페이징 관련 정보 저장
    totalPage: 0,
    pageNum: 1,
  });

  // 서버로부터 등록상품 가져오는 함수
  const getBoardList = (pnum) => {
    axios
      .get("/ProductList", { params: { pageNum: pnum, sellerId: sellerId } })
      .then((res) => {
        const { bList, totalPage, pageNum, sellerId } = res.data;
        console.log(totalPage);
        setPage({ totalPage: totalPage, pageNum: pageNum });
        console.log(page);
        setBitem(bList);
        console.log(bList);
        sessionStorage.getItem("pageNum", pageNum);
      })
      .catch((err) => console.log(err));
  };

  //ProductRegistered 컴포넌트가 화면에 보일 때 서버로부터 등록상품 목록을 가져온다
  useEffect(() => {
    console.log(sellerId);
    if (sellerId === null) {
      nav("/", { replace: true });
      return;
    }
    pnum !== null ? getBoardList(pnum) : getBoardList(1);
  }, []);

  //등록상품 목록 작성
  let BoardList = null;
  if (bitem.length === 0) {
    BoardList = (
      <TableRow key={0}>
        <TableColumn span={4}>등록된 상품이 없습니다.</TableColumn>
      </TableRow>
    );
  } else {
    BoardList = Object.values(bitem).map((item, index) => (
      <TableRow key={item.productCode}>
        <TableColumn wd={"w-10"}>{index + 1}</TableColumn>
        <TableColumn wd={"w-40"}>
          <div onClick={() => getBoard(item.productCode)}>
            {item.productName}
          </div>
        </TableColumn>
        <TableColumn wd={"w-30"}>{item.categoryCode}</TableColumn>
        <TableColumn wd={"w-20"}>{item.sellerId}</TableColumn>
        <TableColumn wd={"w-30"}>{df(item.ProductDate)}</TableColumn>
      </TableRow>
    ));
  }
  const getBoard = (productCode) => {
    nav("pdView", { state: { pc: productCode } });
  };

  return (
    <div className="table-ex">
      <h1>등록한 상품</h1>
      <ProductTable hName={["번호", "상품", "종류", "판매자", "등록날짜"]}>
        {BoardList}
      </ProductTable>
      <Paging page={page} getList={getBoardList} />
      
      <dr />  
      <Button
        size="large"
        wsize="s-50"
        onClick={() => {
          nav("/mypage/usedRegistered");
        }}
      >
        중고등록한상품
      </Button>
    </div>
  );
};

export default ProductRegistered;
