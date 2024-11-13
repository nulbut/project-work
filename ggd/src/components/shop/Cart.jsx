import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
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
  const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태 관리
  console.log(citem);
  console.log(selectedItems);
  console.log(selectAll);
  // 서버로부터 장바구니 가져오는 함수
  const getCartList = (pnum) => {
    axios
      .get("/cartlist", { params: { pageNum: pnum, cnid: cnid } })
      .then((res) => {
        const { Clist, totalPage, pageNum } = res.data;
        setPage({ totalPage: totalPage, pageNum: pageNum });
        const Reloaded = sessionStorage.getItem("Reloaded");

        let reCart = Clist;
        if (Reloaded === "true") {
          reCart = Clist.map((item) => {
            return { ...item, quantity: 1 }; // 수량을 1로 설정
          });
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
    if (!sessionStorage.getItem("Reloaded")) {
      sessionStorage.setItem("Reloaded", "true");
    }
    pnum !== null ? getCartList(pnum) : getCartList(1);
  }, [cnid, pnum]);

  // 체크박스 선택 상태 업데이트
  const handleCheckboxChange = (cartCode) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = prevSelectedItems.includes(cartCode)
        ? prevSelectedItems.filter((item) => item !== cartCode)
        : [...prevSelectedItems, cartCode];

      // 전체 선택 상태 업데이트
      setSelectAll(newSelectedItems.length === citem.length);
      return newSelectedItems;
    });
  };

  // 전체 선택/해제 처리
  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedItems([]); // 전체 선택 해제
    } else {
      setSelectedItems(citem.map((item) => item.cartCode)); // 전체 선택
    }
    setSelectAll(!selectAll);
  };

  // 수량 변경 핸들러
  const handleQuantityChange = (cartCode, newQuantity) => {
    if (newQuantity < 1) {
      alert("수량은 1개 이상이어야 합니다.");
      return;
    }

    const updatedItems = citem.map((item) => {
      if (item.cartCode === cartCode) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCitem(updatedItems);

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

    axios
      .post("/deleteCart", selectedItems, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data === "ok") {
          alert("선택된 항목을 삭제했습니다.");
          getCartList(1); // 장바구니 목록을 새로 고침
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

    console.log(purchaseItems);
    nav("/widgetcheckout", { state: { datas: selectedCartItems } });
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
      const totalPrice = price * item.quantity;
      return (
        <TableRow key={item.cartCode}>
          <TableColumn wd="w-5">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(item.cartCode)} // 체크박스 클릭 시 상태 업데이트
              checked={selectedItems.includes(item.cartCode)} // 선택 여부에 따른 체크 상태
            />
          </TableColumn>
          <TableColumn wd="w-10">
            {item.productin ? (
              <div>신상품</div>
            ) : item.usedin ? (
              <div>중고상품</div>
            ) : (
              ""
            )}
          </TableColumn>
          <TableColumn wd="w-25">
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
          <TableColumn wd="w-10">
            <input
              type="number"
              value={item.quantity}
              min="1"
              onChange={(e) =>
                handleQuantityChange(item.cartCode, parseInt(e.target.value))
              }
            />
          </TableColumn>
          <TableColumn wd="w-20">{totalPrice}₩</TableColumn>
          <TableColumn wd="w-20">{df(item.cartDate)}</TableColumn>
          <TableColumn wd="w-10">
            <Button wsize="s-40" onClick={handlePurchase}>
              구매
            </Button>
          </TableColumn>
        </TableRow>
      );
    });
  }

  const getCart = (cnid) => {
    // nav("", { state: { dc: cnid } });
  };

  return (
    <div className="Main">
      <div className="Content">
        <h1>장바구니</h1>
        <CartBoard
          cName={[
            <input
              type="checkbox"
              onChange={handleSelectAllChange}
              checked={selectAll} // 전체 선택 여부
            />,
            "구분",
            "상품",
            "수량",
            "가격",
            "등록일",
            "여부",
          ]}
        >
          {cartList}
        </CartBoard>
        <Button size="large" wsize="s-30" onClick={deleteSelectedItems}>
          선택된 항목 삭제
        </Button>
        <Button size="large" wsize="s-30" onClick={resetCartQuantity}>
          수량 초기화
        </Button>
        <Button wsize="s-40" onClick={handlePurchase}>
          일괄구매
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
