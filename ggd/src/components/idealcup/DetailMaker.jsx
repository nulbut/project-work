import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
// import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";
import "./scss/DataTables.scss";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";

DataTable.use(DT);

const DetailMaker = ({
  selectMenuHandler,
  data,
  setData,
  fileImage,
  setFileImage,
}) => {
  //FormData를 컴포넌트간 교환 할 수 있는 방법을 찾기
  //일단은 데이터베이스에서 조회하는 방식으로 작성
  const tableRef = useRef();
  const [goods, setGoods] = useState([]);
  const location = useLocation();
  //데이터 뿌려주기
  useEffect(() => {
    const axiosGet = async () => {
      await axios
        .get("/getGameData", { params: { code: data.iwcCode } })
        .then((res) => {
          if (res.data.length > 0) {
            let newGoodsList = [];
            for (let i = 0; i < res.data.length; i++) {
              const newGoods = {
                ...res.data[i],
                src: "upload/" + res.data[i].iwcContentsSysname,
              };
              newGoodsList.push(newGoods); //배열에 추가
              console.log(newGoodsList);
            }
            setGoods(newGoodsList);
          }
        })
        .catch((err) => console.log(err));
    };

    axiosGet();
  }, []);
  console.log("123", fileImage);
  console.log(goods);
  //데이터 전송하기 axios

  const onch = (index, e) => {
    const values = [...goods];
    if (e.target.name === "iwcName") {
      values[index].iwcContentsName = e.target.value;
    } else if (e.target.name === "iwcContentsCategory") {
      values[index].iwcContentsCategory = e.target.value;
    }
    // const dataObj = {
    //   ...data,
    //   [e.target.name]: e.target.value,
    // };
    setGoods(values);
  };

  const subimg = useCallback((table) => {
    console.log(table);
    axios
      .post("/updateGameData", table)
      .then((res) => {
        // if (res.data.length > 0) {
        //   let newGoodsList = [];
        //   for (let i = 0; i < res.data.length; i++) {
        //     const newGoods = {
        //       ...res.data[i],
        //       src: "upload/" + res.data[i].iwcContentsSysname,
        //     };
        //     newGoodsList.push(newGoods); //배열에 추가
        //     console.log(newGoodsList);
        //   }
        //   setGoods(newGoodsList);
        // }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div class="card mb-4">
        <div class="card-body">
          DataTables is a third party plugin that is used to generate the demo
          table below. For more information about DataTables, please visit the
          <a target="_blank" href="https://datatables.net/">
            official DataTables documentation
          </a>
          .
        </div>
      </div>

      <table>
        <tr>
          <td>번호</td>
          <td>이미지</td>
          <td>이름</td>
          <td>우승비율</td>
          <td>승률</td>
          <td>카테고리</td>
          <td>라인 삭제</td>
        </tr>
        {/* // {fileImage.map((e) => ( */}
        {goods.map((e, index) => (
          <tr>
            <td style={{ width: "100px" }}>{e.iwcContentsCode}</td>
            <td style={{ width: "100px" }}>
              <img style={{ width: "55px" }} src={e.src} />
            </td>
            <td style={{ width: "300px" }}>
              <input
                class="Input"
                name="iwcName"
                value={e.iwcContentsName}
                placeholder="제목"
                onChange={(e) => onch(index, e)}
              />
            </td>
            <td>
              <progress value={e.iwcContentWincount} max="500"></progress>
            </td>
            <td>
              {e.iwcContentWincount}
              <progress value={e.e.iwcContentWincount} max="500"></progress>
            </td>
            <td>
              <input
                class="Input"
                name="iwcContentsCategory"
                value={e.iwcContentsCategory}
                placeholder="카테고리"
                onChange={(e) => onch(index, e)}
              />
            </td>
            <td>X</td>
          </tr>
        ))}
      </table>
      <button onClick={() => subimg(goods)}>제출</button>
    </div>
  );
};

export default DetailMaker;
