import React from "react";
import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const ShoppingMall = () => {
  function Slider() {
    const [slideIndex, setSlideIndex] = useState(1);
    return (
      <Container>
        <Arrow direction="prev">이전</Arrow>
        {data.map((character) => (
          <Slide
          key={character.id}
          className={character.id === slideIndex ? "active" : null}
          >
            <Photo
            ></Photo>
          </Slide>
        ))}
      </Container>
    )
  }
  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
};

export default ShoppingMall;
