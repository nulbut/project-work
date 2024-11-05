import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "./scss/Main.scss";
import axios from "axios";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import DibsBoard from "./DibsBoard";
import Button from "./Button";
import Paging from "./Paging";

const df = (data) => moment(data).format("YYYY-MM-DD");

const Dibs = () => {
  const nav = useNavigate();
  const dnid = sessionStorage.getItem("nid");
  const pnum = sessionStorage.getItem("pageNum");
  const [selectedItems, setSelectedItems] = useState([]); // 선택된 항목들
  const [ditem, setDitem] = useState({});
  console.log(ditem);
  const [page, setPage] = useState({
    //페이징 관련 정보 저장 state
    totalPage: 0,
    pageNum: 1,
  });

  //서버로부터 찜목록 가져오는 함수
  const getDibsList = (pnum) => {
    axios
      .get("/dibslist", { params: { pageNum: pnum, dnid: dnid } })
      .then((res) => {
        const { Dlist, totalPage, pageNum, dnid } = res.data;
        console.log(totalPage);
        setPage({ totalPage: totalPage, pageNum: pageNum });
        console.log(page);
        setDitem(Dlist);
        console.log(Dlist);
        sessionStorage.getItem("pageNum", pageNum);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(dnid);
    if (dnid === null) {
      alert("로그인이 필요합니다.");
      nav("/login", { replace: true });
      return;
    }
    pnum !== null ? getDibsList(pnum) : getDibsList(1);
  }, []);

  //체크박스 선택 상태 업데이트
  const handleCheckboxChange = (dibsCode) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(dibsCode)) {
        //이미 선택된 항목이면 제거
        return prevSelectedItems.filter((item) => item !== dibsCode);
      } else {
        return [...prevSelectedItems, dibsCode];
      }
    });
  };

  // 선택된 항목 삭제
  const deleteSelectedItems = () => {
    if (selectedItems.length == 0) {
      alert("삭제할 항목을 선택해주세요.");
      return;
    }
    let conf = window.confirm("선택한 항목을 삭제할까요?");
    if (!conf) {
      return;
    }

    //서버로 선택된 항목 삭제 요청
    axios
      .post("/delereDids", selectedItems, {
        headers: {
          "Content-Type": "application/json", // Content-Type을 json으로 설정
        },
      })
      .then((res) => {
        if (res.data === "ok") {
          alert("선택된 항목을 삭제했습니다.");
          // 찜 목록을 새로 고침
          getDibsList(1);
        } else {
          alert("삭제 실패");
        }
      })
      .catch((err) => {
        alert("오류가 발생했습니다.");
        console.log(err);
      });
  };

  //출력할 찜목록 작성
  let dibsList = null;
  if (ditem.length === 0) {
    dibsList = (
      <TableRow key={0}>
        <TableColumn span={5}>찜 목록이 없습니다.</TableColumn>
      </TableRow>
    );
  } else {
    dibsList = Object.values(ditem).map((item) => (
      <TableRow key={item.dibsCode}>
        <TableColumn wd="5">
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(item.dibsCode)} //체크박스 클릭 시 상태 업데이트
            checked={selectedItems.includes(item.dibsCode)} // 선택 여부에 따른 체크 상태
          />
        </TableColumn>
        <TableColumn wd="10">{item.dibsCode}</TableColumn>
        <TableColumn wd="40">
          <div onClick={() => getDibs(item.productCode)}>
            {/* <img
              src={`../upload/${item.productinfo?.productFileList[0]?.productFileSysname}`}
            /> */}
            {item.productinfo.productName}
          </div>
        </TableColumn>
        <TableColumn wd="30">{item.productinfo.sellerPayment}₩</TableColumn>
        <TableColumn wd="20">{df(item.dibsDate)}</TableColumn>
      </TableRow>
    ));
  }
  const getDibs = (dnid) => {
    nav("", { state: { dc: dnid } });
  };
  return (
    <div className="Main">
      <div className="Content">
        <h1>찜목록</h1>
        <DibsBoard dName={["번호", "상품", "가격", "등록일", "여부"]}>
          {dibsList}
        </DibsBoard>
        <Button size="large" wsize="s-50" onClick={deleteSelectedItems}>
          선택된 항목 삭제
        </Button>
        <Paging page={page} getList={getDibsList} />
        <Button size="large" wsize="s-50" onClick={() => nav("/shoppingMall")}>
          홈으로
        </Button>
      </div>
    </div>
  );
};

export default Dibs;
