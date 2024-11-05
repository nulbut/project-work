  import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "./Button";
import moment from "moment";

const bf = (date) => moment(date).format("YYYY-MM-DD");

const InquiryView = () => {
  const nav = useNavigate();

  //게시글 번호 받기
  const { state } = useLocation();
  const { bc } = state; //게시글 번호를 꺼냈다.
  console.log(bc);
  // const nmnum = sessionStorage.getItem("nmnum");
  const nid = sessionStorage.getItem("nid");
  // const bnphonenum = sessionStorage.getItem("nphonenum");

  const [inquiry, setInquiry] = useState({});
  console.log(inquiry);
  const [flist, setFlist] = useState([
    {
      boardFileId: 0,
      boardFileNum: 0,
      boardFileSysname: "",
      boardFileOriname: "Nothing",
      image: "",
    },
  ]);

  //서버로부터 문의게시글 내용을 받아오기
  useEffect(() => {
    axios
      .get("/getinquiry", { params: { boardCode: bc } })
      .then((res) => {
        setInquiry(res.data);
        console.log(res.data);

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

  const viewFlist = flist.map((v) => {
    return (
      <div className="Down">
        {v.image && <img src={v.image} alt="preview-img" />}
        {v.boardFileOriname}
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
    nav("inUpdate", { state: { boardCode: bc } });
  };
  // useEffect(() => {
  //   console.log(nmnum);
  //   if (nmnum === null) {
  //     alert("관리자가 아닙니다.");
  //     return;
  //   }
  // }, []);

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
            <div className="Title">주문 내역</div>
            <div className="Data">{inquiry.productCode}</div>
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
