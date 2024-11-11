import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "./Button";
import moment from "moment";

const InquiryView = () => {
  const nav = useNavigate();

  // 게시글 번호 받기
  const { state } = useLocation();
  const { bc } = state; // 게시글 번호를 꺼냈다.
  // sessionStorage에서 productCode, usedCode 가져오기
  const productCode = sessionStorage.getItem("productCode");
  console.log(productCode);
  const usedCode = sessionStorage.getItem("usedCode");
  console.log(usedCode);
  const nid = sessionStorage.getItem("nid");
  console.log(nid);
  const [inquiry, setInquiry] = useState({}); // 게시글 데이터
  console.log(inquiry);
  const [flist, setFlist] = useState([
    // 파일 목록 데이터
    {
      boardFileId: 0,
      boardFileNum: 0,
      boardFileSysname: "",
      boardFileOriname: "Nothing",
      image: "",
    },
  ]);

  // 상품과 중고 상품 이름을 위한 상태
  const [productName, setProductName] = useState(""); // 상품명
  console.log(productName);
  const [usedName, setUsedName] = useState(""); // 중고 상품명
  console.log(usedName);

  // 서버로부터 문의 게시글 내용을 받아오기
  useEffect(() => {
    axios
      .get("/getinquiry", { params: { boardCode: bc } })
      .then((res) => {
        setInquiry(res.data); // inquiry 데이터 설정

        const bfList = res.data.boardFileTblList; // 파일 목록 처리
        if (bfList.length > 0) {
          let newFileList = [];
          for (let i = 0; i < bfList.length; i++) {
            const newFile = {
              ...bfList[i],
              image: "../../update/" + bfList[i].boardFileSysname,
            };
            newFileList.push(newFile);
          }
          setFlist(newFileList); // 파일 목록 상태 설정
        }

        // productCode와 usedCode를 사용해 상품 이름 및 중고 상품 이름 가져오기
        const { selectedProduct, selectedUsedProduct } = res.data;
        if (selectedProduct) {
          axios
            .get(`/getProductName/${selectedProduct}`) // 상품 정보를 조회하는 API 호출
            .then((response) => {
              setProductName(response.data.productName);
              console.log(response.data.productName);
            })
            .catch((err) => console.error("상품 정보 가져오기 실패", err));
        }

        if (selectedUsedProduct) {
          axios
            .get(`/getUsedProductName/${selectedUsedProduct}`) // 중고 상품 정보를 조회하는 API 호출
            .then((response) => {
              setUsedName(response.data.usedName);
              console.log(setUsedName);
            })
            .catch((err) => console.error("중고 상품 정보 가져오기 실패", err));
        }
      })
      .catch((err) => console.log(err));
  }, [bc]);

  // 파일 목록 출력
  const viewFlist = flist.map((v) => {
    return (
      <div className="Down" key={v.boardFileId}>
        {v.image && <img src={v.image} alt="preview-img" />}
        {v.boardFileOriname}
      </div>
    );
  });

  // 삭제 함수
  const deleteInquiry = useCallback(() => {
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
  }, [bc, nav]);

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

          <div className="Box">
            <div className="Title">상품명 / 중고 상품명</div>
            <div className="Data">
              {productCode
                ? productName
                : usedCode
                ? usedName
                : "상품 또는 중고 상품 정보 없음"}
            </div>
          </div>

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
            wsize="s-10"
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
