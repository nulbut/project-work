import React, { useState, useEffect } from "react";
import "./scss/game.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Game = () => {
  const location = useLocation();
  const [displays, setDisplays] = useState([]);
  const [winners, setWinners] = useState([]);
  const [goods, setGoods] = useState([]);
  const [gang, setGang] = useState(-99);
  let i = 1;
  console.log(location);
  console.log(location.state.code);
  console.log("굿즈", goods);

  useEffect(() => {
    console.log("디스플레이", displays.length);
    const axiosGet = async () => {
      await axios
        .get("/getGameData", { params: { code: location.state.code } })
        .then((res) => {
          {
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
              // goods.sort(() => Math.random() - 0.5);
              // setDisplays([goods[0], goods[1]]);
            }
          }
        })
        .catch((err) => console.log(err));
    };
    axiosGet();
  }, []);

  const clickHandler = (good) => () => {
    if (goods.length <= 2) {
      if (winners.length === 0) {
        setDisplays([good]);
      } else {
        let updatedGood = [...winners, good];
        updatedGood.sort(() => Math.random() - 0.5);
        setGoods(updatedGood);
        setDisplays([updatedGood[0], updatedGood[1]]);
        setWinners([]);
        setGang(gang / 2);
      }
    } else if (goods.length > 2) {
      setWinners([...winners, good]);
      setDisplays([goods[2], goods[3]]);
      setGoods(goods.slice(2));
    }
  };

  const selectGang = (gang) => {
    setGang(gang);
    console.log("버튼", displays);
    goods.sort(() => Math.random() - 0.5);
    setDisplays([goods[0], goods[1]]);
  };

  console.log("나와라", displays);
  return (
    <div className="frame">
      <h1 className="title">이상형 월드컵</h1>
      {
        // displays.src ? (
        displays.map((d) => {
          return (
            <div className="flex-1" key={d.src} onClick={clickHandler(d)}>
              <img className="food-img" src={d.src} />
              <div className="name">{d.iwcContentsOriname}</div>
            </div>
          );
        })
        // ) : (
        //   <div>loading</div>
        // )
      }
      {gang < 0 && (
        <div className="bg_layer">
          <div className="articleView_layer">123</div>
          <div className="contents_layer">
            <div className="lightbox">
              <button onClick={() => selectGang(8)}>8강</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
