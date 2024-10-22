import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const InquiryWrite = () => {
  const nav = useNavigate();
  const nid = sessionStorage.getItem("nid");
  const product = sessionStorage.getItem("productName");
  const phonenum = sessionStorage.getItem("nphonenum");
  const [data, setData] = useState({
    boardType: "",
    product: product,
    bnid: nid,
    nphonenum: phonenum,
    boardTitle: "",
    boardContent: "",
  });

  const { boardType, boardTitle, boardContent } = data;
  const [fileName, setFileName] = useState("선택된 파일이 없습니다.");

  //전송 데이터와 파일을 담을 멀티파트 폼 생성
  let formData = new FormData();

  const onch = useCallback(
    (e) => {
      const dataObj = {
        ...data,
        [e.target.name]: e.target.value,
      };
      setData(dataObj);
    },
    [data]
  );

  //파일 선택 시 폼데이터에 파일 목록 추가 (다중파일)
  const onFileChange = useCallback(
    (e) => {
      const files = e.target.files;
      let fnames = ""; //span에 출력할 파일명 목록

      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
        fnames += files[i].name + " ";
      }

      if (fnames === "") {
        fnames = "선택한 파일이 없습니다.";
      }
      setFileName(fnames);
    },
    [formData]
  );
  //작성한 내용(제목, 글, 파일들) 전송 함수
  const onWrite = useCallback(
    (e) => {
      e.preventDefault(); //페이지 변환을 방지하는 함수.

      //전송 시 파일 이외의 데이터를 폼데이터에 추가
      formData.append(
        "data",
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );
      axios
        .post("/boardWriteProc", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.data === "ok") {
            alert("작성 성공");
            nav("/inquiry");
          } else {
            alert("작성 실패");
          }
        })
        .catch((err) => {
          alert("전송 실패");
          console.log(err);
        });
    },
    [data]
  );

  return (
    <div className="Main">
      <form className="Content" onSubmit={onWrite}>
        <h1>1:1 문의 작성</h1>
        <input
          className="Input"
          name="boardType"
          value={boardType}
          placeholder="머리말"
          onChange={onch}
          autoFocus
          required
        />
        <input
          className="Input"
          name="bnid"
          value={nid}
          placeholder="작성자"
          onChange={onch}
          autoFocus
          required
        />
        <input
          className="Input"
          name="product"
          value={product}
          placeholder="주문내역"
          onChange={onch}
          autoFocus
        />
        <input
          className="Input"
          name="nphonenum"
          value={phonenum}
          placeholder="전화번호"
          onChange={onch}
          autoFocus
          required
        />
        <input
          className="Input"
          name="boardTitle"
          value={boardTitle}
          placeholder="제목"
          onChange={onch}
          autoFocus
          required
        />
        <textarea
          className="Textarea"
          name="boardContent"
          onChange={onch}
          placeholder="문의 게시글을 작성하세요."
          value={boardContent}
        ></textarea>
        <div className="FileInput">
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
            wsize="s-10"
            outline
            onClick={() => nav("/mypage")}
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
