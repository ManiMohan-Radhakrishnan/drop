import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { BiLoaderAlt } from "react-icons/bi";
import { Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { HiOutlineArrowRight } from "react-icons/hi";
// import nftVideo from "../../images/cric/img/video/nftCollection.m4v";
import dummy_bat from "../../../images/cric/dummy_bat.png";
import { BiX } from "react-icons/bi";
import {
  FaTelegramPlane,
  FaDiscord,
  FaInstagram,
  FaMediumM,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaPlay,
} from "react-icons/fa";
import { useHistory } from "react-router";

import guardianlogo from "../../../images/guardianlink.svg";

import { sendEmailNewletter } from "../../../api/axios-newsletter";
import { validateEmail } from "./../../../utils/common";
import { treasureCheck } from "../../../api/methods";

import useWindowSize from "../../../hook/useWindowSize";

import "../../new-drops-temp/style.scss";

import "./style.scss";

import play from "../../../images/play.png";
import playBtn from "../../../images/play-btn.png";
import { VscClose } from "react-icons/vsc";
import { BsPlayFill } from "react-icons/bs";
import raddxvideo from "../../../images/raddx-nft/15_Seconds_MOB071222.mp4";

const TralierSection = () => {
  const history = useHistory();
  const { hash } = useLocation();

  const [nftCount, setNftCount] = useState(0);

  const { user } = useSelector((state) => state.user.data);
  const videoRef = useRef();
  const [video, setVideo] = useState(false);
  const { width: windowWidth } = useWindowSize();
  const [showVideo, setShowVideo] = useState(false);

  const playVideo = (play = true) => {
    if (!play) {
      videoRef?.current?.pause();
      videoRef.current.currentTime = 0;
    } else {
      videoRef.current.play();
    }
    setShowVideo(play);
  };

  return (
    <>
      <section
        className={`raddx-hero-section ${
          showVideo && windowWidth > 768 && "video-open"
        }`}
        ref={videoRef}
      >
        {windowWidth > 767 ? (
          <>
            {!video ? (
              <>
                <video
                  src={
                    "https://cdn.guardianlink.io/product-hotspot/images/raddx/RADDX-withWeapons-Fighting-optimized.mp4"
                  }
                  //   autoplay
                  //   muted
                  //   //onEnded={() => playVideo(false)}
                  //   //controls={true}
                  //   alt="hero banner teaser"
                  //   width="100%"
                  //   height="100%"
                  className="raddx-hero-banner-video"
                  //   playsInline
                  playsInline
                  autoPlay
                  muted="mute"
                  loop
                />
                {!showVideo && windowWidth > 767 ? (
                  <div className="video-content">
                    <div className="content-text">
                      <h4 className="theme-yellow-text">
                        {" "}
                        RADDX - RACE IN THE METAVERSE | EARN REAL CASH!
                      </h4>

                      <p className="text-white trailer-desc">
                        Exciting Concept Cars | Missiles/Rocket Launchers |
                        Multiple Tournaments per day <br /> Own Revenue
                        Generating Digital Lands | Charging Stations | Police
                        Stations | Pitstops
                      </p>
                    </div>
                    <div className="content-button">
                      {" "}
                      <button
                        className="watch-btn"
                        onClick={() => {
                          setVideo(!video);
                          videoRef.current.scrollIntoView();
                        }}
                      >
                        {" "}
                        <FaPlay />
                        Watch The Tralier
                      </button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {/* <button
                          class="glow-on-hover mt-5"
                          onClick={() => {
                            setVideo(!video);
                            videoRef.current.scrollIntoView();
                          }}
                          type="button"
                        >
                          <BsPlayFill
                            className="anim-play"
                            size={80}
                            color="#e1ff04"
                          />
                          <div className="watch-btn-text">
                            Watch The <span>Trailer</span>
                          </div>
                        </button> */}
              </>
            ) : (
              <>
                <section className="video-container raddax-video-container">
                  <div className="trailer-container">
                    <div className="trailer-close-btn  end-0 translate-middle-x">
                      <div
                        className="close-comp d-inline-flex "
                        onClick={() => {
                          setVideo(!video);
                          videoRef.current.scrollIntoView();
                        }}
                      >
                        <VscClose size={50} />
                      </div>
                    </div>
                    <iframe
                      width="100%"
                      height="auto"
                      src="https://www.youtube.com/embed/AdHHFoV-Aoo?rel=0&autoplay=1"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                </section>
              </>
            )}
          </>
        ) : (
          <>
            <div className="yt-banner-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/AdHHFoV-Aoo?rel=0&autoplay=1"
                title="Raddx Racing Metaverse NFTs"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="yt-banner-desc">
              <h4 className="theme-yellow-text">
                RADXX - RACE IN THE METAVERSE | EARN REAL CASH
              </h4>
              {/* <h6>Exicit Concept Cars</h6>
              <h6>Missiles/Rocket Launchers</h6>
              <h6>Multiple Tournament per day</h6>
              <h6>Own Revenue Generating Digital Lands</h6>
              <h6>Charging Stations</h6>
              <h6>Police Stations</h6>
              <h6>Pistops</h6> */}
              <p className="text-white trailer-desc">
                Exciting Concept Cars | Missiles/Rocket Launchers | Multiple
                Tournaments per day | Own Revenue Generating Digital Lands |
                Charging Stations | Police Stations | Pitstops
              </p>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default TralierSection;
