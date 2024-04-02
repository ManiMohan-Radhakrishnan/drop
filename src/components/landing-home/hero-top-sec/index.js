import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "react-gsap";
import logo from "../../../images/cric/img/ck-1.png";
import HeroImage from "../../../images/cric/img/heroImage_001.png";
import logoJumptrade from "../../../images/cric/img/logo.svg";
import video1 from "../../../images/cric/img/video/banner-video-hevc-safari.mp4";
import video2 from "../../../images/cric/img/video/banner-video-vp9-chrome.webm";
import harbajan from "../../../images/cric/img/cricket-harbajan.mp4";
import { FaPlay } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./style.scss";

const HeroTopSec = () => {
  const { user } = useSelector((state) => state.user.data);

  return (
    <>
      <section className="hero hero-top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="hero-block">
                <div className="ck-logo">
                  <img src={logo} />
                </div>
                <div className=" desktop-content">
                  <img src={HeroImage} alt="HeroImage" />
                  <div className="ck-banner-content">
                    <div className="text-center one-heading">
                      <h1 className="hero-title">
                        CRICKET -{" "}
                        <span className="primary-color">Powered by NFTs</span>
                      </h1>
                    </div>
                    <p className="text second-heading">
                      <span className="primary-color">
                        First-Of-Its-Kind Authenticated
                      </span>{" "}
                      #CricketNFTs
                    </p>
                  </div>
                </div>

                <div className="position-absolute collect-nft">
                  <p className="">COLLECT AUTHENTICATED CRICKET NFTs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroTopSec;
