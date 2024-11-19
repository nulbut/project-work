import classNames from "classnames";
import React from "react";
import "./scss/Paging.scss";

const Paging = ({ page, getList }) => {
  console.log(page);
  const { totalPage, pageNum } = page;
  const pageCnt = 5;

  let curGroup = Math.floor(
    pageNum % pageCnt > 0 ? pageNum / pageCnt + 1 : pageNum / pageCnt
  );
  let start = curGroup * pageCnt - (pageCnt - 1);
  let end = curGroup * pageCnt >= totalPage ? totalPage : curGroup * pageCnt;
  let makePage = totalPage > end ? pageCnt : totalPage - start + 1;

  if (makePage <= 0) {
    makePage = 1;
  }

  //페이지 번호(버튼) 생성
  const pageList = new Array(makePage).fill().map((_, idx) => {
    if (idx + start === pageNum) {
      //현재 보이는 페이지의 번호(링크 X)
      return (
        <div className={classNames("Number", "cur")} key={idx + start}>
          {idx + start}
        </div>
      );
    } else {
      //다른 페이지 번호(링크 O)
      return (
        <div
          className="Number"
          key={idx + start}
          onClick={() => onck(idx + start)}
        >
          {idx + start}
        </div>
      );
    }
  });

  //이전 버튼
  if (start !== 1) {
    pageList.unshift(
      <div className="Number" key={start - 1} onClick={() => onck(start - 1)}>
        &lt;
      </div>
    );
  }

  //다음 버튼
  if (end !== totalPage) {
    pageList.push(
      <div className="Number" key={end + 1} onClick={() => onck(end + 1)}>
        &gt;
      </div>
    );
  }

  //페이지 전환 함수
  const onck = (pnum) => {
    getList(pnum); //위에서 작성된 각 div의 onck함수로 전달되는 페이지 번호
  };

  return <div className="Paging">{pageList}</div>;
};

export default Paging;
