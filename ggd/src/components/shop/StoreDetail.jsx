import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./scss/ProductDetails.scss";
import UproductReview from "./UproductReview";

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState("content");
  const location = useLocation();
  const navigate = useNavigate();
  const [newProductData, setNewProductData] = useState(null); // 신상품 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태를 관리
  const [error, setError] = useState(null); // 에러 상태를 관리
  const nid = sessionStorage.getItem("nid");

  //전체 이미지 불러오기
  const [filst, setFilst] = useState([
    {
      bpprice: "",
      bprobid: "",
      bpprestriction: "",
      bpwarestock: "",
      bpexplanation: "",
      bpdate: "",
      bpsize: "",
      bpmaterial: "",
      bproductfilecode: "",
      bproductfilesysname: "",
      bproductfileoriname: "Nothing",
      image: "",
    },
  ]);

  // location.state에서 전달된 값들
  const { code } = location.state || {}; // type은 더 이상 사용하지 않음

  // 신상품 코드
  const productCode = code;
  console.log(location.state);
  console.log(newProductData);
  const usedCode = code || null; // `usedCode`가 존재하지 않으면 `null`
  const uProduct = productCode;
  // !== null ? "신상품" : "중고 상품"; - 중고상품 후기 빠짐, 신상품 후기만 작성 가능
  const reviewCode = productCode !== null ? productCode : usedCode;

  //후기 목록
  const [reviewList, setReviewList] = useState(null);

  //후기 목록 가져오는 함수
  const getReviewList = async () => {
    console.log("getReviewList()");

    await axios
      .get("/getreview", { params: { productCode } })
      .then((res) => {
        console.log(res);
        setReviewList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productCode) {
        setError("상품 코드가 없습니다.");
        setLoading(false);
        return;
      }

      setLoading(true); // 로딩 시작
      setError(null); // 에러 초기화

      try {
        // 신상품 데이터 요청
        const productResponse = await axios.get("/getBproduct", {
          params: { bpnum: productCode },
        });

        // 신상품 데이터를 상태에 저장
        setNewProductData(productResponse.data);
        getReviewList(); //후기 목록 불러오기 함수 실행

        // 이미지 파일 리스트
        const pfileList = productResponse.data.bproductFileTblList;
        console.log(pfileList);

        // 파일 목록 처리
        if (pfileList.length > 0) {
          console.log("pfileList.length :", pfileList.length);
          let newPFileList = [];
          for (let i = 0; i < pfileList.length; i++) {
            const newfiles = {
              ...pfileList[i],
              image: "productupload/" + pfileList[i].bproductfilesysname,
            };
            newPFileList.push(newfiles); //배열 추가
          }
          console.log(newPFileList);
          setFilst(newPFileList);
        }
      } catch (error) {
        console.error("데이터 로딩 실패", error);
        setError("상품 정보를 불러오는 데 실패했습니다."); // 에러 메시지 설정
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchProductDetails();
  }, [productCode]);

  // 로딩 중일 때
  if (loading) {
    return <div>상품 정보를 불러오는 중입니다...</div>;
  }

  // 에러가 발생했을 때
  if (error) {
    return <div>{error}</div>;
  }

  // 신상품 데이터가 없을 경우
  if (!newProductData) {
    return <div>상품 정보를 찾을 수 없습니다.</div>;
  }

  const handlePurchase = () => {
    alert("구매 페이지로 이동합니다.");
    navigate("/widgetcheckout", { state: { data: newProductData } });
  };

  const handleAddToCart = () => {
    alert("장바구니에 추가되었습니다.");
    // 장바구니 추가 구현
  };

  const handleReport = () => {
    alert("신고 페이지로 이동합니다.");
    navigate("/report");
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab); // 클릭한 탭을 활성화
  };

  //후기 목록 작성
  const rvList =
    reviewList !== null ? (
      reviewList.map((r, i) => {
        return (
          <div key={i}>
            {r.unum} : {r.upreivew}
          </div>
        );
      })
    ) : (
      <div>후기가 없습니다.</div>
    );

  console.log(rvList);

  //전체이미지 불러오기
  const imgsview = filst.map((v) => {
    return (
      <div>
        {v.image && (
          <img className="tab-content-imags" src={v.image} alt="preview-img" />
        )}
      </div>
    );
  });

  return (
    <div className="product-detail">
      <h2 className="product-detail-title">{newProductData?.productName}</h2>

      <div className="product-detail-content">
        <div className="product-detail-image">
          {newProductData?.bproductFileTblList ? (
            <img
              src={`productupload/${newProductData.bproductFileTblList[0].bproductfilesysname}`}
              alt={`상품 이미지 ${newProductData.productName}`}
              className="product-image"
            />
          ) : (
            <div>이미지를 불러올 수 없습니다.</div>
          )}
        </div>

        <div className="product-detail-info">
          <div>
            <p>
              <strong>상품명 : </strong>
              {newProductData?.bpname}
            </p>
            <p>
              <strong>가격 : </strong>
              {newProductData?.bpprice} <strong>원</strong>
            </p>
            <p>
              <strong>판매자 : </strong>
              {newProductData?.bsellerId}
            </p>
            <p>
              <strong>상세 설명 : </strong>
              {newProductData?.bpexplanation}
            </p>
          </div>

          <div className="product-detail-actions">
            <button className="purchase-button" onClick={handlePurchase}>
              구매하기
            </button>
            <button className="cart-button" onClick={handleAddToCart}>
              장바구니
            </button>
            <button className="report-button" onClick={handleReport}>
              신고하기
            </button>
          </div>
        </div>
      </div>

      {/* 탭 관련 내용 */}
      <div className="product-detail-tabs">
        <div className="tab-header">
          <div
            className={`tab-item ${activeTab === "content" ? "active" : ""}`}
            onClick={() => handleTabClick("content")}
          >
            내용
          </div>
          <div
            className={`tab-item ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => handleTabClick("reviews")}
          >
            후기
          </div>
          <div
            className={`tab-item ${activeTab === "questions" ? "active" : ""}`}
            onClick={() => handleTabClick("questions")}
          >
            문의사항
          </div>
          <div
            className={`tab-item ${
              activeTab === "specifications" ? "active" : ""
            }`}
            onClick={() => handleTabClick("specifications")}
          >
            제품규격
          </div>
        </div>

        <div className="tab-content">
          <div
            className={`tab-pane ${activeTab === "content" ? "active" : ""}`}
          >
            {imgsview}
            <p>{newProductData?.bpexplanation}</p>
          </div>
          <div
            className={`tab-pane ${activeTab === "reviews" ? "active" : ""}`}
          >
            <div className="Reviews">
              {/* 후기 작성하는 부분 */}
              {nid !== null ? (
                <div className="ReviewWirte">
                  <UproductReview
                    reviewCode={reviewCode}
                    nid={nid}
                    uProduct={uProduct}
                    getReviewList={getReviewList}
                  />
                </div>
              ) : (
                <></>
              )}
              {/* 후기 목록 보이는 부분 */}
              <div className="ReviewList">{rvList}</div>
            </div>
          </div>
          <div
            className={`tab-pane ${activeTab === "questions" ? "active" : ""}`}
          >
            <p>문의사항 내용이 여기 들어갑니다.</p>
          </div>
          <div
            className={`tab-pane ${
              activeTab === "specifications" ? "active" : ""
            }`}
          >
            {/* <p>제품 규격 내용이 여기 들어갑니다.</p> */}
            <p>사이즈</p>
            <div>{newProductData.bpsize}</div>
            <p>재질</p>
            <div>{newProductData.bpmaterial}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;