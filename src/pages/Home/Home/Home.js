import React from "react";
import Footer from "../../Shared/Footer/Footer";
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
      <Footer></Footer>
    </div>
  );
};

export default Home;
