import React, { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UsedButton from "./UsedButton";
import "./scss/UsedInput.scss";
import "./scss/UsedtextArea.scss";
import "./scss/UsedfileInput.scss";
import "./scss/UsedWrite.scss";

const UsedWrite = () => {
  const usedsellerId = sessionStorage.getItem("nid");
  const [data, setData] = useState({
    usedName: "",
    usedsellerId: usedsellerId,
    usedcategoryCode: "",
    usedSeller: "",
    usedLimit: "",
    usedStock: "",
    usedDetail: "",
    usedDate: "",
    // usedFileOriname: "",
  });

  const {
    usedName,
    usedcategoryCode,
    usedSeller,
    usedLimit,
    usedStock,
    usedDetail,
    usedDate,
    // usedFileOriname,
  } = data;
  const [fileName, setFileName] = useState("선택된 이미지 파일이 없습니다.");
  const nav = useNavigate();

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

  //파일 선택 시 폼데이터에 파일 목록 추가
  const onFileChange = useCallback(
    (e) => {
    const files = e.target.files;
    let fnames = ""; //span에 출력할 파일명 목록

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
      fnames += files[i].name + " ";
    }

    if (fnames === "") {
      fnames = "선택된 이미지 파일이 없습니다.";
    }
    setFileName(fnames);
  },[formData]);

  //작성한 내용(제목, 글, 파일들) 전송 함수
  const onWrite = useCallback(
    (e) => {
      e.preventDefault(); // 페이지 변환을 방지하는 함수.

      // 전송 시 파일 이외의 데이터를 폼데이터에 추가
      formData.append(
        "data",
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );
      console.log(formData)
      axios
        .post("/usedwriteProc", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.data === "ok") {
            alert("등록 성공");
            nav("/mypage");
          } else {
            alert("등록 실패");
          }
        })
        .catch((err) => {
          alert("전송 실패");
          console.log(err);
        });
    },
    [data]
  );
  console.log("현재값", data);
  

  return (
    <div className="UsedWrite">
      <form className="UsedContent" onSubmit={onWrite}>
        <h1>중고 상품 등록</h1>
        <input
          className="UsedInput"
          name="usedName"
          value={usedName}
          placeholder="제품명"
          onChange={onch}
          autoFocus
          required
        />
        <input
          className="UsedInput"
          name="usedsellerId"
          value={usedsellerId}
          placeholder="판매자"
          onChange={onch}
          autoFocus
          required
        />
        <input
          className="UsedInput"
          name="usedcategoryCode"
          value={usedcategoryCode}
          placeholder="카테고리"
          onChange={onch}
          autoFocus
          required
        />
        <input
          className="UsedInput"
          name="usedSeller"
          value={usedSeller}
          placeholder="판매가"
          onChange={onch}
          autoFocus
          required
        />
        <input
          className="UsedInput"
          name="usedLimit"
          value={usedLimit}
          placeholder="구매제한"
          onChange={onch}
          autoFocus
          required
        />
        <input
          className="UsedInput"
          name="usedStock"
          value={usedStock}
          placeholder="수량"
          onChange={onch}
          autoFocus
          required
        />
        <input
          className="UsedInput"
          name="usedDate"
          value={usedDate}
          placeholder="등록일"
          onChange={onch}
          autoFocus
          required
        />
        <textarea
          className="UsedtextArea"
          name="usedDetail"
          onChange={onch}
          placeholder=" 모델명, 구매 시기, 하자 유무 등 상품 설명을 최대한 자세히 적어주세요.
          전화번호, SNS 계정 등 개인정보 입력은 제한이 될 수 있습니다."
          value={usedDetail}
        ></textarea>
        <div className="UsedfileInput">
          <input id="upload"
           type="file"
            multiple 
            onChange={onFileChange} 
         />
          <label className="UsedfileLabel" htmlFor="upload">
            파일선택
          </label>
          <span className="UsedfileSpan">
            {fileName} 
          </span>
        </div>
        <div className="Button">
          <UsedButton
            type="button"
            size="large"
            color="gray"
            wsize="s-10"
            outline
            onClick={() => nav("/mypage")}
          >
            목록으로
          </UsedButton>
          <UsedButton 
          type="submit" 
          size="large" 
          wsize="s-30"
          >
            등록
          </UsedButton>
        </div>
      </form>
    </div>
  );
};

export default UsedWrite;
