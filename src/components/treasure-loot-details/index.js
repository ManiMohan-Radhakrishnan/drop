import React, { useState, useRef } from "react";
import "./style.scss";
import useWindowUtils from "../../hook/useWindowUtils";

const TreasureLootDetails = ({ started = true }) => {
  const r_email = useRef(null);
  const width = useWindowUtils();
  return (
    <>
      <div className="new_drop_wrapper">
        <section className="loot_explanation">
          <div className="container">
            {/* <img
              alt=""
              src={
                width < 425
                  ? "https://cdn.guardianlink.io/product-hotspot/images/Spin-the-Banner-Desktop_new.jpg"
                  : "https://cdn.guardianlink.io/product-hotspot/images/Spin-the-Banner-Desktop_new.jpg"
              }
            /> */}
            <div className="row">
              <div className="col-md-12">
                {/* <div className="page_title">
                  <h1>THE MEGA TREASURE BOX</h1>
                </div> */}
                <div className="quote_box">
                  <h3 className="desc">
                    Keeping Up With The Legacy & And Our Promise, Along with The
                    RADDX Metaverse NFTs Drops We're Bringing You The GUARANTEED
                    GIFT BOX - <span> The Mother of All Goodness!</span>
                  </h3>
                  <h4>THE GUARANTEED GIFT BOX</h4>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 loot_info_section">
                <div className="loot_info">
                  <h4>WHEN?</h4>
                  <p>
                    On{" "}
                    <span className="theme-yellow-text"> 28th April 2023 </span>{" "}
                    The Hunt For The GUARANTEED GIFT BOX Begins.
                  </p>
                  <p>
                    EVERYONE WHO HOLDS 5 OR MORE LOOT BOXES WILL GAIN INSTANT
                    ACCESS TO THE INCREDIBLY SUPREME, ONE-OF-A-KIND GUARANTEED
                    GIFT BOX PACKING REWARDS WORTH{" "}
                    <span className="theme-yellow-text">
                      {/* INR 2 Crore ( ≈ USD 241,708 ) */}≈ INR 1.03 Crore ( ≈
                      USD 126,014 )
                    </span>
                  </p>
                  {/* <p>
                    OF THIS AMOUNT, $2,992 (≈ INR 2,26,000) IS THE UNCLAIMED
                    REWARD BALANCE FROM OUR LAST TREASURE BOX FROM STAN LEE'S
                    CHAKRA THE INVINCIBLE NFT DROP.
                  </p> */}
                </div>
                <div className="loot_info">
                  <h4>WHAT'S IN EVERY GUARANTEED GIFT BOX?</h4>
                  <p>
                    We're giving away{" "}
                    <span className="theme-yellow-text">
                      {/* INR 2 Crore ( ≈ USD 241,708 ) */}≈ INR 1.03 Crore ( ≈
                      USD 126,014 )
                    </span>{" "}
                    of GUARANTEED REWARDS through the GUARANTEED GIFT BOXES.
                  </p>
                </div>
                {/* <div className="loot_info">
                  <h4>WHAT?</h4>
                  <p>
                    Mark Your Buzzers for the Treasure Box to open only after
                    the end of the entire auction and the completion of sale of
                    all of Jump.trade "Chakra the Invincible NFT Collection!"
                  </p>
                </div> */}
                {/* <div className="loot_info">
                  <h4>WHAT IS IN THE SUPREME "TREASURE BOX" ?</h4>
                  <p>
                    Here's the hint for all of you - $50,000 ( ≈ INR 3,500,000 )
                    !
                  </p>
                </div> */}
              </div>
            </div>
            <div className="row gift_details">
              <div className="col-md-6">
                <div className="gift_info">
                  <h2 className="theme-yellow-text">
                    NFTS, GADGETS, VEHICLES, COINS... & MUCH MORE!
                  </h2>
                  <ul>
                    {/* <li>BAYC NFT FAMILY (YUGA Labs)</li> */}
                    <li>BITCOIN </li>
                    <li>MAHINDRA THAR CAR</li>
                    <li>ROYAL ENFIELD HUNTER 350 </li>
                    <li>ETHEREUM </li>
                    <li>TESLA SHARES</li>
                    <li>MACBOOK AIR </li>
                    <li>LENOVO IDEAPAD</li>
                    <li>APPLE 2022 10.9-INCH IPAD (WI-FI, 64GB)</li>
                    <li>ONEPLUS 138 CM (55 INCHES) Y SERIES</li>
                    <li>BINANCE COIN </li>
                    <li> APPLE AIRPODS (3RD GENERATION)</li>
                    <li>GAMING CONSOLE</li>
                    <li>SAMSUNG GALAXY M13 </li>
                    <li>BOAT AAVANTE BAR</li>
                    <li>PROCUS PRO (BLACK) </li>
                    <li>BOAT ROCKERZ 550 BLUETOOTH </li>
                    <li>NOISE COLORFIT PULSE GRAND SMART WATCH </li>
                    <li>MATIC </li>
                    <li>DOGE COIN</li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="gift_im_1">
                  {/* <video
                    playsInline
                    loop
                    muted
                    autoPlay
                    src="https://cdn.beyondlife.club/media/mail/treasure_video.mp4"></video> */}
                  <img
                    alt=""
                    src="https://cdn.guardianlink.io/product-hotspot/images/raddx/Raddx-Treasure-box.jpg"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="total_gift">
                  <h3>TOTAL PRIZE VALUE</h3>
                  {/* <p>INR 2 CRORE ( ≈ USD 241,708 )</p> */}
                  <p> ≈ INR 1.03 Crore ( ≈ USD 126,014 )</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="row justify-content-start">
                  {/* <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="contest-card">
                      <img
                        alt=""
                        src={
                          "https://cdn.guardianlink.io/product-hotspot/images/raddx/RaddxDropPrize-BAYC-Feb22.jpg"
                        }
                      />
                    </div>
                  </div> */}
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="contest-card">
                      <img
                        alt=""
                        src={
                          "https://cdn.guardianlink.io/product-hotspot/images/raddx/RaddxDropPrize-Bitcoin.jpg"
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="contest-card">
                      <img
                        alt=""
                        src={
                          "https://cdn.guardianlink.io/product-hotspot/images/raddx/RaddxDropPrize-Thar.jpg"
                        }
                      />
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="contest-card">
                      <img
                        alt=""
                        src={
                          "https://cdn.guardianlink.io/product-hotspot/images/raddx/RaddxDropPrize-REHunter350.jpg"
                        }
                      />
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="contest-card">
                      <img
                        alt=""
                        src={
                          "https://cdn.guardianlink.io/product-hotspot/images/raddx/RaddxDropPrize-Eth.jpg"
                        }
                      />
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="contest-card">
                      <img
                        alt=""
                        src={
                          "https://cdn.guardianlink.io/product-hotspot/images/raddx/RaddxDropPrize-Teslashare.jpg"
                        }
                      />
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="contest-card">
                      <img
                        alt=""
                        src={
                          "https://cdn.guardianlink.io/product-hotspot/images/raddx/RaddxDropPrize-Macbookair.jpg"
                        }
                      />
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="contest-card">
                      <img
                        alt=""
                        src={
                          "https://cdn.guardianlink.io/product-hotspot/images/raddx/RaddxDropPrize-LenoveIdeaPad.jpg"
                        }
                      />
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="contest-card">
                      <img
                        alt=""
                        src={
                          "https://cdn.guardianlink.io/product-hotspot/images/raddx/RaddxDropPrize-AppleiPad.jpg"
                        }
                      />
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="contest-card">
                      <img
                        alt=""
                        src={
                          "https://cdn.guardianlink.io/product-hotspot/images/raddx/RaddxDropPrize-OneplusTV.jpg"
                        }
                      />
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="contest-card">
                      <img
                        alt=""
                        src={
                          "https://cdn.guardianlink.io/product-hotspot/images/raddx/RaddxDropPrize-BinanceCoin.jpg"
                        }
                      />
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="contest-card">
                      <img
                        alt=""
                        src={
                          "https://cdn.guardianlink.io/product-hotspot/images/raddx/RaddxDropPrize-Appleairpods.jpg"
                        }
                      />
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="contest-card">
                      <img
                        alt=""
                        src={
                          "https://cdn.guardianlink.io/product-hotspot/images/raddx/RaddxDropPrize-GamingConsole.jpg"
                        }
                      />
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="contest-card">
                      <img
                        alt=""
                        src={
                          "https://cdn.guardianlink.io/product-hotspot/images/raddx/RaddxDropPrize-GalaxyM13.jpg"
                        }
                      />
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="contest-card">
                      <img
                        alt=""
                        src={
                          "https://cdn.guardianlink.io/product-hotspot/images/raddx/RaddxDropPrize-boatAAvantebar1198.jpg"
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="contest-card">
                      <img
                        alt=""
                        src={
                          "https://cdn.guardianlink.io/product-hotspot/images/raddx/RaddxDropPrize-ProcusPro.jpg"
                        }
                      />
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="contest-card">
                      <img
                        alt=""
                        src={
                          "https://cdn.guardianlink.io/product-hotspot/images/raddx/RaddxDropPrize-BoatRockerz550.jpg"
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="contest-card">
                      <img
                        alt=""
                        src={
                          "https://cdn.guardianlink.io/product-hotspot/images/raddx/RaddxDropPrize-NoiseColorFitPulse-optimized.jpg"
                        }
                      />
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="contest-card">
                      <img
                        alt=""
                        src={
                          "https://cdn.guardianlink.io/product-hotspot/images/raddx/RaddxDropPrize-Matic-Feb22.jpg"
                        }
                      />
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="contest-card">
                      <img
                        alt=""
                        src={
                          "https://cdn.guardianlink.io/product-hotspot/images/raddx/RaddxDropPrize-Doge-Feb22.jpg"
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 loot_info_section">
                <div className="loot_info">
                  <h4>HOW TO GET ONE (OR MORE)?</h4>
                  <p>
                    It's simple, for every 5 LOOT BOXES you hold, you will
                    receive 1 GUARANTEED GIFT BOX, for FREE!.
                  </p>
                  <p>
                    For example, if you hold 10 LOOT BOXES, you will get 2
                    GUARANTEED GIFT BOXES! Similarly, if you hold 20 LOOT BOXES
                    , you will get 4 GUARANTEED GIFT BOX!! So the more you hold,
                    the more GUARANTEED GIFT BOXES you can UNLOCK!
                  </p>
                  <p>
                    What's more, each GUARANTEED GIFT BOX gives you an ASSURED
                    REWARD, so what are you waiting for?{" "}
                    <a
                      onClick={() =>
                        window.open(
                          `${process.env.REACT_APP_ACCOUNTS_URL}/accounts/wallet`,
                          "_self"
                        )
                      }
                      // href={`${process.env.REACT_APP_ACCOUNTS_URL}/accounts/wallet`}
                    >
                      Fund your wallet now!
                    </a>
                  </p>
                </div>
                <div className="loot_info">
                  <h4>WHAT?</h4>
                  <p>
                    Mark Your Calendars for the GUARANTEED GIFT BOX, as they
                    open only after the end of the entire auction and the
                    completion of sale of all of the LOOT NFT Collection!
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="gift_alert">
                  <h5>
                    Wait and watch what chance brings you! <br />
                    Go hunt for and gain the super fortune starting{" "}
                    <span className="theme-yellow-text">28 April 2023!</span>
                  </h5>
                  <h3>
                    OWN <span className="theme-yellow-text">5 LOOT BOXES</span>{" "}
                    TO GET ACCESS TO YOUR{" "}
                    <span className="theme-yellow-text">
                      GUARANTEED GIFT BOX!!
                    </span>{" "}
                  </h3>
                  <h3>REVEL IN THE POWER OF YOUR FORTUNE, HUNT FOR $$$</h3>

                  <a
                    className="waitlist"
                    href={`${process.env.REACT_APP_ACCOUNTS_URL}/accounts/wallet`}
                  >
                    Fund Your Wallet Now!{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TreasureLootDetails;
