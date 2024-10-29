import React, { useEffect, useState } from "react";
import Table from "./Table";
import Paging from "./Paging";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";

const Review = () => {

//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const prev = async () => {
//       try {
//         // 여기서 API 호출을 통해 리뷰 데이터를 가져옵니다.
//         const response = await fetch('/api/reviews'); // API 경로에 맞게 수정
//         const data = await response.json();
//         setReviews(data);
//       } catch (error) {
//         console.error("리뷰를 가져오는 중 오류 발생:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     prev();
//   }, []);

  // let previews = null;
  // if (list.length === 0) {
  //   previews = (
  //     <TableRow key={0}>
  //       <TableColumn span={5}>후기가 없습니다.</TableColumn>
  //     </TableRow>
  //   );
  // } else {
  //   previews = Object.values(list).map((item, idx) => (
  //     <TableRow key={idx}>
  //     <TableColumn wd={10}>{item.hProduct}</TableColumn>
  //     <TableColumn wd={20}>{item.hId}</TableColumn>
  //     <TableColumn wd={30}>{item.hReview}</TableColumn>
  //     <TableColumn wd={40}>{item.hProduct}</TableColumn>
  //     <TableColumn wd={50}>{item.hSet}</TableColumn>
  //     </TableRow>
  //   ))
  // };

  return (
    <div className="menu">
      <h1>상품별 후기 관리</h1>
      <form>
        <div search>
          <input placeholder="상품명" />
          <button>검색</button>
        </div>
      </form>
      <Table hName={["상품명", "ID", "후기", "작성 날짜", "설정"]}>
        {Review}
      </Table>
      {/* <Paging page={page} getList={getUserList} /> */}
    </div>
  );
};

export default Review;
// onSubmit={onSearch}