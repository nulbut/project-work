// src/components/ResultPage.jsx
import React from "react";
import "./scss/ResultPage.scss";
import AdGrid from "./AdGrid";
import StatTable from "./StatTable";
import CommentSection from "./CommentSection";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";
import ShareButton from "./ShareButton";

const ResultPage = () => {
  const location = useLocation();
  const data = location.state?.data;

  console.log(location.state); // state 객체가 제대로 넘어오는지 확인

  console.log(location.state);
  const winner = {
    name: data.good[0].iwcContentsName,
    image: data.good[0].src,
    cate: data.good[0].iwcContentsCategory,
    conCode: data.good[0].iwcContentsIwcCode,
    conName: data.good[0].iwcContentsName,
  };

  // const statistics = [
  //   { category: "우승 비율", value: "75%" },
  //   { category: "승률", value: "80%" },
  //   { category: "승리 수", value: "15" },
  //   { category: "참여 횟수", value: "20" },
  // ];
  return (
    <div className="resultPage">
      <div className="firstCoulmn">
        <div className="winnerPhoto">
          <div className="winner">
            <img src={winner.image} alt="Winner"></img>
            <div className="name">{winner.name}</div>
          </div>
          <AdGrid category={winner.cate} />
        </div>
        <div className="second-result">
          <div className="buttons">
            <div className="btn-set">
              <Link
                to={`/game`}
                state={{
                  code: data.game.iwcCode,
                  name: data.game.iwcName,
                  expl: data.game.iwcExplanation,
                }}
              >
                <Button wsize="s-25">다시시작</Button>
              </Link>
              <Link>
                <Button wsize="s-25">랭킹보기</Button>
              </Link>
              <ShareButton
                code={data.game.iwcCode}
                name={data.game.iwcName}
                expl={data.game.iwcExplanation}
              />
            </div>
            <div>
              <Link
                to={`/game`}
                state={{
                  code: data.game.iwcCode,
                  name: data.game.iwcName,
                  expl: data.game.iwcExplanation,
                }}
              >
                <Button wsize="s-25">다시시작</Button>
              </Link>
              <Link>
                <Button wsize="s-25">랭킹보기</Button>
              </Link>
              <Link>
                <Button wsize="s-25">랭킹보기</Button>
              </Link>
            </div>
          </div>
          <StatTable
            iwcCode={data.game.code}
            contentCode={data.good[0].iwcContentsCode}
          />
        </div>
      </div>

      <CommentSection
        iwcCode={data.game.code}
        iwcContentsCode={winner.conCode}
        iwcContentsCategory={winner.cate}
        iwcContentsName={winner.name}
      />
    </div>
  );
};

export default ResultPage;
