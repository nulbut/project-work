import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const InquiryUpdate = () => {
  const nav = useNavigate();

  const { state } = useLocation();
  const { boardCode } = state;
  const { productName } = state;
  const { nphonenum } = state;

  const nid = sessionStorage.getItem("nid");

  const [data, setData] = useState({
    boardCode: boardCode,
    boardType: "",
    product: productName,
    nphonenum: nphonenum,
    boardTitle: "",
    boardContent: "",
  });

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

  const { boardType, boardTitle, boardContent } = data;
  //서버로부터 게시글 내용을 받아오기
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
      <div className="Down" key={i}>
        {v.image && <img src={v.image} alt="preview-img" />}
        {v.boardoriname}
      </div>
    );
  });

  const [fileName, serFileName] = useState("선택한 파일이 없습니다.");
  return <div></div>;
};

export default InquiryUpdate;
