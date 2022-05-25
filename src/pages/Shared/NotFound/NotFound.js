import React from "react";

const NotFound = () => {
  return (
    // <div>
    //   <img
    //     className="mx-auto"
    //     src="https://i.ibb.co/99qHW0V/dribbble-1.gif"
    //     alt=""
    //   />
    // </div>
    <section className="px-4">
      <div
        style={{
          backgroundImage: `url('https://i.ibb.co/99qHW0V/dribbble-1.gif')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="bannerImage h-[100vh] rounded relative"
      >
        <div
          style={{
            position: "absolute",
          }}
          className="bannerContent left-[15%] top-[73%] md:left-[34%]  md:top-[85%]"
        >
          <h1
            style={{ fontFamily: "Oswald", lineHeight: "75px" }}
            className="md:text-[55px] text-[30px] text-secondary"
          >
            404! Page not found.
          </h1>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
