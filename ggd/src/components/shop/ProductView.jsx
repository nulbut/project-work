import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";

const df = (date) => moment(date).format("YYYY-MM-DD");

const ProductView = () => {
  const nav = useNavigate();

  //상품 번호 받기
  const { state } = useLocation();
  const { pc } = state;
  const sellerId = sessionStorage.getItem("nid");
  const [ProductRegistered, setProductRegistered] = useState({});
  const [flist, setFlist] = useState([
    {
      productFileCode: "",
      productName: "",
      productFileSysname: "",
      productFileOriname: "Nothing",
      image: "",
    },
  ]);

  //서버로부터 상품 내용 받아오기
  useEffect(() => {
    axios
      .get("/getproduct", { params: { productCode: pc } })
      .then((res) => {
        setProductRegistered(res.data);
        console.log(res.data);

        const bfList = res.data.productFileList;
        console.log(bfList);

        //파일 목록 처리 (res.data에서 파일목록을 꺼내서 flist로 처리)
        if (bfList.length > 0) {
          console.log("bfList.length : ", bfList.length);
          let newFileList = [];
          for (let i = 0; i < bfList.length; i++) {
            const newFile = {
              ...bfList[i],
              image: "../../upload/" + bfList[i].productFileSysname,
            };
            newFileList.push(newFile); // 배열에 추가
          }
          console.log(newFileList);
          setFlist(newFileList);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const viewFList = flist.map((v) => {
    return (
      <div className="Down">
        {v.image && <img src={v.image} alt="preview-img" />}
        {v.productFileOriname}
      </div>
    );
  });

  //boardDelete
  const deleteProduct = useCallback(() => {
    let conf = window.confirm("삭제하시겠습니까?");
    if (!conf) {
      //취소 버튼이 눌리면 삭제 종료
      return;
    }

    axios
      .post("/boardDelete", null, { params: { productCode: pc } })
      .then((res) => {
        if (res.data.res === "ok") {
          alert("삭제완료");
          nav("/mypage/ProductRegistered");
        } else {
          alert("삭제 실패");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const updateProduct = () => {
    nav("pdUpdate", { state: { productCode: pc } });
  };
  return (
    <div className="Main">
      <div className="Content">
        <h1>{ProductRegistered.productName}</h1>
        <div className="DataArea">
          <div className="Box">
            <div className="Title">번호</div>
            <div className="Data">{ProductRegistered.productCode}</div>
          </div>
          <div className="Box">
            <div className="Title">종류</div>
            <div className="Data">{ProductRegistered.categoryCode}</div>
          </div>
          <div className="Box">
            <div className="Title">판매자</div>
            <div className="Data">{ProductRegistered.sellerId}</div>
          </div>
          <div className="Box">
            <div className="Title">판매가격</div>
            <div className="Data">{ProductRegistered.sellerPayment}</div>
          </div>
          <div className="Box">
            <div className="Title">구매제한</div>
            <div className="Data">{ProductRegistered.productLimit}</div>
          </div>
          <div className="Box">
            <div className="Title">수량</div>
            <div className="Data">{ProductRegistered.productStock}</div>
          </div>
          <div className="Box">
            <div className="Title">등록일</div>
            <div className="Data">{df(ProductRegistered.productDate)}</div>
          </div>
          <div className="Box">
            <div className="FileTitle">파일</div>
            <div className="FileData">{viewFList}</div>
          </div>
          <div className="Cont">{ProductRegistered.productDetail}</div>
        </div>
        <div className="Buttons">
          <Button
            wsize="s-10"
            color="gray"
            onClick={() => nav("/mypage/productRegistered")}
          >
            뒤로가기
          </Button>
          {sellerId === ProductRegistered.sellerId ? (
            <>
              <Button wsize="s-10" color="red" onClick={updateProduct}>
                수정
              </Button>
              <Button wsize="s-10" color="red" onClick={deleteProduct}>
                삭제
              </Button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
