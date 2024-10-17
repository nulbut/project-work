import React, { useState, useEffect } from "react";
import "./scss/game.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Game = () => {
  const location = useLocation();
  const [displays, setDisplays] = useState([]);
  const [winners, setWinners] = useState([]);
  const [goods, setGoods] = useState([]);
  const [gang, setGang] = useState({
    howlong: -99,
    total: -99,
    play: -99,
    now: -99,
  });
  console.log("굿즈", goods);
  // console.log("로케이션", location);
  // console.log(location.state.code);
  // console.log("굿즈", goods);

  useEffect(() => {
    console.log("디스플레이", displays.length);
    const axiosGet = async () => {
      await axios
        .get("/getGameData", { params: { code: location.state.code } })
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

            // goods.sort(() => Math.random() - 0.5);
            // setDisplays([goods[0], goods[1]]);
          }
          setGang((prev) => {
            return { ...prev, howlong: res.data.length };
          });
        })
        .catch((err) => console.log(err));
    };
    axiosGet();
  }, []);

  const clickHandler = (good) => () => {
    if (goods.length <= 2) {
      if (winners.length === 0) {
        setDisplays([good]);
        setGang((prev) => {
          return { ...prev, play: 0, now: -99 };
        });
        console.log("어케바뀜?", gang);
      } else {
        let updatedGood = [...winners, good];
        updatedGood.sort(() => Math.random() - 0.5);
        setGoods(updatedGood);
        setDisplays([updatedGood[0], updatedGood[1]]);
        setWinners([]);
        setGang((prev) => {
          return { ...prev, play: gang.play / 2, now: 1 };
        });
        console.log("어케바뀜?", gang);
      }
    } else if (goods.length > 2) {
      setWinners([...winners, good]);
      setDisplays([goods[2], goods[3]]);
      setGoods(goods.slice(2));
      setGang((prev) => {
        return { ...prev, now: prev.now + 1 };
      });
      console.log("어케바뀜?", gang);
    }
  };

  const selectGang = () => {
    let sgang = gang.howlong;
    let newtotal = 1;
    while (sgang > 2) {
      newtotal = newtotal * 2;
      console.log(sgang);
      sgang = sgang / 2;
    }
    setGang((prev) => {
      return { ...prev, total: newtotal, play: newtotal / 2, now: 1 };
    });
    // setGang((prev) => {
    //   return { ...prev, total: sgang, play: sgang / 2, now: 1 };
    // });
    console.log("총 데이터 개수", sgang);
    console.log("총강수", gang);
    goods.sort(() => Math.random() - 0.5);
    setGoods(goods.slice(0, newtotal));
    setDisplays([goods[0], goods[1]]);
  }; // 강수 입력시 관련 스테이트 초기화

  const makeGangList = () => {
    let sgang = gang.howlong;
    let newtotal = 1;
    while (sgang / 2 > 1) {
      newtotal = newtotal * 2;
    }
    setGang((prev) => {
      return { ...prev, total: newtotal };
    });
  }; // 2로 나누어 떨어지는 함수

  // console.log("나와라", displays);
  return (
    <div className="frame">
      <div className="gametitle">
        <h1>
          {location.state.name}
          {gang.total}강{" "}
          {gang.play === 0 ? (
            <> 우승</>
          ) : (
            <>
              {gang.play === 1 ? (
                <> 결승전</>
              ) : (
                <>
                  {gang.play === 2 ? (
                    <>
                      {" "}
                      준 결승전 {gang.now}/{gang.play}
                    </>
                  ) : (
                    <>
                      {gang.now}/{gang.play}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </h1>
      </div>

      {
        // displays.src ? (
        displays.map((d) => {
          return (
            <div className="flex-1" key={d.src} onClick={clickHandler(d)}>
              <img className="food-img" src={d.src} />
              <div className="name">{d.iwcContentsName}</div>
            </div>
          );
        })
        // ) : (
        //   <div>loading</div>
        // )
      }

      {gang.total == -99 && (
        <div className="bg_layer">
          <div className="articleView_layer"></div>
          <div className="contents_layer">
            <div className="lightbox">
              총 들어온 데이터 리스트의 길이 : {gang.howlong}
              {/* <button onClick={() => selectGang(gang.howlong)}>16강</button> */}
              <button onClick={() => selectGang()}>2의 배수로 맞추기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
