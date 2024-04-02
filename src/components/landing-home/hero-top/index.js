import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "react-gsap";
import logo from "../../../images/cric/img/ck-1.png";
import logoJumptrade from "../../../images/cric/img/logo.svg";
import video1 from "../../../images/cric/img/video/banner-video-hevc-safari.mp4";
import video2 from "../../../images/cric/img/video/banner-video-vp9-chrome.webm";
import harbajan from "../../../images/cric/img/cricket-harbajan.mp4";
import { FaPlay } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./style.scss";

const HeroTop = ({ hide = true }) => {
  const { user } = useSelector((state) => state.user.data);
  const { innerWidth } = window;
  const [show, setShow] = useState(false); // need to set as false
  const [buttonShow, setButtonShow] = useState(true);
  const videoRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (innerWidth > 1023) {
      initGsap();
    }

    if (
      window.location.host === "www.jumptrade.in" ||
      window.location.host === "jumptrade.in"
    ) {
      setShow(true);
    }
  }, [hide]);

  const playVideo = () => {
    videoRef.current.play();
    setButtonShow(false);
  };

  const initGsap = () => {
    if (hide) {
      gsap.set(".scaleDown", {
        xPercent: -50,
        yPercent: -60,
        scale: 1.5,
      });
      gsap.to(".scaleDown", {
        scale: 0.4,
        scrollTrigger: {
          trigger: ".hero",
          pin: ".hero",
          scrub: true,
        },
      });
    }
  };
  const handleClose = () => setShow(false);
  return (
    <>
      <section className="hero">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="hero-block">
                <div className="ck-logo">
                  <img src={logo} />
                </div>
                {innerWidth > 1023 && (
                  <div className="scaleDown desktop-content">
                    <video playsInline autoPlay muted="mute">
                      <source src={video1} type='video/mp4; codecs="hvc1"' />
                      <source src={video2} type="video/webm" />
                    </video>
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
                )}
                {innerWidth < 1024 && (
                  <div className="smallscreen-content">
                    <div className="ck-banner-content">
                      <div className="text-center one-heading">
                        <h1 className="hero-title">
                          CRICKET{" "}
                          <span className="primary-color">Powered by NFTs</span>
                        </h1>
                      </div>
                      <video playsInline autoPlay muted="mute" loop>
                        <source src={video1} type='video/mp4; codecs="hvc1"' />
                        <source src={video2} type="video/webm" />
                      </video>
                      <p className="text second-heading">
                        <span className="primary-color">
                          First-Of-Its-Kind <br />
                          Authenticated
                        </span>{" "}
                        #CricketNFTs
                      </p>
                    </div>
                  </div>
                )}

                <div className="position-absolute collect-nft">
                  <p className="">COLLECT AUTHENTICATED CRICKET NFTs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="harbajanModal"
      >
        <Modal.Header closeButton>
          <img src={logoJumptrade} alt="logo" />
        </Modal.Header>
        <Modal.Body>
          <video ref={videoRef} playsInline autoPlay id="harbajan-video">
            <source src={harbajan} type="video/mp4" />
          </video>
          {buttonShow && (
            <span className="play-btn" onClick={playVideo}>
              <FaPlay className="blink-btn" />
            </span>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn waitlist"
            onClick={() => {
              setShow(!show);
              history.push("/#join");
            }}
          >
            {/* {user?.slug ? "Fund Your Wallet" : "Sign Up For Drop"} */}
            {user?.slug ? "Add Balance to Wallet" : "Sign Up For Drop"}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HeroTop;
