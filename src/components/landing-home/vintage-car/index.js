import { Link } from "react-router-dom";
import NFTCounter from "../../nft-counter";
import { IoIosTimer } from "react-icons/io";
import "./style.scss";
import { useSelector } from "react-redux";
import AddtoCalendar from "../add-to-calender";

import images from "../../../utils/images.json";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { AUCTION_STATUS } from "../../loot-box-section/common";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { Redirect } from "react-router-dom";
import { currencyFormat } from "../../../utils/common";

const VintageCar = ({
  details,
  dataReload = () => {},
  hideMenus = false,
  auctionEndTime,
  currentBid,
}) => {
  const { user } = useSelector((state) => state.user.data);
  const [eventInfo, setEventInfo] = useState({});

  const history = useHistory();

  const initEventInfo = (showToast = false) => {
    const now = new Date().getTime();
    let event_info = {};
    let statusChangeMessage = "";
    if (now < new Date(details?.order_details?.auction_start_time).getTime()) {
      event_info = {
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
      event_info = {
        title: "AUCTION ENDS IN",
        status: AUCTION_STATUS?.AUCTION,
        endAt: auctionEndTime,
        buttonTitle: "AUCTION NOW",
        buttonDisabled: false,
      };
    } else if (now >= new Date(auctionEndTime).getTime()) {
      event_info = {
        title: "AUCTION ENDED",
        // buttonTitle: "EXPLORE NOW",
        buttonDisabled: false,
      };
    }
    if (statusChangeMessage) {
      showToast && toast.info(statusChangeMessage);
    }
    setEventInfo(event_info);
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
      <section className="main-loot-section-three">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="header-block">
                <h2 className="theme-yellow-text">VINTAGE CAR AUCTION</h2>
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
                      <span className="loot-title ">ABOUT COLLECTION</span>
                    </h2>
                    <p>
                      The Vintage Dual Engine Immortal Car carries the classic
                      essence of a masterpiece with its traditional stance and
                      form, but at the same time, packs the power to sprint
                      ahead with extra surge of power to outpace rivals with its
                      dual engine instead of just one!
                    </p>
                  </div>
                  <div className="items two">
                    <div className="box-block">
                      <h6>The Vintage Car Auction contains:</h6>
                      <h4 className=" theme-yellow-text">1 Vintage Car</h4>
                      <h6 className="mini-font">(With Dual Engine)</h6>
                      <h5 className=" theme-yellow-text">
                        1 Mystery Accessory
                      </h5>
                      <h5 className=" theme-yellow-text">1 Mystery Weapon</h5>
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
                          <span>{currencyFormat(currentBid || 0, "USD")} </span>
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
                  </div> */}
                  {/* <div className="items six">
                    <div className="box-block">
                      <h6>Auction Ended On</h6>
                      {auctionEndTime && (
                        <>
                          {" "}
                          <h4>
                            {dayjs(auctionEndTime).format("DD - MMM - YYYY")}
                          </h4>
                          <h6>{`${dayjs(auctionEndTime).format(
                            "hh:mm A"
                          )}  IST`}</h6>
                        </>
                      )}
                    </div>
                  </div> */}
                </div>

                <div className="pack-section  cursor-pointer">
                  <video
                    playsInline
                    autoPlay
                    muted="mute"
                    loop
                    className="pack-image"
                    poster={images?.vintage_car}
                  >
                    <source
                      src="https://cdn.guardianlink.io/product-hotspot/videos/raddx/Vintage-car-black-layer-Feb24.mp4"
                      type='video/mp4; codecs="hvc1"'
                    />
                    <source
                      src="https://cdn.guardianlink.io/product-hotspot/videos/raddx/Vintage-car-black-layer-Feb24.webm"
                      type="video/webm"
                    />
                  </video>
                  <div className="mb-1">{eventInfo?.title}</div>

                  <div className="nft-collection-timer">
                    {eventInfo?.title !== "AUCTION ENDED" &&
                      eventInfo?.endAt && <IoIosTimer />}

                    {eventInfo?.endAt && (
                      <NFTCounter
                        time={eventInfo?.endAt}
                        timeClass="collection-timer"
                        className="theme-time"
                        handleEndEvent={() => setTimeout(initEventInfo, 500)}
                      />
                    )}
                  </div>
                  <div className="collection-btn">
                    {eventInfo?.status === AUCTION_STATUS?.YTS && (
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
          </div>
        </div>
      </section>
    </>
  );
};

export default VintageCar;
