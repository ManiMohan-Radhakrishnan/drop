import React from "react";
import OwlCarousel from "react-owl-carousel";

import arrowRight from "../../../images/cric/img/arrow-right.png";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import "./style.scss";

const RoadMap = () => {
  return (
    <section className="roadmap-section section_5">
      <div className="roadmap-section__inner">
        <div className="container-fluid">
          <div className="innerWrapper">
            <h2 className="sectionHeading">
              <span className="title">Roadmap</span>
              <span className="timeline">'22 '23 </span>
            </h2>
          </div>

          <div className="row mt-150">
            <div className="col-sm-12">
              <div className="roadmap-section__right">
                <div className="roadmap-section__left">
                  <div className="card_fet">
                    <span className="featureText"> Features</span>
                    <p className="clr1 feature_web">Cricket Feature</p>
                    <p className="clr2 feature_web">NFT Feature</p>
                    <p className="clr3 feature_web ">Earn Feature</p>

                    <p className="clr1 feature_mobile">
                      Cricket
                      <br /> Feature
                    </p>
                    <p className="clr2 feature_mobile">
                      NFT <br /> Feature
                    </p>
                    <p className="clr3 feature_mobile">
                      Earn <br />
                      Feature
                    </p>
                  </div>
                </div>

                <OwlCarousel
                  className="owl-theme"
                  loop
                  margin={30}
                  nav
                  smartSpeed={500}
                  // autoplayHoverPause={true}
                  // autoplay
                  dots={false}
                  navContainerClass={"carousel-btn-block"}
                  // autoplayTimeout={6000}
                  navText={[
                    `<span class="icon-right-arrow left"><img src=${arrowRight} /></span>`,
                    `<span class="icon-right-arrow right"><img src=${arrowRight} /></span>`,
                  ]}
                  responsive={{
                    0: {
                      items: 1,
                    },
                    768: {
                      items: 2,
                    },
                    800: {
                      items: 2,
                    },
                    1024: {
                      items: 2,
                    },
                    1200: {
                      items: 3,
                    },
                    1541: {
                      items: 3,
                    },
                  }}
                >
                  <div className="roadmap-section__single gradient-box">
                    <div className="card_content">
                      <div className="card_content-header">
                        <h6 className="subTitle mt-0 gradient-one">
                          {/* <span className="first">Cricket</span>{" "} */}
                          <span className="second">Drop</span>
                        </h6>

                        <h3 className="subcard_head">
                          <span className="first">Q1 '22</span>{" "}
                          <span className="second">APR</span>
                        </h3>
                      </div>
                      <div className="card_fet">
                        <p className="clr1">
                          Game Design
                          <br /> &amp; Development
                        </p>
                        <p className="clr2">
                          NFT Loot Box <br />
                          Drop
                        </p>
                        <p className="clr3">
                          Game Economy <br />
                          Design
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="roadmap-section__single gradient-box">
                    <div className="card_content">
                      <div className="card_content-header">
                        <h6 className="subTitle mt-0 gradient-one">
                          <span className="first">Marketplace</span>{" "}
                          <span className="second">Launch</span>
                        </h6>

                        <h3 className="subcard_head">
                          <span className="first">Q1 '22</span>{" "}
                          <span className="second">
                            APR
                            <br />
                            MAY
                            <br />
                            JUN
                          </span>
                        </h3>
                      </div>

                      <div className="card_fet">
                        <p className="clr1">Marketplace Launch</p>
                        <p className="clr2">NFT Trading</p>
                        <p className="clr3">Whitepaper Launch</p>
                      </div>
                    </div>
                  </div>

                  <div className="roadmap-section__single gradient-box">
                    <div className="card_content">
                      <div className="card_content-header">
                        <h6 className="subTitle mt-0 gradient-one">
                          <span className="first">NFT Cricket</span>{" "}
                          <span className="second">Game Launch</span>
                        </h6>

                        <h3 className="subcard_head">
                          <span className="first">Q2 '22</span>{" "}
                          <span className="second">
                            JUL
                            <br />
                            AUG
                            <br />
                            SEP
                          </span>
                        </h3>
                      </div>
                      <div className="card_fet">
                        <p className="clr1">
                          Web3 Game Launch &amp; <br />
                          NFT Real Estate Drop
                        </p>
                        <p className="clr2">
                          Win Big with NFT Cricket Players &amp; <br />
                          Own Metaverse Stadiums
                        </p>
                        <p className="clr3">Collect, Trade, Earn</p>
                      </div>
                    </div>
                  </div>
                  <div className="roadmap-section__single gradient-box">
                    <div className="card_content">
                      <div className="card_content-header">
                        <h6 className="subTitle mt-0 gradient-one">
                          <span className="first">Token Allocation for</span>{" "}
                          <span className="second">OG collectors</span>
                        </h6>

                        <h3 className="subcard_head">
                          <span className="first">Q3 '22</span>{" "}
                          <span className="second">
                            OCT
                            <br />
                            NOV
                            <br />
                            DEC
                          </span>
                        </h3>
                      </div>

                      <div className="card_fet">
                        <p className="clr1">
                          Become A Web3 <br />
                          Cricket Legend
                        </p>
                        <p className="clr2">
                          Token Allocation for <br />
                          OG collectors
                        </p>
                        <p className="clr3">
                          Boost Your Performance
                          <br /> using other NFT Cards
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="roadmap-section__single gradient-box">
                    <div className="card_content">
                      <div className="card_content-header">
                        <h6 className="subTitle mt-0 gradient-one">
                          <span className="first">Metaverse</span>{" "}
                          <span className="second">Esports</span>
                        </h6>

                        <h3 className="subcard_head">
                          <span className="first">Q4 '23</span>{" "}
                          <span className="second">
                            JAN
                            <br />
                            FEB
                            <br />
                            MAR
                          </span>
                        </h3>
                      </div>
                      <div className="card_fet">
                        <p className="clr1">
                          Challenge Opponent <br />
                          Esports Teams in Real-time
                        </p>
                        <p className="clr2">
                          Build your <br />
                          DAO Sports Team
                        </p>
                        <p className="clr3">
                          Take part in auction &amp; play for <br />
                          DAO Esports Team
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="roadmap-section__single gradient-box">
                    <div className="card_content">
                      <div className="card_content-header">
                        <h6 className="subTitle mt-0 gradient-one">
                          <span className="first">Metaverse Cricket</span>{" "}
                          <span className="second">World Cup</span>
                        </h6>

                        <h3 className="subcard_head">
                          <span className="first">Q1 '23</span>{" "}
                          <span className="second">
                            APR
                            <br />
                            MAY
                            <br />
                            JUN
                          </span>
                        </h3>
                      </div>

                      <div className="card_fet">
                        <p className="clr1">
                          Run &amp; Stream <br />
                          Cricket Tournament
                        </p>
                        <p className="clr2">
                          Participate In Metaverse <br />
                          Cricket World Cup
                        </p>
                        <p className="clr3">
                          Web3 <br />
                          Seasonal Rewards{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </OwlCarousel>
              </div>
            </div>
          </div>
        </div>

        <div className="owl-theme">
          <div className="owl-controls">
            <div className="custom-nav owl-nav"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadMap;
