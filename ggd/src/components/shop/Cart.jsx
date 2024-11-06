import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import "./scss/Main.scss";
import axios from "axios";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import CartBoard from "./CartBoard";
import Button from "./Button";
import Paging from "./Paging";

const df = (data) => moment(data).format("YYYY-MM-DD");

const Cart = () => {
  const nav = useNavigate();
  const cnid = sessionStorage.getItem("nid");
  const pnum = sessionStorage.getItem("pageName");
  const [citem, setCitem] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]); // 선택된 항목들
  const [page, setPage] = useState({
    totalPage: 0,
    pageNum: 1,
  });

  //서버로부터 장바구니 가져오는 함수
  const getCartList = (pnum) => {
    axios
      .get("/cartlist", { params: { pageNum: pnum, cnid: cnid } })
      .then((res) => {
        const { Clist, totalPage, pageNum } = res.data;
        setPage({ totalPage: totalPage, pageNum: pageNum });
        setCitem(Clist); // 장바구니 항목 업데이트
        sessionStorage.setItem("pageNum", pageNum);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (cnid === null) {
      alert("로그인이 필요합니다.");
      nav("/login", { replace: true });
      return;
    }
    pnum !== null ? getCartList(pnum) : getCartList(1);
  }, []);

  // 체크박스 선택 상태 업데이트
  const handleCheckboxChange = (cartCode) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(cartCode)) {
        // 이미 선택된 항목이면 제거
        return prevSelectedItems.filter((item) => item !== cartCode);
      } else {
        // 선택되지 않은 항목이면 추가
        return [...prevSelectedItems, cartCode];
      }
    });
  };

  // 선택된 항목 삭제
  const deleteSelectedItems = () => {
    if (selectedItems.length === 0) {
      alert("삭제할 항목을 선택해주세요.");
      return;
    }

    let conf = window.confirm("선택한 항목을 삭제할까요?");
    if (!conf) {
      return;
    }

    // 서버로 선택된 항목 삭제 요청
    axios
      .post("/deleteCart", selectedItems, {
        headers: {
          "Content-Type": "application/json", // Content-Type을 json으로 설정
        },
      })
      .then((res) => {
        if (res.data === "ok") {
          alert("선택된 항목을 삭제했습니다.");
          // 장바구니 목록을 새로 고침
          getCartList(1);
        } else {
          alert("삭제 실패");
        }
      })
      .catch((err) => {
        alert("오류가 발생했습니다.");
        console.log(err);
      });
  };

  // 출력할 장바구니 목록 작성
  let cartList = null;
  if (citem.length === 0) {
    cartList = (
      <TableRow key={0}>
        <TableColumn span={7}>장바구니 목록이 없습니다.</TableColumn>
      </TableRow>
    );
  } else {
    cartList = citem.map((item, index) => (
      <TableRow key={item.cartCode}>
        <TableColumn wd="5">
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(item.cartCode)} // 체크박스 클릭 시 상태 업데이트
            checked={selectedItems.includes(item.cartCode)} // 선택 여부에 따른 체크 상태
          />
        </TableColumn>
        <TableColumn wd="20">{item.cartCode}</TableColumn>
        <TableColumn wd="30">
          {/* 상품 정보 표시 */}
          <div onClick={() => getCart(item.productCode)}>
            {/* 신상품이 있는 경우 */}
            {item.productin ? (
              <div>
                <div>{item.productin.productName}</div>
                {/* <div>{item.productin.sellerPayment}₩</div> */}
              </div>
            ) : // 중고상품이 있는 경우
            item.usedin ? (
              <div>
                <div>{item.usedin.usedName}</div>
                {/* <div>{item.usedin.sellerPayment}₩</div> */}
              </div>
            ) : (
              "상품 정보 없음"
            )}
          </div>
        </TableColumn>
        <TableColumn wd="15">{item.quantity}</TableColumn>
        <TableColumn wd="20">
          {" "}
          {item.productin || item.usedin
            ? item.productin
              ? item.productin.sellerPayment + "₩"
              : item.usedin.usedSeller + "₩"
            : "가격 정보 없음"}
        </TableColumn>
        <TableColumn wd="20">{df(item.cartDate)}</TableColumn>
        <TableColumn wd="10">
          <Button wsize="s-40">구매</Button>
        </TableColumn>
      </TableRow>
    ));
  }
  const getCart = (cnid) => {
    nav("", { state: { dc: cnid } });
  };

  // // 장바구니 항목 삭제
  // const deleteCart = useCallback(
  //   (cartCode, index) => {
  //     let conf = window.confirm("취소 할까요?");
  //     if (!conf) {
  //       return;
  //     }

  //     axios
  //       .post("/cart/deleteCart", { cartCode })
  //       .then((res) => {
  //         if (res.status === 200) {
  //           alert("취소 성공");
  //           const newCitem = [...citem];
  //           newCitem.splice(index, 1);
  //           setCitem(newCitem);
  //         } else {
  //           alert("취소 실패");
  //         }
  //       })
  //       .catch((err) => {
  //         alert("오류가 발생했습니다.");
  //         console.log(err);
  //       });
  //   },
  //   [citem]
  // );

  return (
    <div className="Main">
      <div className="Content">
        <h1>장바구니</h1>
        <CartBoard
          cName={["선택", "번호", "상품", "수량", "가격", "등록일", "여부"]}
        >
          {cartList}
        </CartBoard>
        <Button size="large" wsize="s-50" onClick={deleteSelectedItems}>
          선택된 항목 삭제
        </Button>
        <Paging page={page} getList={getCartList} />
        <Button size="large" wsize="s-50" onClick={() => nav("/shoppingMall")}>
          홈으로
        </Button>
      </div>
    </div>
  );
};

export default Cart;
