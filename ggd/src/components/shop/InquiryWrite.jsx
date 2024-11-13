import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./scss/Main.scss";
import "./scss/Input.scss";
import "./scss/Textarea.scss";
import "./scss/FileInput.scss";

const InquiryWrite = () => {
  const nav = useNavigate();
  const nid = sessionStorage.getItem("nid"); // Fetch user id from session storage

  // 상태 초기화
  const [data, setData] = useState({
    boardType: "",
    bnid: nid,
    bnphonenum: "",
    boardTitle: "",
    boardContent: "",
    selectedProductId: "", // 결제된 상품 선택을 위한 상태 추가
  });

  const [fileName, setFileName] = useState("선택된 파일이 없습니다.");
  const [files, setFiles] = useState([]); // 파일 목록 상태 관리
  const [paidOrders, setPaidOrders] = useState([]); // 결제된 상품 목록 상태
  console.log(paidOrders);

  const { boardType, boardTitle, boardContent, bnphonenum, selectedProductId } =
    data;

  // 1:1 문의 작성 시, 데이터 변경
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  // 파일 선택 시 파일명 업데이트
  const onFileChange = useCallback((e) => {
    const selectedFiles = e.target.files;
    setFiles(selectedFiles); // 상태로 파일 목록 저장
    let fnames = ""; // 선택한 파일명 목록 업데이트

    for (let i = 0; i < selectedFiles.length; i++) {
      fnames += selectedFiles[i].name + " ";
    }

    if (fnames === "") {
      fnames = "선택된 파일이 없습니다.";
    }
    setFileName(fnames);
  }, []);

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

  // 전송 시 데이터 처리
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault(); // 페이지 변환 방지

      // 폼 데이터 생성
      const formData = new FormData();
      // 폼 데이터에 텍스트 필드 추가
      formData.append(
        "data",
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );

      // 선택된 파일을 formData에 추가
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });

      // axios로 데이터 전송
      axios
        .post("/boardWriteProc", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.data === "ok") {
            alert("작성 성공");
            nav("/mypage/inquiry"); // 성공 시 목록 페이지로 이동
          } else {
            alert("작성 실패");
          }
        })
        .catch((err) => {
          alert("전송 실패");
          console.log(err);
        });
    },
    [data, files, nav] // data, files, nav가 변경될 때마다 실행
  );

  return (
    <div className="Main">
      <form className="Content" onSubmit={onSubmit}>
        <h1>1:1 문의 작성</h1>

        {/* boardType을 select로 변경 */}
        <select
          className="Input"
          name="boardType"
          value={boardType}
          onChange={onChange}
          required
        >
          <option value="">머리말을 선택하세요</option>
          <option value="일반문의">일반문의</option>
          <option value="기술문의">기술문의</option>
          <option value="배송문의">배송문의</option>
          <option value="기타">기타</option>
        </select>

        <input
          className="Input"
          name="bnid"
          value={nid}
          placeholder="작성자"
          onChange={onChange}
          autoFocus
          required
        />
        {/* 결제된 상품 선택 */}

        <select
          className="Input"
          name="selectedProductId"
          value={selectedProductId}
          onChange={onChange}
          required
        >
          <option value="">선택하세요</option>
          {paidOrders.map((order) => (
            <option key={order.orderId} value={order.orderId}>
              ({order.product_where})-{order.product_name} - {order.total_price}{" "}
              원
            </option>
          ))}
        </select>

        <input
          className="Input"
          name="bnphonenum"
          value={bnphonenum}
          placeholder="전화번호"
          onChange={onChange}
          required
        />

        <input
          className="Input"
          name="boardTitle"
          value={boardTitle}
          placeholder="제목"
          onChange={onChange}
          required
        />

        <textarea
          className="Textarea"
          name="boardContent"
          onChange={onChange}
          placeholder="문의 게시글을 작성하세요."
          value={boardContent}
        ></textarea>

        <div className="Box">
          <input id="upload" type="file" multiple onChange={onFileChange} />
          <label className="FileLabel" htmlFor="upload">
            파일선택
          </label>
          <span className="FileSapn">{fileName}</span>
        </div>

        <div className="Buttons">
          <Button
            type="button"
            size="large"
            color="gray"
            wsize="s-30"
            outline
            onClick={() => nav("/mypage/inquiry")}
          >
            목록으로
          </Button>
          <Button type="submit" size="large" wsize="s-30">
            작성하기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InquiryWrite;
