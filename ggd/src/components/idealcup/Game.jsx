import React, { useState, useEffect, useCallback } from "react";
import "./scss/game.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";
const Game = () => {
  const location = useLocation();
  const nav = useNavigate();
  const [displays, setDisplays] = useState([]);
  const [winners, setWinners] = useState([]);
  const [goods, setGoods] = useState([]);
  const [gang, setGang] = useState({
    howlong: -99,
    total: -99,
    play: -99,
    now: -99,
    ganglist: [],
  });
  const [gameinfo, setGameInfo] = useState({
    name: "",
    expl: "",
    code: 0,
  });
  console.log("굿즈", goods);
  // console.log("로케이션", location);
  // console.log(location.state.code);
  // console.log("굿즈", goods);

  const decryptData = (ciphertext) => {
    const secretKey = "your_secret_key";
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  };

  useEffect(() => {
    if (!location.state) {
      const params = new URLSearchParams(location.search);
      const encryptedData = decryptData(params.get("data"));
      gameinfo.name = encryptedData.name;
      gameinfo.expl = encryptedData.expl;
      gameinfo.code = encryptedData.code;
      console.log("로케이션 길이?", encryptedData);
    } else {
      gameinfo.name = location.state.name;
      gameinfo.expl = location.state.expl;
      gameinfo.code = location.state.code;
      console.log("게임 인포?", gameinfo);
    }

    console.log("디스플레이", displays.length);
    const axiosGet = async () => {
      await axios
        .get("/getGameData", { params: { code: gameinfo.code } })
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
          let sgang = res.data.length;
          let newtotal = 1;
          let newganglist = [];
          while (sgang > 2) {
            newtotal = newtotal * 2;

            if (newtotal >= 4) {
              const newGang = {
                name: newtotal + " 강",
                val: newtotal,
              };
              newganglist.push(newGang);
            }
            sgang = sgang / 2;
          }

          setGang((prev) => {
            return {
              ...prev,
              total: newtotal,
              howlong: res.data.length,
              ganglist: newganglist.reverse(),
            };
          });
        })
        .catch((err) => console.log(err));
    };

    axiosGet();
  }, []);

  const updateVs = useCallback(
    (d, final) => {
      let winner,
        loser = null;
      winner = d.iwcContentsCode;
      for (let i = 0; i < displays.length; i++) {
        if (displays[i].iwcContentsCode != winner) {
          loser = displays[i].iwcContentsCode;
        }
        console.log("위너 루저", typeof winner, winner, loser, final);
      }
      axios
        .get("/updateGameVs", {
          params: { win: winner, lose: loser, iwcCode: final },
        })
        .then((res) => {})
        .catch((error) => {
          console.error(error);
        });
    },
    [displays]
  );
  const clickHandler = (good) => () => {
    if (goods.length <= 2) {
      if (winners.length === 0) {
        setDisplays([good]);
        setGang((prev) => {
          return { ...prev, play: 0, now: -98 };
        });
        updateVs(good, gameinfo.code);
        console.log("어케바뀜?", gameinfo.code);
      } else {
        let updatedGood = [...winners, good];
        updatedGood.sort(() => Math.random() - 0.5);
        setGoods(updatedGood);
        setDisplays([updatedGood[0], updatedGood[1]]);
        setWinners([]);
        setGang((prev) => {
          return { ...prev, play: gang.play / 2, now: 1 };
        });
        updateVs(good);
        console.log("어케바뀜?", gang);
      }
    } else if (goods.length > 2) {
      setWinners([...winners, good]);
      setDisplays([goods[2], goods[3]]);
      setGoods(goods.slice(2));
      setGang((prev) => {
        return { ...prev, now: prev.now + 1 };
      });
      updateVs(good);
      console.log("어케바뀜?", gang);
    }
  };

  console.log(gang.ganglist);

  const selectGang = () => {
    setGang((prev) => {
      return { ...prev, play: gang.total / 2, now: 1 };
    });

    console.log("총강수", gang);
    goods.sort(() => Math.random() - 0.5);
    setGoods(goods.slice(0, gang.total));
    setDisplays([goods[0], goods[1]]);
  }; // 강수 입력시 관련 스테이트 초기화

  const handleSelect = (e) => {
    console.log("셀렉트핸들", e.target.value);
    setGang({ ...gang, total: e.target.value });
    console.log(gang);
  };
  console.log(displays);
  return (
    <div className="frame">
      <div className="gametitle">
        <h1>
          {gameinfo.name}
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

      {displays.map((d) => {
        return (
          <>
            {gang.now == -98 ? (
              <div className="flex-1" key={d.src}>
                <img
                  className="food-img"
                  src={d.src}
                  style={{
                    width: "auto",
                    height: "100%",
                    transform: "translateX(-50%)",
                    left: "50%",
                  }}
                />

                <div className="name">{d.iwcContentsName}</div>
              </div>
            ) : (
              <div className="flex-1" key={d.src} onClick={clickHandler(d)}>
                <img className="food-img" src={d.src} />
                <div className="name">{d.iwcContentsName}</div>
              </div>
            )}
          </>
        );
      })}

      {gang.now == -99 && (
        <div className="bg_layer">
          <div className="articleView_layer"></div>
          <div className="contents_layer">
            <div className="lightbox">
              <h2>제목 : {gameinfo.name}</h2>
              <h3>설명 : {gameinfo.expl}</h3>

              <h3>총 라운드를 선택하세요</h3>
              <select name="gangmany" onChange={handleSelect}>
                {gang.ganglist.map((i) => {
                  return (
                    <option key={i.val} value={i.val}>
                      {i.name}
                    </option>
                  );
                })}
              </select>
              <h4>
                총 {gang.howlong}명(개)의 후보 중 무작위 {gang.total}명(개)의
                후보가 대결합니다.
              </h4>
              <button onClick={() => selectGang()}>시작하기</button>
              <button onClick={() => nav(-1)}>돌아가기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
