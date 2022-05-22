import React from "react";

const Banner = () => {
  return (
    <section className="px-4">
      <div
        style={{
          backgroundImage: `url('https://i.ibb.co/V27KmPT/BG-MAIN-SUPER.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="bannerImage h-[80vh] rounded relative"
      >
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "20%",
          }}
          className="bannerContent"
        >
          <h1 className="text-3xl text-white">
            ENHANCE YOUR YOUR <br /> BUSINESS
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Banner;
