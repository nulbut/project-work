import { useState } from "react";
import "./scss/Slider.scss";

const Slideshow = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      src: require("../images/banner1.png"),
      alt: "굿즈이미지1",
    },
    {
      src: require("../images/banner2.png"),
      alt: "굿즈이미지2",
    },
    {
      src: require("../images/14.JPG"),
      alt: "굿즈이미지3",
    },
    {
      src: require("../images/15.JPG"),
      alt: "굿즈이미지4",
    },
    {
      src: require("../images/16.JPG"),
      alt: "굿즈이미지5",
    },
  ];
  const showSlides = (index) => {
    let newIndex = slideIndex + index;
    if (newIndex >= slides.length) newIndex = 0;
    else if (newIndex < 0) newIndex = slides.length - 1;
    setSlideIndex(newIndex);
  };

  return (
    <section className="slideshow-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide fade ${slideIndex === index ? "active" : ""}`}
        >
          <img src={slide.src} alt={slide.alt} style={{ opacity: 1 }} />
          {/* <div className="text">{slide.text}</div> */}
        </div>
      ))}
      <a className="prev" onClick={() => showSlides(-1)}>
        &#10094;
      </a>
      <a className="next" onClick={() => showSlides(1)}>
        &#10095;
      </a>
    </section>
  );
};
// 24-10-08 수정완료
export default Slideshow;
