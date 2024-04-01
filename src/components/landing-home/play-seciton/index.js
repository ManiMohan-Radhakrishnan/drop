import React, { useEffect, useState } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger, Tween } from "react-gsap";
import Marquee from "react-fast-marquee";

import "./style.scss";

const PlaySection = () => {
  // const { innerWidth } = window;

  return (
    <section className="play-section">
      <Marquee pauseOnHover speed={100} className="marque-block">
        OWN ULTRA-RARE NFTs OWN ULTRA-RARE NFTs OWN ULTRA-RARE NFTs OWN
        ULTRA-RARE NFTs OWN ULTRA-RARE NFTs
      </Marquee>

      {/* {innerWidth > 1028 ? (
        <ScrollTrigger start="900px center" end="1500px center" scrub={true}>
          <Tween
            to={{
              x: "100%",
            }}
            from={{
              x: "0%",
            }}
          >
            <div className="wrapperRollingText">
              <div className=" rollingText text">
                <span>Collect NFTs </span>
              </div>
            </div>
          </Tween>
          <Tween
            from={{ x: "60%" }}
            to={{
              x: "0px",
            }}
          >
            <div className="wrapperRollingText02" l>
              <div className="rollingText02 text">
                <span>Own A Legacy</span>
              </div>
            </div>
          </Tween>
        </ScrollTrigger>
      ) : ( */}
      <div className="mobile-fix">
        <div className="wrapperRollingText">
          <div className=" rollingText text">
            <span>Collect NFTs </span>
          </div>
        </div>
        <div className="wrapperRollingText02" l>
          <div className="rollingText02 text">
            <span>Own A Legacy</span>
          </div>
        </div>
      </div>
      {/* )} */}
    </section>
  );
};

export default PlaySection;
