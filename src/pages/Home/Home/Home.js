import React from "react";
import Inquiry from "../../Inquiry/Inquiry";
import Footer from "../../Shared/Footer/Footer";
import Banner from "../Banner/Banner";
import Items from "../Items/Items";
import OurTeam from "../OurTeam/OurTeam";
import Reviews from "../Reviews/Reviews";
import Summary from "../Summary/Summary";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Items></Items>
      <Summary></Summary>
      <OurTeam></OurTeam>
      <Reviews></Reviews>
      <Inquiry></Inquiry>
      <Footer></Footer>
    </div>
  );
};

export default Home;
