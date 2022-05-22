import React from "react";
import Banner from "../Banner/Banner";
import Items from "../Items/Items";
import Reviews from "../Reviews/Reviews";
import Summary from "../Summary/Summary";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Items></Items>
      <Summary></Summary>
      <Reviews></Reviews>
    </div>
  );
};

export default Home;
