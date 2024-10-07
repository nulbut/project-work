import { useState } from "react";
import styled from "styled-components";
import data from "./data";

function Slide() {
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
        이전
      </Arrow>
      {data.map((character) => (
        <Slide
          key={character.id}
          className={character.id === slideIndex ? "active" : null}
        >
          <Photo
            src={process.env.PUBLIC_URL + `/img/slider/${character.img}`}
          />
          <Name>{character.name}</Name>
          <Nickname>{character.nickname}</Nickname>
        </Slide>
      ))}
      <Arrow direction="next" onClick={moveToNextSlide}>
        다음
      </Arrow>
      <DotContainer>
        {data.map((character) => (
          <Dot
            key={character.id}
            className={character.id === slideIndex ? "active" : null}
            onClick={() => moveDot(character.id)}
          />
        ))}
      </DotContainer>
    </Container>
  );
}

export default Slide;
