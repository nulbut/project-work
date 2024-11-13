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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";

const df = (data) => moment(data).format("YYYY-MM-DD");

const Dibs = () => {
  const nav = useNavigate();
  const dnid = sessionStorage.getItem("nid");
  const pnum = sessionStorage.getItem("pageNum") || 1; // pageNum 기본값 설정
  const [selectedItems, setSelectedItems] = useState([]); // 선택된 항목들
  const [ditem, setDitem] = useState([]);
  const [page, setPage] = useState({
    totalPage: 0,
    pageNum: pnum,
  });

  const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태 관리

  // 서버로부터 찜목록 가져오는 함수
  const getDibsList = (pnum) => {
    axios
      .get("/dibslist", { params: { pageNum: pnum, dnid: dnid } })
      .then((res) => {
        const { Dlist, totalPage, pageNum, dnid } = res.data;
        setPage({ totalPage: totalPage, pageNum: pageNum });
        setDitem(Dlist);
        sessionStorage.setItem("pageNum", pageNum); // sessionStorage에 pageNum 저장
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (dnid === null) {
      alert("로그인이 필요합니다.");
      nav("/login", { replace: true });
      return;
    }
    getDibsList(pnum);
  }, [dnid, pnum, nav]);

  // 체크박스 선택 상태 업데이트
  const handleCheckboxChange = (dibsCode) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = prevSelectedItems.includes(dibsCode)
        ? prevSelectedItems.filter((item) => item !== dibsCode)
        : [...prevSelectedItems, dibsCode];

      // 전체 선택 상태 업데이트
      setSelectAll(newSelectedItems.length === ditem.length);
      return newSelectedItems;
    });
  };

  // 전체 선택/해제 처리
  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedItems([]); // 전체 선택 해제
    } else {
      setSelectedItems(ditem.map((item) => item.dibsCode)); // 전체 선택
    }
    setSelectAll(!selectAll);
  };

  // 선택된 항목 삭제
  const deleteSelectedItems = () => {
    if (selectedItems.length === 0) {
      alert("삭제할 항목을 선택해주세요.");
      return;
    }
    let conf = window.confirm("선택한 항목을 삭제할까요?");
    if (!conf) return;

    axios
      .post("/deleteDibs", selectedItems, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data === "ok") {
          alert("선택된 항목을 삭제했습니다.");
          getDibsList(1); // 찜 목록을 새로 고침
        } else {
          alert("삭제 실패");
        }
      })
      .catch((err) => {
        alert("오류가 발생했습니다.");
        console.log(err);
      });
  };

  // 장바구니에 상품을 추가하는 함수
  const cartList = (ud, quantity, bp) => {
    console.log(ud);
    console.log(bp);
    const nid = sessionStorage.getItem("nid");
    let conf = window.confirm("장바구니에 추가할까요?");
    if (!conf) {
      return;
    }

    axios
      .get("/setusedcart", {
        params: { cnid: nid, usedCode: ud, quantity, bpnum: bp, quantity },
      })
      .then((res) => {
        console.log(res);
        if (res.data === "ok") {
          alert("추가되었습니다.");
        } else {
          alert("이미 장바구니에 있습니다.");
        }
      })
      .catch((err) => {
        alert("돌아가");
        console.log(err);
      });
  };

  // 출력할 찜목록 작성
  let dibsList = null;
  if (ditem.length === 0) {
    dibsList = (
      <TableRow key={0}>
        <TableColumn span={5}>찜 목록이 없습니다.</TableColumn>
      </TableRow>
    );
  } else {
    dibsList = ditem.map((item) => (
      <TableRow key={item.dibsCode}>
        <TableColumn wd="5">
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(item.dibsCode)} // 체크박스 클릭 시 상태 업데이트
            checked={selectedItems.includes(item.dibsCode)} // 선택 여부에 따른 체크 상태
          />
        </TableColumn>
        <TableColumn wd="10">
          {item.bproductinfo ? (
            <div>신상품</div>
          ) : item.usedinfo ? (
            <div>중고상품</div>
          ) : (
            ""
          )}
        </TableColumn>
        <TableColumn wd="w-25">
          <div onClick={() => getDibs(item.bpnum)}>
            {/* 신상품이 있는 경우 */}
            {item.bproductinfo ? (
              <div>
                <div>{item.bproductinfo.bpname}</div>
              </div>
            ) : // 중고상품이 있는 경우
            item.usedinfo ? (
              <div>
                <div>{item.usedinfo.usedName}</div>
              </div>
            ) : (
              "상품 정보 없음"
            )}
          </div>
        </TableColumn>
        <TableColumn wd="w-20">
          {item.bproductinfo || item.usedinfo
            ? item.bproductinfo
              ? item.bproductinfo.bpprice + "₩"
              : item.usedinfo.usedSeller + "₩"
            : "가격 정보 없음"}
        </TableColumn>
        <TableColumn wd="w-10">{df(item.dibsDate)}</TableColumn>
        <TableColumn wd="w-20">
          <Button
            wsize="s-50"
            onClick={() => {
              const quantity = 1; // 예시로 1개를 기본 수량으로 설정
              if (item.bproductinfo) {
                // 신상품일 경우
                cartList(null, quantity, item.bpnum, "new");
              } else if (item.usedinfo) {
                // 중고상품일 경우
                cartList(item.usedinfo.usedCode, quantity, item.bpnum, "used");
              }
            }}
          >
            <FontAwesomeIcon
              icon={faBagShopping}
              style={{ color: "#000000", fontSize: "1.5em" }}
            />
          </Button>
        </TableColumn>
      </TableRow>
    ));
  }

  const getDibs = (usedCode) => {
    nav("/pddetails", { state: { usedCode: usedCode } }); // 상품 상세 페이지로 이동
  };

  return (
    <div className="Main">
      <div className="Content">
        <h1>찜목록</h1>
        <DibsBoard
          dName={[
            <input
              type="checkbox"
              onChange={handleSelectAllChange}
              checked={selectAll} // 전체 선택 여부
            />,
            "구분",
            "상품",
            "가격",
            "등록일",
          ]}
        >
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
