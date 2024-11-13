import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "./Button";
import moment from "moment";

const InquiryView = () => {
  const nav = useNavigate();

  // 게시글 번호 받기
  const { state } = useLocation();
  const { bc } = state; // 게시글 번호를 꺼냈다.

  const nid = sessionStorage.getItem("nid"); // 세션에서 사용자 ID 가져오기
  const [paidOrders, setPaidOrders] = useState([]); // 결제된 상품 목록 상태
  const [inquiry, setInquiry] = useState({}); // 게시글 데이터
  const [flist, setFlist] = useState([]); // 파일 목록 데이터
  const [productDetails, setProductDetails] = useState(null); // 선택된 상품 정보

  // 서버로부터 문의 게시글 내용을 받아오기
  useEffect(() => {
    axios
      .get("/getinquiry", { params: { boardCode: bc } })
      .then((res) => {
        setInquiry(res.data); // inquiry 데이터 설정

        // 파일 목록 처리
        const bfList = res.data.boardFileTblList || [];
        if (bfList.length > 0) {
          let newFileList = bfList.map((file) => ({
            ...file,
            image: "../../update/" + file.boardFileSysname,
          }));
          setFlist(newFileList); // 파일 목록 상태 설정
        }

        // 게시글에 선택된 상품 정보가 있을 경우, 해당 상품 정보 가져오기
        const selectedProductId = res.data.selectedProductId;
        if (selectedProductId) {
          // 해당 상품 ID로 상품 정보를 가져오기
          axios
            .get("/getproduct", { params: { productId: selectedProductId } })
            .then((productRes) => {
              setProductDetails(productRes.data); // 선택된 상품 정보 상태 설정
            })
            .catch((error) => {
              console.error("상품 정보 조회 오류:", error);
            });
        }
      })
      .catch((err) => console.log(err));
  }, [bc]);

  // 결제된 상품 목록 가져오기
  useEffect(() => {
    axios
      .get("/order") // 결제된 상품만 가져오는 API 엔드포인트
      .then((res) => {
        setPaidOrders(res.data); // 결제된 상품 목록 상태에 저장
      })
      .catch((error) => {
        console.error("결제된 상품 불러오기 오류:", error);
      });
  }, []);

  // 파일 목록 출력
  const viewFlist = flist.map((v) => (
    <div className="Down" key={v.boardFileId}>
      {v.image && <img src={v.image} alt="preview-img" />}
      {v.boardFileOriname}
    </div>
  ));

  // 삭제 함수
  const deleteInquiry = () => {
    let conf = window.confirm("삭제하시겠습니까?");
    if (!conf) return;

    axios
      .post("/deleteInquiry", null, { params: { boardCode: bc } })
      .then((res) => {
        if (res.data.res === "ok") {
          alert("삭제 완료");
          nav("/mypage/inquiry");
        } else {
          alert("삭제 실패");
        }
      })
      .catch((err) => console.log(err));
  };

  // 수정 함수
  const updateInquiry = () => {
    nav("inUpdate", { state: { boardCode: bc } });
  };

  return (
    <div className="Main">
      <div className="Content">
        <h1>{inquiry.boardTitle}</h1>
        <div className="DataArea">
          <div className="Box">
            <div className="Title">NO</div>
            <div className="Data">{inquiry.boardCode}</div>
          </div>
          <div className="Box">
            <div className="Title">머리말</div>
            <div className="Data">{inquiry.boardType}</div>
          </div>

          {/* 상품 내역 출력 */}
          {productDetails ? (
            <div className="Box">
              <div className="Title">상품내역</div>
              <div className="Data">
                ({productDetails.product_where}) - {productDetails.product_name}{" "}
                - {productDetails.total_price} 원
              </div>
            </div>
          ) : (
            <div className="Box">
              <div className="Title">상품내역</div>
              <div className="Data">상품 정보가 없습니다.</div>
            </div>
          )}

          <div className="Box">
            <div className="Title">작성자</div>
            <div className="Data">{inquiry.bnid}</div>
          </div>
          <div className="Box">
            <div className="Title">전화번호</div>
            <div className="Data">{inquiry.bnphonenum}</div>
          </div>
          <div className="Box">
            <div className="Title">등록일</div>
            <div className="Data">
              {moment(inquiry.boardDate).format("YYYY-MM-DD")}
            </div>
          </div>
          <div className="Box">
            <div className="FileTitle">파일</div>
            <div className="FileData">{viewFlist}</div>
          </div>
          <div className="Cont">{inquiry.boardContent}</div>
        </div>

        <div className="Buttons">
          <Button
            wsize="s-20"
            color="gray"
            onClick={() => nav("/mypage/inquiry")}
          >
            뒤로가기
          </Button>
          {nid === inquiry.bnid && (
            <>
              <Button wsize="s-10" color="red" onClick={updateInquiry}>
                수정
              </Button>
              <Button wsize="s-10" color="red" onClick={deleteInquiry}>
                삭제
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InquiryView;
