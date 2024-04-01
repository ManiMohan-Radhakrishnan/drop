import React from "react";
import Marquee from "react-fast-marquee";

import bgVideo from "../../../images/cric/img/video/Cricket_Web_Bg_Video_2k.mp4";
import cubeImage from "../../../images/cric/img/cube_img.png";
import "./style.scss";
import { useSelector } from "react-redux";
import video3 from "../../../images/cric/img/video/pack.mp4";
import video4 from "../../../images/cric/img/video/pack.webm";

const SuperLoot = () => {
  const { user } = useSelector((state) => state.user.data);

  return (
    <>
      <section className="super-loot-block">
        <video playsInline autoPlay muted="mute" loop className="bg-video">
          <source src={bgVideo} type="video/mp4" />
        </video>
        <Marquee pauseOnHover speed={100} className="hit-the-drop">
          HIT THE DROP! HIT THE DROP! HIT THE DROP! HIT THE DROP! HIT THE DROP!
          HIT THE DROP! HIT THE DROP! HIT THE DROP!&nbsp;
        </Marquee>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="heading-block">
                <h4>The</h4>
                <h3>SUPER LOOT</h3>
                <h4 className="Nfts">NFTs</h4>
              </div>

              <h5 className="loot-detail">
                THE PREMIUM NFT COLLECTION TO KICKSTART YOUR METAVERSE CRICKET
                JOURNEY. HOLD A CHANCE TO UNLOCK EXCLUSIVE ITEMS ON EVERY SUPER
                LOOT!
              </h5>
              {/* <img src={cubeImage} className="cube-image" /> */}
              <video
                className="drop__pack"
                playsInline
                autoPlay
                muted="mute"
                loop
              >
                <source src={video3} type='video/mp4; codecs="hvc1"' />
                <source src={video4} type="video/webm" />
              </video>

              {/* <a
                href="javascript:void(0);"
                target={"_blank"}
                className="waitlist"
              >
                JOIN THE WAITLIST NOW
              </a> */}
              <p className="loot-description">
                THE META CRICKET LEAGUE INSTANTLY UNLEASHES YOUR CHANCES TO GRAB
                PLAYABLE, ULTRA-RARE UITILITY NFTs AND AUTHENTICATED
                COLLECTIBLES OF LEGENDS!
              </p>
              <button
                className="btn waitlist"
                onClick={() => {
                  if (user?.slug) {
                    window.open(
                      `${process.env.REACT_APP_ACCOUNTS_URL}/accounts/wallet`,
                      "_self"
                    );
                  } else {
                    window.open(
                      sessionStorage.getItem("fsz") !== null
                        ? `${
                            process.env.REACT_APP_ACCOUNTS_URL
                          }/signup?fsz=${sessionStorage.getItem("fsz")}`
                        : `${process.env.REACT_APP_ACCOUNTS_URL}/signup`,
                      "_self"
                    );
                  }
                }}
              >
                {/* {user?.slug ? "Fund Your Wallet" : "Sign Up For Drop"} */}
                {user?.slug ? "Add Balance to Wallet" : "Sign Up For Drop"}
              </button>

              {/* <p className="hint-name">
                WIN PREMIUM NFT COLLECTION TO KICKSTART YOUR METAVERSE CRICKET
                JOURNEY. HOLD A CHANCE TO UNLOCK EXCLUSIVE ITEMS ON EVERY
                SUPER LOOT!
              </p> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SuperLoot;
