import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "./Button";
import moment from "moment";

const bf = (date) => moment(date).format("YYYY-MM-DD HH:mm:ss");

const InquiryView = () => {
  const nav = useNavigate();

  //게시글 번호 받기
  const { state } = useLocation();
  const { bc } = state; //게시글 번호를 꺼냈다.

  const nid = sessionStorage.getItem("nid");

  const [inquiry, setInquiry] = useState({});
  const [flist, setFlist] = useState([
    {
      boardCode: 0,
      boardType: "",
      bnid: 0,
      nphonoenum: 0,
      boardsysname: "",
      boardoriname: "Nothing",
      image: "",
      productName: 0,
    },
  ]);

  //서버로부터 문의게시글 내용을 받아오기
  useEffect(() => {
    axios
      .get("/getinquiry", { params: { boardCode: bc } })
      .then((res) => {
        setInquiry(res.data);

        //파일 목록 처리(res.date에서 파일 목록을 꺼내서 flist로 처리)
        if (res.data.bfList.length > 0) {
          let newFileList = [];
          for (let i = 0; i < res.data.bfList.length; i++) {
            const newFile = {
              ...res.data.bfList[i],
              image: "update/" + res.data.bfList[i].boardsysname,
            };
            newFileList.push(newFile); //배열에 추가
          }
          setFlist(newFileList);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const viewFlist = flist.map((v, i) => {
    return (
      <div className="Down">
        {v.image && <img src={v.image} alt="preview-img" />}
        {v.boardoriname}
      </div>
    );
  });

  const deleteInquiry = useCallback(() => {
    let conf = window.confirm("삭제하시겠습니까?");
    if (!conf) {
      //취소 버튼이 눌리면 삭제 종료
      return;
    }

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
  }, []);

  const updateInquiry = () => {
    nav("/", { state: { boardCode: bc } });
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
            <div className="Title">문의 종류</div>
            <div className="Data">{inquiry.boardType}</div>
          </div>
          <div className="Box">
            <div className="Title">ID</div>
            <div className="Data">{inquiry.bnid}</div>
          </div>
          <div className="Box">
            <div className="Title">전화번호</div>
            <div className="Data">{inquiry.nphonoenum}</div>
          </div>
          <div className="Box">
            <div className="Title">등록일</div>
            <div className="Data">{bf(inquiry.boardDate)}</div>
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
          {nid === inquiry.bnid ? (
            <>
              <Button wsize="s-10" color="red" onClick={updateInquiry}>
                수정
              </Button>
              <Button wsize="s-10" color="red" onClick={deleteInquiry}>
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

export default InquiryView;
