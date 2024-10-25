import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";

const InquiryUpdate = () => {
  const nav = useNavigate();

  const { state } = useLocation();
  const { boardCode } = state;

  const productName = sessionStorage.getItem("productName");
  const nphonenum = sessionStorage.getItem("nphonenum");
  const nid = sessionStorage.getItem("nid");

  const [data, setData] = useState({
    boardCode: boardCode,
    boardType: "",
    productName: productName,
    // nphonenum: nphonenum,
    boardTitle: "",
    boardContent: "",
  });

  const [flist, setFlist] = useState([
    {
      boardFileId: 0,
      boardFileNum: 0,
      boardFileSysname: "",
      boardFileOriname: "Nothing",
      image: "",
    },
  ]);

  const { boardType, boardTitle, boardContent } = data;
  //서버로부터 게시글 내용을 받아오기
  useEffect(() => {
    axios
      .get("/getinquiry", { params: { boardCode: boardCode } })
      .then((res) => {
        setData(res.data);

        const bfList = res.data.boardFileTblList;
        console.log(bfList);

        //파일 목록 처리(res.date에서 파일 목록을 꺼내서 flist로 처리)
        if (bfList.length > 0) {
          console.log("bfList.length : ", bfList.length);
          let newFileList = [];
          for (let i = 0; i < bfList.length; i++) {
            const newFile = {
              ...bfList[i],
              image: "../../update/" + bfList[i].boardFileSysname,
            };
            newFileList.push(newFile); //배열에 추가
          }
          console.log(newFileList);
          setFlist(newFileList);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const viewFlist = flist.map((v, i) => {
    return (
      <div className="Down" key={i}>
        {v.image && <img src={v.image} alt="preview-img" />}
        {v.boardFileOriname}
      </div>
    );
  });

  const [fileName, setFileName] = useState("선택한 파일이 없습니다.");

  const formData = new FormData();

  const onFileChange = useCallback(
    (e) => {
      const files = e.target.files;
      let fnames = ""; //span에 출력할 파일명 목록

      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
        fnames += files[i].name + " ";
      }

      if (fnames == "") {
        fnames = "선택한 파일이 없습니다.";
      }
      setFileName(fnames);
    },
    [formData]
  );
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
            alert("수정 성공");
            nav("/mypage/inquiry");
          } else {
            alert("수정 실패");
          }
        })
        .catch((err) => {
          alert("수정 실패");
          console.log(err);
        });
    },
    [data]
  );
  return (
    <div className="Update">
      <form className="Content" onSubmit={onWrite}>
        <h1>1:1 문의 작성</h1>
        <input
          className="Input"
          name="boardCode"
          value={boardCode}
          placeholder="NO"
          onChange={onch}
          autoFocus
          required
        />
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
          name="productName"
          value={productName}
          placeholder="주문내역"
          onChange={onch}
          autoFocus
        />
        <input
          className="Input"
          name="nphonenum"
          value={nphonenum}
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

export default InquiryUpdate;
