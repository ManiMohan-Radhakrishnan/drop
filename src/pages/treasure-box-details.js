import React from "react";
import Header from "../components/landing-home/header";
import Footer from "../components/raddax-nft/footer";
import TreasureLootDetails from "../components/treasure-loot-details";

const TreasureBoxDetails = ({ hideMenus = false }) => {
  return (
    <>
      {!hideMenus && <Header />}
      <TreasureLootDetails />
      {!hideMenus && <Footer />}
    </>
  );
};

export default TreasureBoxDetails;
