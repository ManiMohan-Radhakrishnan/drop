import React from "react";
import Footer from "../components/landing-home/footer";
import Header from "../components/landing-home/header";
import MyTreasureBox from "../components/my-treasure-box";

const TreasureBox = () => {
  return (
    <>
      {/* <Header started={false} show_ribbon={false} /> */}
      <Header/>
      <MyTreasureBox />
      <Footer/>

    </>
  );
};

export default TreasureBox;
