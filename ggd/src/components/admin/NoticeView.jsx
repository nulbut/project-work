// import axios from 'axios';
// import moment from 'moment';
// import React, { useCallback, useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import NoticeList from './NoticeList';

// const df = (date) => moment(date).format("YYYY-MM-DD");

// const NotieView = () => {

//     const { state } = useLocation();
//     const { nn } = state;

//     const [notice, setNotice] = useState({});
//     // const [filst, setFlist] = useState([
//     //   {
//     //     nfnum: 0,
//     //     nfnid: 0,
//     //     nfsysname: "",
//     //     nforiname: "파일이 없습니다.",
//     //     image: "",
//     //   },
//     // ]);

//     useEffect(() => {
//       axios
//       .get("/getNotice", {params: { nnum: nn } })
//       .then((res) => {
//         setNotice(res.data);

//         if (res.data.nfList.length > 0) {
//           let newFileList = [];
//           for (let i = 0; i < res.data.nfList.length; i++){
//             const newFile = {
//               ...res.data.nfList[i],
//               image: "nupload/" + res.data.nfList[i].nfsysname,
//             };
//             newFileList.push(newFile);
//           }
//           setFlist(newFileList);
//         }
//       })
//       .catch((err) => console.log(err));
//     }, []);

//     const deleteNotice = useCallback(() => {
//       let conf = window.confim("삭제 할까요?");
//       if (!conf) {
//         return;
//       }

//       axios
//         .post("/deleteNotice", null, { params: { nnum: nn } })
//         .then((res) => {
//           if (res.data.res === "ok") {
//             alert("삭제 완료");
//             viewChange();
//           } else {
//             alert("삭제 실패");
//           }
//         })
//         .catch((err) => console.log(err));
//     }, []);

//     const viewChange = () => {
//       console.log("noticeview viewchange");
//       pageSt.setViewPage(<NoticeList />);
//     };

//     return (
//         <div className="Main">
//         <div className="Content">
//           <h1>{board.btitle}</h1>

//           <div className="DataArea">

//             <div className="Box">
//               <div className="Title">날짜</div>
//               <div className="Data">{df(notice.rdate)}</div>
//             </div>
// {/*
//             <div className="Box">
//               <div className="FileTitle">File</div>
//               <div className="FileData">{viewFlist}</div>
//             </div> */}

//             <div className="Cont">{notice.ncontent}</div>
//           </div>

//           <div className="Buttons">
//             <Button wsize="s-10" onClick={() => nav("/")}>
//               뒤로가기
//             </Button>
//             {nid === notice.nid ? (
//               <>
//                 <Button wsize="s-10" color="red" onClick={updateBoard}>
//                   수정
//                 </Button>
//                 <Button wsize="s-10" color="red" onClick={deleteNotice}>
//                   삭제
//                 </Button>
//               </>
//             ) : (
//               ""
//             )}
//           </div>
//         </div>
//       </div>
//     );
// };

// export default NotieView;
