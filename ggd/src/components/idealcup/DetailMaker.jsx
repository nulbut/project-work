import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const DetailMaker = ({
  selectMenuHandler,
  data,
  setData,
  fileImage,
  setFileImage,
}) => {
  //FormData를 컴포넌트간 교환 할 수 있는 방법을 찾기
  //일단은 데이터베이스에서 조회하는 방식으로 작성

  const [goods, setGoods] = useState([]);
  const location = useLocation();
  //데이터 뿌려주기
  useEffect(() => {
    const axiosGet = async () => {
      await axios
        .get("/getGameData", { params: { code: 1 } })
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

  console.log(goods);
  //데이터 전송하기 axios

  const onch = useCallback(
    (e) => {
      const dataObj = {
        ...data,
        [e.target.name]: e.target.value,
      };
      setData(dataObj);
      console.log(data);
    },
    [data]
  );
  return (
    <div>
      <table>
        <tr>
          <td>번호</td>
          <td>이미지</td>
          <td>이름</td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
        {/* {fileImage.map((e) => ( */}
        {goods.map((e) => (
          <tr>
            <td style={{ width: "100px" }}>{e.iwcContentsCode}</td>
            <td style={{ width: "100px" }}>
              <img style={{ width: "55px" }} src={e.src} />
            </td>
            <td style={{ width: "300px" }}>
              <input
                className="Input"
                name="iwcName"
                value={e.iwcContentsName}
                placeholder="제목"
                onChange={onch}
                autoFocus
                required
              />
            </td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default DetailMaker;
