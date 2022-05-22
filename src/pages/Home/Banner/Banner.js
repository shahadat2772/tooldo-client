import React from "react";

const Banner = () => {
  return (
    <section className="px-4">
      <div
        style={{
          backgroundImage: `url('https://i.ibb.co/DzWFrjh/banner-1.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="bannerImage h-[80vh] rounded relative"
      >
        <div
          style={{
            position: "absolute",
            // top: "25%",
            // left: "15%",
          }}
          className="bannerContent left-[10%] md:left-[15%] top-[25%]"
        >
          <h1 className="text-5xl text-white">
            LIFT YOUR YOUR <br /> BUSINESS{" "}
            <span className="text-secondary">WITH US</span>
          </h1>
          <p className="text-white text- mt-4 mb-5">
            By improving your products quality. We believe in <br /> QUALITY,
            RELIABILITY.
          </p>
          <button className="btn btn-secondary">Start NOw</button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
