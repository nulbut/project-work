import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Button from "./Button";
import ProductView from "./ProductView";
import Paging from "./Paging";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";


const df = (date) => moment(date).format("YYYY-MM-DD HH:mm:ss");

const ProductRegistered = () => {
  const nav = useNavigate();
  const sellerId = ("sellerId");
  const pNum = (1);
  const [bitem, setBitem] = useState([]);
  const [page, setPage] = useState({
    //페이징 관련 정보 저장
    totalPage: 0,
    pageNum: 1,
  });
  console.log(page);
  console.log(bitem);
  // 서버로부터 등록상품 가져오는 함수
  const getBoardList = (pNum) => {
    axios
      .get("/BoardList", { params: { pageNum: pNum } })
      .then((res) => {
        const { bList, totalPage, pageNum } = res.data;
        setPage({ totalPage: totalPage, pageNum: pNum });
        setBitem(bList);
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
    pNum !== null ? getBoardList(pNum) : getBoardList(1);
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
    BoardList = Object.values(bitem).map((item) => (
      <TableRow key={item.productCode}>
        <TableColumn wd={"w-10"}>{item.productCode}</TableColumn>
        <TableColumn wd={"w-40"}>
          <div onClick={() => getBoard(item.productCode)}>
            {item.productName}
          </div>
        </TableColumn>
        <TableColumn wd={"w-20"}>{item.sellerId}</TableColumn>
        <TableColumn wd={"w-30"}>{df(item.ProductDate)}</TableColumn>
      </TableRow>
    ));
  }
  const getBoard = useCallback((productCode) => {
    nav("", { state: { pc: productCode } });
  });

  return (
    <div className="table-ex">
      <ProductView hName={["번호", "상품", "판매자", "등록날짜"]}>
        {BoardList}
      </ProductView>
      <Paging page={page} getList={getBoardList} />
      <Button
        size="large"
        wsize="s-50"
        onClick={() => {
          nav("/productWrite");
        }}
      >
        상품등록
      </Button>
    </div>
  );
};

export default ProductRegistered;
