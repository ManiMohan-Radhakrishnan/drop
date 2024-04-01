import { Link } from "react-router-dom";
import NFTCounter from "../../nft-counter";
import { IoIosTimer } from "react-icons/io";
import "./style.scss";
import { useSelector } from "react-redux";
import AddtoCalendar from "../add-to-calender";
import images from "../../../utils/images.json";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { AUCTION_STATUS } from "../../loot-box-section/common";
import { toast } from "react-toastify";
import { currencyFormat } from "../../../utils/common";
import dayjs from "dayjs";

const BattleCar = ({ details, currentBid, auctionEndTime }) => {
  const { user } = useSelector((state) => state.user.data);
  const [battleCarInfo, setBattleCarInfo] = useState({});

  const history = useHistory();

  const initEventInfo = (showToast = false) => {
    const now = new Date().getTime();
    let battleCar_info = {};
    let statusChangeMessage = "";
    if (now < new Date(details?.order_details?.auction_start_time).getTime()) {
      battleCar_info = {
        title: "AUCTION STARTS IN",
        status: AUCTION_STATUS?.YTS,
        endAt: details?.order_details?.auction_start_time,
        buttonTitle: "EXPLORE NOW",
        buttonDisabled: false,
      };
    } else if (
      now >= new Date(details?.order_details?.auction_start_time).getTime() &&
      now <= new Date(auctionEndTime).getTime()
    ) {
      battleCar_info = {
        title: "AUCTION ENDS IN",
        status: AUCTION_STATUS?.AUCTION,
        endAt: auctionEndTime,
        buttonTitle: "AUCTION NOW",
        buttonDisabled: false,
      };
    } else if (now >= new Date(auctionEndTime).getTime()) {
      battleCar_info = {
        title: "AUCTION ENDED",
        // buttonTitle: "EXPLORE NOW",
        buttonDisabled: false,
      };
    }
    if (statusChangeMessage) {
      showToast && toast.info(statusChangeMessage);
    }
    setBattleCarInfo(battleCar_info);
  };
  const handleEventInfo = () => {
    initEventInfo();
  };

  useEffect(() => {
    details?.slug && handleEventInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details, auctionEndTime]);

  const handleClick = () => {
    history.push(`/details/${details?.slug}`);
  };

  return (
    <>
      <section className="main-loot-section-five">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="header-block">
                <h2 className="theme-yellow-text">BATTLE CAR AUCTION</h2>
                <p>
                  Your Headstart Into The RADDX Racing Metaverse With Immortal
                  Supercars!
                </p>
                <p>
                  The RADDX Auctions bring you the best-of-the-best cars to your
                  garage, along with special accessories and super-aggressive
                  weapons to torch the tracks and taunt your opponents... all
                  while having the edge in your performance, giving you the edge
                  to overtake your opponents!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="loot-block">
                <div className="loot-section">
                  <div className="items one">
                    <h2>
                      <span className="loot-title">ABOUT COLLECTION</span>
                    </h2>
                    <p>
                      The AMazinG Battle Car, equipped with an arsenal of deadly
                      weapons and damage-blocking armors, unleashes the beast on
                      the RADDX racing battleground in fight and performance, to
                      take on your opponents and overpower cops.
                    </p>
                  </div>
                  <div className="items two">
                    <div className="box-block">
                      <h6>The Battle Car Auction contains:</h6>
                      <h4 className="mt-1 theme-yellow-text">1 Battle Car </h4>
                      <h6 className="mini-font">
                        (Loaded with Weapons & Armors)
                      </h6>
                      <h5 className="theme-yellow-text">
                        1 Mystery Accessory{" "}
                      </h5>
                      <h5 className="theme-yellow-text">1 Mystery Weapon </h5>
                      <h6 className="mini-font">
                        (Weapons & Accessories are separate NFTs)
                      </h6>
                    </div>
                  </div>

                  <div className="items three">
                    <div className="box-block">
                      <h6>Current Bid Price</h6>
                      <h4>
                        {currentBid ? (
                          <span>{currencyFormat(currentBid || 0, "USD")}</span>
                        ) : (
                          "-"
                        )}
                      </h4>
                    </div>
                  </div>
                  <div className="items four">
                    <div className="box-block">
                      <h6>Minimum Bid Price </h6>
                      <h4>
                        {details?.order_details?.starting_bid ? (
                          <span>
                            {currencyFormat(
                              details?.order_details?.starting_bid || 0,
                              "USD"
                            )}
                          </span>
                        ) : (
                          "-"
                        )}
                      </h4>
                    </div>
                  </div>
                  {/* <div className="items five">
                    <div className="box-block">
                      <h6>Auction Starts On</h6>
                      <h4>
                        {dayjs(
                          details?.order_details?.auction_start_time
                        ).format("DD - MMM - YYYY")}
                      </h4>
                      <h6>
                        {`${dayjs(
                          details?.order_details?.auction_start_time
                        ).format("hh:mm  A")}  IST`}
                      </h6>
                    </div>
                  </div>
                  <div className="items six">
                    <div className="box-block">
                      <h4>
                        <h6>Auction Ended On</h6>
                        {auctionEndTime && (
                          <>
                            <h4>
                              {dayjs(auctionEndTime).format("DD - MMM - YYYY")}
                            </h4>
                            <h6>
                              {`${dayjs(auctionEndTime).format(
                                "hh:mm  A"
                              )}  IST`}
                            </h6>
                          </>
                        )}
                      </h4>
                    </div>
                  </div> */}
                </div>

                <div
                  className="pack-section  cursor-pointer"
                  //onClick={() => toggleMuteVideo()}
                >
                  {/* <img
                    className="pack-image"
                    loop
                    src={images?.raddx_battle_car}
                  ></img> */}
                  {/* <div className="pack-video-block">
                    <video
                      playsInline
                      autoPlay
                      muted="mute"
                      loop
                      poster={images?.raddx_battle_car}
                      className="pack-image"
                    >
                      <source
                        src="https://cdn.guardianlink.io/product-hotspot/videos/raddx/Battle-Car-video.mp4"
                        type='video/mp4; codecs="hvc1"'
                      />
                      <source
                        src="https://cdn.guardianlink.io/product-hotspot/videos/raddx/Battle-Car-video.webm"
                        type="video/webm"
                      />
                    </video>
                  </div> */}
                  <video
                    playsInline
                    autoPlay
                    muted="mute"
                    loop
                    poster={images?.raddx_battle_car}
                    className="pack-image"
                  >
                    <source
                      src="https://cdn.guardianlink.io/product-hotspot/videos/raddx/Battle-car-black-layer-Feb24.mp4"
                      type='video/mp4; codecs="hvc1"'
                    />
                    <source
                      src="https://cdn.guardianlink.io/product-hotspot/videos/raddx/Battle-car-black-layer-Feb24.webm"
                      type="video/webm"
                    />
                  </video>
                  <div className="mb-1">{battleCarInfo?.title}</div>

                  <div className="tap_play">
                    <button className="tap_play_btn">
                      {/* {mutedVideo === true ? (
                    <>
                      <GoMute /> Tap to Unmute
                    </>
                  ) : (
                    <>
                      <GoUnmute /> Tap to Mute
                    </>
                  )} */}
                    </button>
                  </div>
                  <div className="nft-collection-timer">
                    {battleCarInfo?.title !== "AUCTION ENDED" &&
                      battleCarInfo?.endAt && <IoIosTimer />}

                    {battleCarInfo?.endAt && (
                      <NFTCounter
                        time={battleCarInfo?.endAt}
                        timeClass="collection-timer"
                        className="theme-time"
                        handleEndEvent={() => setTimeout(initEventInfo, 500)}
                      />
                    )}
                  </div>
                  <div className="collection-btn">
                    {battleCarInfo?.status === AUCTION_STATUS?.YTS && (
                      <Link
                        className="nav-label"
                        to="#"
                        onClick={() => {
                          if (user?.slug) {
                            window.open(
                              `${process.env.REACT_APP_ACCOUNTS_URL}/accounts/wallet#web`,
                              "_self"
                            );
                          } else {
                            window.open(
                              `${
                                process.env.REACT_APP_ACCOUNTS_URL
                              }/signup?fsz=${sessionStorage.getItem("fsz")}`,
                              "_self"
                            );
                          }
                        }}
                      >
                        Fund Your Wallet
                      </Link>
                    )}

                    <Link
                      className="nav-label disabled"
                      to="#"
                      onClick={handleClick}
                    >
                      AUCTION ENDED
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* ref={lootStatusRef} */}
          </div>
        </div>
      </section>
    </>
  );
};

export default BattleCar;
