import React, { useEffect, useRef, useState } from "react";
// import logo from "../../../images/cric/img/ck-1.png";
// import HeroImage from "../../../images/cric/img/heroImage_001.png";
import DesktopBanner from "../../../images/cric/img/desktop-banner.jpg";
import MobileBanner from "../../../images/cric/img/mobile-banner.jpg";
import "./style.scss";

const HeroTopThird = () => {
  const { innerWidth } = window;
  return (
    <>
      <section>
        <img
          src={innerWidth > 767 ? DesktopBanner : MobileBanner}
          alt="HeroImage"
          style={{ width: "100%", height: "auto" }}
        />
      </section>
    </>
  );
};

export default HeroTopThird;
