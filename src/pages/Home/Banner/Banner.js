import React from "react";

const Banner = () => {
  return (
    <section className="px-4">
      <div className="w-full carousel rounded ">
        <div className="carousel-item w-full">
          <img
            src="https://i.ibb.co/V27KmPT/BG-MAIN-SUPER.jpg"
            className="w-full"
            alt="Tailwind CSS Carousel component"
          />
        </div>
        <div className="carousel-item w-full">
          <img
            src="https://i.ibb.co/V27KmPT/BG-MAIN-SUPER.jpg"
            className="w-full"
            alt="Tailwind CSS Carousel component"
          />
        </div>
        <div className="carousel-item w-full">
          <img
            src="https://i.ibb.co/V27KmPT/BG-MAIN-SUPER.jpg"
            className="w-full"
            alt="Tailwind CSS Carousel component"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
