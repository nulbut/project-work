import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const nav = useNavigate();
  const [goods, setGoods] = useState([
    {
      iwcContentFinalcount: "",
      iwcContentVscount: "",
      iwcContentWincount: "",
      iwcContentsCategory: "",
      iwcContentsCode: "",
      iwcContentsIwcCode: "",
      iwcContentsName: "",
      iwcContentsOriname: "",
      iwcContentsSysname: "",
      src: "",
    },
  ]);
  const [deleteGoods, setDeleteGoods] = useState([]);
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
            }
            setGoods(newGoodsList);
          }
        })
        .catch((err) => console.log(err));
    };

    axiosGet();
  }, [data]);

  //데이터 전송하기 axios

  const onch = (index, e) => {
    const values = [...goods];
    if (e.target.name === "iwcName") {
      values[index].iwcContentsName = e.target.value;
    } else if (e.target.name === "Category") {
      values[index].iwcContentsCategory = e.target.value;
      console.log("카테고리");
    }

    setGoods(values);
  };

  const removeGoods = (index) => {
    if (goods.length === 4) {
      alert("4개 이하로는 작성하실 수 없습니다.");
      return;
    }
    const values = [...goods];
    const deletedItem = values.splice(index, 1)[0];
    console.log(deletedItem); //[] 없애기
    setDeleteGoods((prevDeleteGoods) => [...prevDeleteGoods, deletedItem]);
    setGoods(values);

    console.log(values);
    console.log(deleteGoods);
  };

  const subimg = useCallback((table, table2) => {
    console.log(table);
    axios
      .all([
        axios.post("/updateGameData", table),
        axios.post("/updateDeleteGameData", table2),
      ])
      .then((res) => {
        alert("수정 되었습니다.");
        nav("/mycup");
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div class="card mb-4">
        <div class="card-body">
          처음 두개의 이미지가 이상형 월드컵의 대표 이미지로 선정됩니다. 유의해
          주세요 .
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
        {goods.map((con, index) => (
          <tr>
            <td style={{ width: "100px" }}>{index + 1}</td>
            <td style={{ width: "100px" }}>
              <img style={{ width: "55px" }} src={con.src} />
            </td>
            <td style={{ width: "300px" }}>
              <input
                class="Input"
                name="iwcName"
                value={con.iwcContentsName}
                placeholder="제목"
                onChange={(e) => onch(index, e)}
              />
            </td>
            <td>
              {con.iwcContentFinalcount}/{data.iwcComplete}
              <progress
                value={con.iwcContentFinalcount}
                max={data.iwcComplete}
              ></progress>
            </td>
            <td>
              {con.iwcContentWincount}/{con.iwcContentVscount}
              <progress
                value={con.iwcContentWincount}
                max={con.iwcContentVscount}
              ></progress>
            </td>
            <td>
              <input
                class="Input"
                name="Category"
                value={con.iwcContentsCategory}
                placeholder="카테고리"
                onChange={(e) => onch(index, e)}
              />
            </td>
            <td>
              <button onClick={() => removeGoods(index)}>X</button>
            </td>
          </tr>
        ))}
      </table>
      <button onClick={() => subimg(goods, deleteGoods)}>제출</button>
    </div>
  );
};

export default DetailMaker;
