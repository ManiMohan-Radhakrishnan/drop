import React from "react";

import { Link } from "react-router-dom";
import nftBatBit from "../../images/cric/img/nftBatBit.png";
import NFTCounter from "../nft-counter";

import "./style.scss";
const NftBatBid = ({ live = false, auction_time }) => {
  return (
    <>
      <section className="nft-bat-bid">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h2 className="secHeading">
                GET YOUR HANDS ON <br /> <span>SUPER EXCLUSIVE NFTs </span>
              </h2>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <ul className="nft-bat-bid-list">
                <li className="nft-bat-bid-items">
                  <article className="nft-bat-bid-box">
                    <div className="img-content-block">
                      <div className="img-block">
                        {/* <img src={nftBatBit} /> */}
                        <video
                          className="w-100"
                          loop
                          muted
                          autoPlay
                          playsInline
                          src={
                            "https://cdn.guardianlink.io/product-hotspot/images/WC83_IMMORTAL_1.mp4"
                          }
                        ></video>
                      </div>
                      <div className="content-block">
                        <h4>
                          The <span>1983</span>
                          <br />
                          Meta Cricket Collection
                        </h4>
                      </div>
                    </div>
                    {live && (
                      <a
                        href="/details/VAqOGlvSb3Kygw8p"
                        className="bidnow-btn waitlist"
                      >
                        Explore
                      </a>
                    )}
                  </article>
                </li>
                <li className="nft-bat-bid-items">
                  <article className="nft-bat-bid-box">
                    <div className="img-content-block">
                      <div className="img-block">
                        <video
                          className="w-100"
                          loop
                          muted
                          autoPlay
                          playsInline
                          src={
                            "https://cdn.guardianlink.io/product-hotspot/images/WC2003_IMMORTAL_2.mp4"
                          }
                        ></video>
                      </div>
                      <div className="content-block">
                        <h4>
                          The <span>2003</span>
                          <br />
                          Meta Cricket Collection
                        </h4>
                      </div>
                    </div>
                    {live && (
                      <a
                        href="/details/31ENnjQSDW3ywe0R"
                        className="bidnow-btn waitlist"
                      >
                        Explore
                      </a>
                    )}
                  </article>
                </li>
                <li className="nft-bat-bid-items">
                  <article className="nft-bat-bid-box">
                    <div className="img-content-block">
                      <div className="img-block">
                        <video
                          className="w-100"
                          loop
                          muted
                          autoPlay
                          playsInline
                          src={
                            "https://cdn.guardianlink.io/product-hotspot/images/WC2011_IMMORTAL_3.mp4"
                          }
                        ></video>
                      </div>
                      <div className="content-block">
                        <h4>
                          The <span>2011</span>
                          <br />
                          Meta Cricket Collection
                        </h4>
                      </div>
                    </div>
                    {live && (
                      <a
                        href="/details/O39gydkSlLBPYZob"
                        className="bidnow-btn waitlist"
                      >
                        Explore
                      </a>
                    )}
                  </article>
                </li>
              </ul>
            </div>
          </div>

          {!live && (
            <div className="row">
              <div className="col-12">
                <h2 className="timer-title">Auction Starts in</h2>
              </div>
              <div className="col-12 timer-counter">
                <NFTCounter time={auction_time} />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default NftBatBid;
