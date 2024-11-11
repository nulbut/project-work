import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "./scss/Main.scss";
import axios from "axios";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import InquiryBoard from "./InquiryBoard";
import Button from "./Button";
import Paging from "./Paging";

// 날짜 형식 함수
const df = (data) => moment(data).format("YYYY-MM-DD");

const Inquiry = () => {
  const nav = useNavigate();
  const bnid = sessionStorage.getItem("nid");
  const pnum = sessionStorage.getItem("pageNum");
  const [iitem, setIitem] = useState([]); // 게시글 목록
  console.log(iitem);
  const [page, setPage] = useState({
    totalPage: 0,
    pageNum: 1,
  });

  // 서버로부터 문의 게시글 가져오는 함수
  const getBoardList = (pnum) => {
    axios
      .get("/boardlist", { params: { pageNum: pnum, bnid: bnid } })
      .then((res) => {
        const { Blist, totalPage, pageNum } = res.data;
        setPage({ totalPage, pageNum });
        setIitem(Blist);
        sessionStorage.setItem("pageNum", pageNum);
      })
      .catch((err) => console.log(err));
  };

  // 컴포넌트가 렌더링될 때 게시글 목록 가져오기
  useEffect(() => {
    if (!bnid) {
      alert("로그인이 필요합니다.");
      nav("/login", { replace: true });
      return;
    }
    getBoardList(pnum || 1);
  }, [bnid, pnum]);

  // 문의 게시글 목록 출력
  const boardList =
    iitem.length === 0 ? (
      <TableRow key={0}>
        <TableColumn span={5}>문의게시글이 없습니다.</TableColumn>
      </TableRow>
    ) : (
      iitem.map((column, index) => {
        const {
          boardCode,
          boardTitle,
          bnid,
          boardDate,
          productCode,
          usedCode,
        } = column;
        return (
          <TableRow key={boardCode}>
            <TableColumn wd="w-10">{index + 1}</TableColumn>
            <TableColumn wd="w-40">
              <div onClick={() => getBoard(boardCode, productCode, usedCode)}>
                {boardTitle}
              </div>
            </TableColumn>
            <TableColumn wd="w-20">{bnid}</TableColumn>
            <TableColumn wd="w-30">{df(boardDate)}</TableColumn>
            <TableColumn wd="w-30">답변 미완료</TableColumn>
          </TableRow>
        );
      })
    );

  // 상세보기 화면으로 이동
  const getBoard = (boardCode, productCode, usedCode) => {
    nav("inView", { state: { bc: boardCode, productCode, usedCode } });
  };

  return (
    <div className="Main">
      <div className="Content">
        <h1>1:1 문의 게시판</h1>
        <InquiryBoard bName={["번호", "제목", "작성자", "날짜", "상태"]}>
          {boardList}
        </InquiryBoard>

        <Paging page={page} getList={getBoardList} />
        <Button
          type="submit"
          size="large"
          wsize="s-30"
          onClick={() => nav("/mypage/inquiryWrite")}
        >
          글작성
        </Button>
      </div>
    </div>
  );
};

export default Inquiry;
