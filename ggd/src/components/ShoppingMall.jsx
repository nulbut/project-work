import React from "react";

import Footer from "./Footer";
import Header from "./Header";
import { Link, Outlet } from "react-router-dom";

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
      <ul>
        <li>
          <Link to="/used">중고</Link>
        </li>
        <li>
          <Link to="/hot">인기</Link>
        </li>
      </ul>
    </div>
  );
};

export default ShoppingMall;
