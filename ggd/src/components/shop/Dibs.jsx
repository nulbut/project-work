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
  const getDibsList = useCallback(
    (pnum) => {
      axios
        .get("/dibslist", { params: { pageNum: pnum, dnid: dnid } })
        .then((res) => {
          const { Dlist, totalPage, pageNum } = res.data;
          setPage({ totalPage: totalPage, pageNum: pageNum });
          setDitem(Dlist);
          sessionStorage.setItem("pageNum", pageNum); // sessionStorage에 pageNum 저장
        })
        .catch((err) => console.log(err));
    },
    [dnid]
  );

  useEffect(() => {
    if (!dnid) {
      alert("로그인이 필요합니다.");
      nav("/login", { replace: true });
      return;
    }
    getDibsList(pnum);
  }, [dnid, pnum, nav, getDibsList]);

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

  // 장바구니에 상품을 추가하는 공통 함수
  const addToCart = (nid, type, code, quantity, bpnum) => {
    const url = type === "used" ? "/setusedcart" : "/setStorecart"; // type에 따라 URL 설정
    const params =
      type === "used"
        ? { cnid: nid, usedCode: code, quantity, bpnum }
        : { cnid: nid, bpnum, quantity };

    axios
      .get(url, { params })
      .then((res) => {
        if (res.data === "ok") {
          alert(
            `${
              type === "used" ? "중고상품" : "입점상품"
            }이 장바구니에 추가되었습니다.`
          );
        } else {
          alert("이미 장바구니에 있습니다.");
        }
      })
      .catch((err) => {
        alert("오류가 발생했습니다.");
        console.log(err);
      });
  };

  // 장바구니에 상품을 추가하는 함수 (단순화된 버전)
  const cartList = (ud, quantity, bp, type) => {
    const nid = sessionStorage.getItem("nid");
    let conf = window.confirm("장바구니에 추가할까요?");
    if (!conf) return;

    addToCart(nid, type, ud, quantity, bp);
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
    dibsList = ditem.map((item) => {
      const isSoreProduct = item.bproductinfo;
      const isUsedProduct = item.usedinfo;
      const productName = isSoreProduct
        ? item.bproductinfo.bpname
        : isUsedProduct
        ? item.usedinfo.usedName
        : "상품 정보 없음";
      const productPrice = isSoreProduct
        ? item.bproductinfo.bpprice + "₩"
        : isUsedProduct
        ? item.usedinfo.usedSeller + "₩"
        : "가격 정보 없음";

      return (
        <TableRow key={item.dibsCode}>
          <TableColumn wd="5">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(item.dibsCode)}
              checked={selectedItems.includes(item.dibsCode)}
            />
          </TableColumn>
          <TableColumn wd="10">
            {isSoreProduct ? "입점상품" : isUsedProduct ? "중고상품" : ""}
          </TableColumn>
          <TableColumn wd="w-25" onClick={() => getDibs(item.bpnum)}>
            <div>{productName}</div>
          </TableColumn>
          <TableColumn wd="w-20">{productPrice}</TableColumn>
          <TableColumn wd="w-10">{df(item.dibsDate)}</TableColumn>
          <TableColumn wd="w-20">
            <Button
              wsize="s-50"
              onClick={() => {
                const quantity = 1; // 기본 수량 1개
                if (isSoreProduct) {
                  cartList(null, quantity, item.bpnum, "new");
                } else if (isUsedProduct) {
                  cartList(
                    item.usedinfo.usedCode,
                    quantity,
                    item.bpnum,
                    "used"
                  );
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
      );
    });
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
