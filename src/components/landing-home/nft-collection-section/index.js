import React from "react";
import { useSelector } from "react-redux";

import nftVideo from "../../../images/cric/img/video/nftCollection.m4v";

import tresureBoxImage from "../../../images/cric/img/treasure_box_animation.gif";
import tresureBoxVideo from "../../../images/cric/img/video/treasure_video.mp4";
import superLootVideo from "../../../images/cric/img/video/pack.mp4";
import superLootVideoWebm from "../../../images/cric/img/video/pack.webm";
import { BsInfoCircle } from "react-icons/bs";
import "./style.scss";
import { useHistory } from "react-router-dom";

const NftCollectionVideo = () => {
  const history = useHistory();

  const { user } = useSelector((state) => state.user.data);
  return (
    <>
      <section className="nft-collection-video">
        {/* <div className='container-fluid'>
                <div className='row'>
                    <div className='col-12'>

                    </div>
                </div>
            </div> */}
        <article className="nftsec-flec-box">
          <div className="nft-videobox">
            <video playsInline autoPlay muted loop id="nftVideo-video">
              <source
                src={
                  "https://cdn.guardianlink.io/product-hotspot/images/SuperLoot_SoldOut_9mins.m4v"
                }
                type="video/mp4"
              />
            </video>
          </div>
          <div className="nft-contentbox">
            <h2>THE SUPER LOOT</h2>
            <p>
              THE SUPER LOOT GIVES YOU THE ASSURANCE OF HAVING NFTs BELONGING TO
              ANY ONE OF THE FOLLOWING TYPES:
            </p>
            <ul className="superloot-list">
              <li>METAVERSE CRICKET TEAM PLAYERS NFT</li>
              <li>
                METAVERSE CRICKET TEAM PLAYERS NFT + <br />
                AUTHENTICATED SIGNED DIGITAL NFTs OF LEGENDS
              </li>
            </ul>

            <h3 className="superloot-total-count">
              <span>25,000</span> SUPER LOOT NFTs UP FOR GRABS!
            </h3>

            <div className="super-loot-details">
              <div className="super-loot-pack pack-block">
                {/* <div className=" pack-video-block">
                  <video
                    className="drop__pack"
                    playsInline
                    autoPlay
                    muted="mute"
                    loop
                  >
                    <source
                      src={superLootVideo}
                      type='video/mp4; codecs="hvc1"'
                    />
                    <source src={superLootVideoWebm} type="video/webm" />
                  </video>
                </div> */}
                <div className="price_block">
                  <h5>1 SUPER LOOT NFT</h5>
                  <h2>$25</h2>
                </div>
              </div>
              <div className="treasure-loot-pack pack-block">
                {/* <div className=" pack-video-block">
                  <video
                    className="drop__pack"
                    playsInline
                    autoPlay
                    muted="mute"
                    loop
                  >
                    <source src={tresureBoxVideo} type="video/mp4" />
                  </video>
                </div> */}
                <div className="price_block">
                  <h5>
                    5 SUPER LOOT NFTs <span className="plusicon">+</span>
                    <a href={"/guaranteed-gift-box"}>
                      <span className="tressure">
                        {" "}
                        <img src={tresureBoxImage} /> &nbsp; 1 FREE TREASURE BOX{" "}
                        <BsInfoCircle />
                      </span>
                    </a>
                  </h5>
                  <h2>$125</h2>
                </div>
              </div>
            </div>

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
              Add Balance to Wallet
            </button>
            {/* <PreOrder /> */}
            {/* <button
              type="button"
              className="btn waitlist preorder-btn"
              onClick={() => {
                if (user?.slug) {
                  if (
                    parseFloat(user?.balance) >=
                    parseFloat(process.env.REACT_APP_NFT_PRICE)
                  ) {
                    window.open(
                      `${process.env.REACT_APP_ACCOUNTS_URL}/accounts/pre-orders`,
                      "_self"
                    );
                  } else {
                    window.open(
                      `${process.env.REACT_APP_ACCOUNTS_URL}/accounts/wallet`,
                      "_self"
                    );
                  }
                } else {
                  window.open(
                    `${
                      process.env.REACT_APP_ACCOUNTS_URL
                    }/signin?redirect=${window.location.href.replace(
                      window.location.search,
                      ""
                    )}&fsz=${sessionStorage.getItem("fsz")}`,
                    "_self"
                  );
                }
              }}
            ></button> */}
            <button
              type="button"
              className="btn waitlist preorder-btn"
              onClick={() =>
                window.open(`${process.env.REACT_APP_JUMB_TRADE_URL}`, "_blank")
              }
            >
              Explore Collections
            </button>
          </div>
        </article>
      </section>
    </>
  );
};

export default NftCollectionVideo;
