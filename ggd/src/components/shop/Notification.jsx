import React from "react";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import moment from "moment"; // 날짜 포맷을 위해 moment 사용
import Table from "../admin/Table";

const df = (date) => moment(date).format("YYYY-MM-DD");

const Notification = ({ aitem = [], getNotice }) => {
  let list = null;

  if (aitem.length === 0) {
    // 공지사항이 없을 경우 메시지 출력
    list = (
      <TableRow key={0}>
        <TableColumn span={2}>공지사항이 없습니다</TableColumn>
      </TableRow>
    );
  } else {
    // 공지사항이 있을 경우 목록 렌더링
    list = aitem.map((item) => (
      <TableRow key={item.nnum} bg={item.isPinned ? "pinned" : ""}>
        <TableColumn wd="w-10">
          <div onClick={() => getNotice(item.nnum)}>{item.ntitle}</div>{" "}
          {/* 공지사항 제목 클릭 시 상세보기 */}
        </TableColumn>
        <TableColumn wd="w-20">{df(item.rdate)}</TableColumn>{" "}
        {/* 공지사항 날짜 */}
      </TableRow>
    ));
  }
  console.log(aitem);
  console.log(list);

  return (
    <div>
      <Table hName={["제목", "날짜"]}>{list}</Table>
      {/* 공지사항 제목과 날짜 출력 */}
    </div>
  );
};

export default Notification;
