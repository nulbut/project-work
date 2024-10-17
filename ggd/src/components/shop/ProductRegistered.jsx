import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Button from "./Button";
import ProductView from "./ProductView";
import Paging from "./Paging";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";

//2024-10-16 16:57 까지 한것
//너무 긴 파일이름 변경 db는 여전히 안들어오고 다른 에러 발생 페이지는 들어가지다가 메인페이지로 넘어감. 18
//무한 스크롤 더미이미지기능 버리고 일반이미지 넣음(noimage) 내일 아침에와서 db만져야함
//최대한 빨리 db 두개 해결하고 검색기능 하겠음 
const df = (date) => moment(date).format("YYYY-MM-DD HH:mm:ss");

const ProductRegistered = () => {
  const nav = useNavigate();
  const sellerId = sessionStorage.getItem("sellerId");
  const pnum = sessionStorage.getItem("pageNum")
  const [bitem, setBitem] = useState([]);
  const [page, setPage] = useState({
    //페이징 관련 정보 저장
    totalPage: 0,
    pageNum: 1,
  });

  // 서버로부터 등록상품 가져오는 함수
  const getBoardList = (pnum) => {
    axios
    .get("/BoardList", { params: { pageNum: pnum } })
    .then((res) => {
      const { bList, totalPage, pageNum } = res.data;
      setPage ({ totalPage: totalPage, pageNum: pageNum });
      setBitem(bList);
      sessionStorage.getItem("pageNum", pageNum);
    })
    .catch((err) => console.log(err));
  };

  //ProductRegistered 컴포넌트가 화면에 보일 때 서버로부터 등록상품 목록을 가져온다
  useEffect(() => {
    if (sellerId === null) {
      nav("/", { replace: true });
      return;
    }
    pnum !== null ? getBoardList(pnum) : getBoardList(1);
  }, []);
  //등록상품 목록 작성
  let BoardList = null;
  if (bitem.length === 0) {
    BoardList= (
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
        size= "large"
        wsize= "s-50"
        onClick= {() => {
          nav("/ProductregistrationWrite");
        }}
        >
          상품등록
        </Button>
    </div>
  );
};


export default ProductRegistered;
