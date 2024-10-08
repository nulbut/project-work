import { useState } from "react";
import styled from "styled-components";
import data from "../data"

function Slider() {
  const [slideIndex, setSlideIndex] = useState(1);

  const moveToPrevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex((prev) => prev - 1);
    } else {
      setSlideIndex(data.length);
    }
  };

  const moveToNextSlide = () => {
    if (slideIndex !== data.length) {
      setSlideIndex((prev) => prev + 1);
    } else {
      setSlideIndex(1);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  return (
    <Container>
      <Arrow direction="prev" onClick={moveToPrevSlide}>
        ＜
      </Arrow>
      {data.map((data) => (
        <Slide
          key={data.id}
          className={data.id === slideIndex ? "active" : null}
        >
          <Photo
            src={process.env.PUBLIC_URL + `/img/slider/${data.img}`}
          />
          <Name>{data.name}</Name>
          <Nickname>{data.nickname}</Nickname>
        </Slide>
      ))}
      <Arrow direction="next" onClick={moveToNextSlide}>
        ＞
      </Arrow>
      <DotContainer>
        {data.map((data) => (
          <Dot
            key={data.id}
            className={data.id === slideIndex ? "active" : null}
            onClick={() => moveDot(data.id)}
          />
        ))}
      </DotContainer>
    </Container>
  );
}
// 10-08 09:10
const Container = styled.div`
  width: 600px;
  height: 350px;
  margin: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Arrow = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  left: ${({ direction }) => direction === "prev" && "0px"};
  right: ${({ direction }) => direction === "next" && "0px"};
  width: 50px;
  height: 50px;
  background-color: aquamarine;
  z-index: 1;
`;

const Slide = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  opacity: 0;
  transition: opacity 0.3 ease-in-out;
  &.active {
    opacity: 1;
  }
`;

const Photo = styled.img``;

const Name = styled.div``;

const Nickname = styled.div``;

const DotContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 150px;
  display: flex;
  justify-content: space-between;
`;

const Dot = styled.div`
width: 12px;
height: 12px;
border-radius: 50%;
background-color: aqua;
cursor: pointer;
&.active {
  background-color: skyblue;
}
`;
export default Slider;
