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

  // 서버로부터 장바구니 가져오는 함수
  const getCartList = (pnum) => {
    axios
      .get("/cartlist", { params: { pageNum: pnum, cnid: cnid } })
      .then((res) => {
        const { Clist, totalPage, pageNum } = res.data;
        setPage({ totalPage: totalPage, pageNum: pageNum });
        // 세션 저장소에 새로고침 여부를 체크
        const Reloaded = sessionStorage.getItem("Reloaded");

        // 새로고침 시에만 수량을 1로 초기화
        let reCart = Clist;
        if (Reloaded === "true") {
          reCart = Clist.map((item) => {
            return { ...item, quantity: 1 }; // 수량을 1로 설정
          });
          // 새로고침 여부 초기화 (세션에서 값을 삭제)
          sessionStorage.removeItem("Reloaded");
        }

        setCitem(reCart); // 장바구니 항목 업데이트
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
    // 새로고침 여부 체크
    if (!sessionStorage.getItem("Reloaded")) {
      // 처음 로드되었을 때, 세션에 "isPageReloaded" 상태 저장
      sessionStorage.setItem("Reloaded", "true");
    }
    pnum !== null ? getCartList(pnum) : getCartList(1);
  }, [cnid, pnum]);

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

  // 수량 변경 핸들러
  const handleQuantityChange = (cartCode, newQuantity) => {
    if (newQuantity < 1) {
      alert("수량은 1개 이상이어야 합니다.");
      return;
    }

    // 장바구니 항목의 수량을 업데이트
    const updatedItems = citem.map((item) => {
      if (item.cartCode === cartCode) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCitem(updatedItems);

    // 서버에 변경된 수량 전송
    axios
      .post("/updateCart", { cartCode, quantity: newQuantity })
      .then((res) => {
        if (res.data === "ok") {
          getCartList(page.pageNum); // 목록 새로 고침
        } else {
          alert("수량 변경 실패");
        }
      })
      .catch((err) => {
        alert("오류가 발생했습니다.");
        console.log(err);
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

  // 구입 페이지로 이동
  const handlePurchase = () => {
    if (selectedItems.length === 0) {
      alert("구매할 항목을 선택해주세요.");
      return;
    }

    const selectedCartItems = citem.filter((item) =>
      selectedItems.includes(item.cartCode)
    );

    const purchaseItems = selectedCartItems.map((item) => ({
      cartCode: item.cartCode,
      productName: item.productin
        ? item.productin.productName
        : item.usedin
        ? item.usedin.usedName
        : "상품 없음",
      quantity: item.quantity,
      price: item.productin
        ? item.productin.sellerPayment
        : item.usedin
        ? item.usedin.usedSeller
        : 0,
      totalPrice:
        (item.productin
          ? item.productin.sellerPayment
          : item.usedin
          ? item.usedin.usedSeller
          : 0) * item.quantity,
    }));

    nav("/widgetcheckout", { state: { purchaseItems } });
  };

  // 수량 초기화 요청 함수
  const resetCartQuantity = () => {
    axios
      .post("/resetCartQuantity", { cnid })
      .then((res) => {
        if (res.data === "ok") {
          alert("장바구니 수량이 초기화되었습니다.");
          getCartList(page.pageNum); // 목록 새로 고침
        } else {
          alert("수량 초기화 실패");
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
    cartList = citem.map((item, index) => {
      const price = item.productin
        ? item.productin.sellerPayment
        : item.usedin
        ? item.usedin.usedSeller
        : 0;
      const totalPrice = price * item.quantity; // 수량에 따른 총 가격 계산
      return (
        <TableRow key={item.cartCode}>
          <TableColumn wd="5">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(item.cartCode)} // 체크박스 클릭 시 상태 업데이트
              checked={selectedItems.includes(item.cartCode)} // 선택 여부에 따른 체크 상태
            />
          </TableColumn>
          <TableColumn wd="20">
            {item.productin ? (
              <div>신상품</div>
            ) : item.usedin ? (
              <div>중고상품</div>
            ) : (
              ""
            )}
          </TableColumn>
          <TableColumn wd="30">
            <div onClick={() => getCart(item.productCode)}>
              {item.productin ? (
                <div>{item.productin.productName}</div>
              ) : item.usedin ? (
                <div>{item.usedin.usedName}</div>
              ) : (
                "상품 정보 없음"
              )}
            </div>
          </TableColumn>
          <TableColumn wd="5">
            <input
              type="number"
              value={item.quantity}
              min="1"
              onChange={(e) =>
                handleQuantityChange(item.cartCode, parseInt(e.target.value))
              }
            />
          </TableColumn>
          <TableColumn wd="20">{totalPrice}₩</TableColumn>
          <TableColumn wd="20">{df(item.cartDate)}</TableColumn>
          <TableColumn wd="10">
            <Button wsize="s-40" onClick={handlePurchase}>
              구매
            </Button>
          </TableColumn>
        </TableRow>
      );
    });
  }

  const getCart = (cnid) => {
    nav("", { state: { dc: cnid } });
  };

  return (
    <div className="Main">
      <div className="Content">
        <h1>장바구니</h1>
        <CartBoard
          cName={["선택", "구분", "상품", "수량", "가격", "등록일", "여부"]}
        >
          {cartList}
        </CartBoard>
        <Button size="large" wsize="s-30" onClick={deleteSelectedItems}>
          선택된 항목 삭제
        </Button>
        <dr />
        <Button size="large" wsize="s-30" onClick={resetCartQuantity}>
          수량 초기화
        </Button>
        <Paging page={page} getList={getCartList} />
        <button className="Buttons" onClick={() => nav("/shoppingMall")}>
          홈으로
        </button>
      </div>
    </div>
  );
};

export default Cart;
