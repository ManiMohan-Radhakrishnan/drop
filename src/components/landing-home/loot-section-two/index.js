import { BiToggleLeft } from "react-icons/bi";
import { IoIosTimer } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NFTCounter from "../../nft-counter";
import AddtoCalendar from "../add-to-calender";
import "./style.scss";
import images from "../../../utils/images.json";
import Register from "../../loot-box-section/register";
import Prebook from "../../loot-box-section/prebook-with-buy-options";
import ForgotPassword from "../../loot-box-section/forgot-password";
import VerifyOtp from "../../loot-box-section/verify-otp";
import LoginWithGoogleOtp from "../../loot-box-section/google-otp";
import LoginWithOtp from "../../loot-box-section/login-with-otp";
import LoginWithPassword from "../../loot-box-section/login-with-password";
import { LOOT_STATUS, MODAL_TYPES } from "../../loot-box-section/common";
import { useState } from "react";
import { buyButtonDisableStatus, dateFormat } from "../../../utils/common";
import { toast } from "react-toastify";
import { useEffect } from "react";
import dayjs from "dayjs";
import { lootAvailableQty } from "../../../api/actioncable-methods";
import { raddx_land_drop_action } from "../../../redux/actions/drop_action";

const LootSectionTwo = ({
  details,
  preBookStartTime,
  dataReload = () => {},
}) => {
  const { user } = useSelector((state) => state.user.data);
  const loginStatus = useSelector((state) => state.user.login);
  const [modalType, setModalType] = useState("");
  const [modalState, setModalState] = useState({});
  const dispatch = useDispatch();
  const [availQty, setAvailQty] = useState(details?.available_qty || 0);
  const [eventInfo, setEventInfo] = useState({});
  const [holdTime, setHoldTime] = useState(false);
  const [timeLeft, setTimeLeft] = useState(false);

  let calenderData = {};

  useEffect(() => {
    if (eventInfo) dispatch(raddx_land_drop_action(eventInfo?.status));
  }, [eventInfo]);

  const initEventInfo = (showToast = false) => {
    const now = new Date().getTime();
    let event_info = {
      title: "PRE-BOOK STARTS IN",
      status: LOOT_STATUS?.YTS,
      endAt: preBookStartTime,
      buttonTitle: "Pre-Book",
      buttonDisabled: true,
    };
    let statusChangeMessage = "";

    if (now < new Date(preBookStartTime).getTime()) {
      event_info = {
        title: "PRE-BOOK STARTS IN",
        status: LOOT_STATUS?.YTS,
        endAt: preBookStartTime,
        buttonTitle: "PRE-BOOK",
        buttonDisabled: true,
      };
    } else if (
      now >= new Date(preBookStartTime).getTime() &&
      now <= new Date(details?.preorder_end_time).getTime()
    ) {
      event_info = {
        title: "PRE-BOOK ENDS IN",
        status: LOOT_STATUS?.PRE_BOOK,
        endAt: details?.preorder_end_time,
        buttonTitle: "PRE-BOOK NOW",
        buttonDisabled: false,
      };
    } else if (
      parseInt(details?.available_qty) === 0
      // &&
      // now < new Date(details?.auction_end_time).getTime()
    ) {
      statusChangeMessage = "NFTs are sold out!";
      // dispatch(setCryptoBatDropLive(LOOT_STATUS?.SOLD_OUT));
      event_info = {
        // title: "SOLD OUT",
        status: LOOT_STATUS?.SOLD_OUT,
        buttonTitle: "SOLD OUT",
        buttonDisabled: true,
      };
    } else if (
      details?.auction_start_time === null ||
      details?.auction_end_time === null
    ) {
      event_info = {
        title: "DROP COMING SOON",
        status: LOOT_STATUS?.DROP_YTA,
        buttonTitle: "Buy Now",
        buttonDisabled: true,
      };
    } else if (details?.flow_status === "assign") {
      let endAt =
        now <= new Date(details?.auction_start_time).getTime()
          ? details?.auction_start_time
          : details?.auction_end_time;
      let title =
        now <= new Date(details?.auction_start_time).getTime()
          ? "DROP STARTS IN"
          : "DROP ENDS IN";
      event_info = {
        title,
        endAt,
        status: LOOT_STATUS?.ASSIGNING_NFTS,
        buttonTitle: "Assigning NFTs",
        buttonDisabled: true,
      };
    } else if (
      now > new Date(details?.preorder_end_time).getTime() &&
      now < new Date(details?.auction_start_time).getTime()
    ) {
      // dispatch(setCryptoBatDropLive(LOOT_STATUS?.DROP_YTS));
      event_info = {
        title: "DROP STARTS IN",
        status: LOOT_STATUS?.DROP_YTA,
        endAt: details?.auction_start_time,
        buttonTitle: "Buy",
        buttonDisabled: true,
      };
    } else if (
      now >= new Date(details?.auction_start_time).getTime() &&
      now < new Date(details?.auction_end_time).getTime()
    ) {
      // dispatch(setCryptoBatDropLive(LOOT_STATUS?.DROP));
      event_info = {
        title: "DROP ENDS IN",
        status: LOOT_STATUS?.DROP,
        endAt: details?.auction_end_time,
        buttonTitle: "Buy Now",
        buttonDisabled:
          details?.available_qty === 0 || details?.flow_status === "assign",
      };
    } else if (now >= new Date(details?.auction_end_time).getTime()) {
      statusChangeMessage = "Drop ended";
      // dispatch(setCryptoBatDropLive(LOOT_STATUS?.SOLD_OUT));
      event_info = {
        title: "DROP ENDED",
        status: LOOT_STATUS?.DROP_ENDED,
        // buttonTitle: "SOLD OUT",
        buttonDisabled: true,
      };
    }
    if (statusChangeMessage) {
      toggleModal();
      showToast && toast.info(statusChangeMessage);
    }
    setEventInfo(event_info);
    setAvailQty(details?.available_qty);
  };

  let quantity = null;

  useEffect(() => {
    if (details?.slug) {
      lootAvailableQty(details?.slug, (data) => {
        const now = new Date().getTime(details?.current_time);
        if (quantity && quantity != null) {
          if (!isNaN(data?.available) && data?.available < quantity) {
            setAvailQty(data?.available);
            quantity = data?.available;
          }
        } else {
          !isNaN(data?.available) && setAvailQty(data?.available);
          quantity = data?.available;
        }

        if (parseInt(data?.available) === 0) {
          setEventInfo({
            // title: "DROP ENDED",
            status: LOOT_STATUS?.SOLD_OUT,
            buttonTitle: "Sold Out",
            buttonDisabled: true,
          });
        } else {
          if (
            data?.flow_status === "buy" &&
            eventInfo?.status !== LOOT_STATUS?.DROP
          ) {
            setEventInfo({
              title: "DROP ENDS IN",
              status: LOOT_STATUS?.DROP,
              endAt: dateFormat(details?.auction_end_time),
              buttonTitle: "BUY NOW",
              buttonDisabled: !details?.available_qty,
            });
          }
          if (
            data?.flow_status === "assign" &&
            eventInfo?.status !== LOOT_STATUS?.ASSIGNING_NFTS
          ) {
            let endAt =
              now <= new Date(details?.auction_start_time).getTime()
                ? details?.auction_start_time
                : details?.auction_end_time;
            let title =
              now <= new Date(details?.auction_start_time).getTime()
                ? "DROP STARTS IN"
                : "DROP ENDS IN";
            setEventInfo({
              title,
              endAt,
              status: LOOT_STATUS?.ASSIGNING_NFTS,
              buttonTitle: "Assigning NFTs",
              buttonDisabled: true,
            });
          }
        }
      });
    }
    // lootAvailableQty(details?.slug, (data) => {
    //   if (parseInt(data?.available) === 0) {
    //     setEventInfo({
    //       title: "SOLD OUT",
    //       status: LOOT_STATUS?.SOLD_OUT,
    //       buttonTitle: "Explore",
    //       buttonDisabled: true,
    //     });
    //   }
    //   setAvailQty(data?.available);
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details?.slug]);

  const addMinutes = (date = eventInfo?.endAt) => {
    let tempDate = new Date(date);
    tempDate.setMinutes(tempDate.getMinutes() + 30);
    return dayjs(tempDate).format("hh:mm");
  };

  calenderData =
    eventInfo?.status === LOOT_STATUS?.DROP_YTA && eventInfo?.endAt
      ? {
          name: "RADDX Loot Box Drop starts now",
          startDate: dayjs(eventInfo?.endAt).format("YYYY-mm-DD"),
          startTime: dayjs(eventInfo?.endAt).format("hh:mm"),
          endTime: addMinutes(eventInfo?.endAt),
        }
      : eventInfo?.status === LOOT_STATUS?.YTS && eventInfo?.endAt
      ? {
          name: "RADDX Loot Box Pre-book starts now",
          startDate: dayjs(eventInfo?.endAt).format("YYYY-mm-DD"),
          startTime: dayjs(eventInfo?.endAt).format("hh:mm"),
          endTime: addMinutes(eventInfo?.endAt),
        }
      : {};

  const handlePreBook = () => {
    if (eventInfo?.buttonDisabled) return;
    if (loginStatus)
      toggleModal(MODAL_TYPES.PREBOOK, {
        loot: { ...details },
        loot_status: eventInfo.status,
      });
    else toggleModal(MODAL_TYPES.LOGIN_WITH_PASSWORD);
  };

  const toggleModal = (modalType = "", modalState = {}) => {
    setModalType(modalType);
    setModalState(modalState);
  };

  useEffect(() => {
    details?.slug && initEventInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

  useEffect(() => {
    if (timeLeft === 0) {
      initEventInfo();
      setTimeLeft(null);
    }

    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setEventInfo({
        ...eventInfo,
        buttonTitle: `Buy Now (${timeLeft - 1}s)`,
        buttonDisabled: true,
      });
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const buyButtonDisableCheck = () => {
    setTimeLeft(5);
  };

  return (
    <section className="main-loot-section-two">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="header-block">
              <h2 className="theme-yellow-text">DIGITAL LANDBOX</h2>
              <p>
                Each of the 1 Digital Landbox contains a single, unique,
                limited-edition digital land. Own now to ensure your
                never-before massive reach on Web3 alongside renowned global
                brands in the RADDX Metaverse.
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
                    Own Revenue-Generating Limited-Edition Digital Commercial
                    Land & Iconic Buildings In Fabled Cities. Trade Your Assets
                    & Monetize Your Land Forever. Customize With Your Own
                    Landmarks Like Shopping Complexes, Corporate Towers,
                    Skyscrapers, Charging Stations, Showrooms, Entertainment
                    Venues, Pitstops & More.
                  </p>
                  <p>
                    It All Starts With The Purchase Of The Limited-Edition
                    Digital Landbox.
                  </p>
                  <ul className="digiland-info-list">
                    <li>
                      <div className="digiland-info-block">
                        <div className="img-block">
                          <img src="https://cdn.guardianlink.io/product-hotspot/images/raddx/raddx-digitalland-host.png"></img>
                        </div>
                        <div className="content-block">
                          <h5>Host</h5>
                          <p>
                            Contests <br />
                            Events
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="digiland-info-block">
                        <div className="img-block">
                          <img src="https://cdn.guardianlink.io/product-hotspot/images/raddx/raddx-digitalland-build.png"></img>
                        </div>
                        <div className="content-block">
                          <h5>Build</h5>
                          <p>
                            Commercial Buildings <br /> Pitstops & Showrooms{" "}
                            <br />
                            Resource Generation
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="digiland-info-block">
                        <div className="img-block">
                          <img src="https://cdn.guardianlink.io/product-hotspot/images/raddx/raddx-digitalland-unknown.png"></img>
                        </div>
                        <div className="content-block">
                          <h5>Monetize</h5>
                          <p>
                            Brand Touch Points <br />
                            Advertising
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="digiland-info-block">
                        <div className="img-block">
                          <img src="https://cdn.guardianlink.io/product-hotspot/images/raddx/raddx-digitalland-trade.png"></img>
                        </div>
                        <div className="content-block">
                          <h5>Trade</h5>
                          <p>
                            Digital Lands <br />
                            Commercial Buildings
                            <br /> Enhancements & Accessories
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="digiland-info-block">
                        <div className="img-block">
                          <img src="https://cdn.guardianlink.io/product-hotspot/images/raddx/raddx-digitalland-connect.png"></img>
                        </div>
                        <div className="content-block">
                          <h5>Connect</h5>
                          <p>
                            Exclusive Owners Club <br />
                            Socialize <br />
                            Interact
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="digiland-info-block">
                        <div className="img-block">
                          <img src="https://cdn.guardianlink.io/product-hotspot/images/raddx/raddx-digitalland-rentals.png"></img>
                        </div>
                        <div className="content-block">
                          <h5>Rentals</h5>
                          <p>
                            Fractional Leasing <br />
                            Earning Expansion
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className="price-list-group">
                    <div className="price-list-box">
                      <div className="pack-price-flex">
                        <div className="pack-price-heading">
                          <h3>1 Digital Land</h3>{" "}
                        </div>
                        <div className="pack-price-amount">
                          <h4 className="mb-0">
                            ${parseInt(details?.buy_amount || 0)}&nbsp;
                          </h4>
                          {Object.keys(eventInfo).length !== 0 &&
                            eventInfo.status !== LOOT_STATUS.SOLD_OUT &&
                            eventInfo.status !== LOOT_STATUS.DROP_ENDED && (
                              <button
                                onClick={() => handlePreBook(1)}
                                className={`buy-btn ${
                                  eventInfo?.buttonDisabled && "disabled"
                                }`}
                                disabled={eventInfo?.buttonDisabled}
                              >
                                {eventInfo?.status === LOOT_STATUS?.DROP ||
                                eventInfo?.status === LOOT_STATUS?.DROP_YTA
                                  ? "BUY"
                                  : eventInfo?.status ===
                                    LOOT_STATUS?.ASSIGNING_NFTS
                                  ? "Assigning Nft"
                                  : "Pre-Book"}
                              </button>
                            )}
                          {/* <button className="buy-btn disabled">
                                Buy now
                              </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="items two">
                  <div className="box-block">
                    <h6>Every Digital LandBox contains</h6>
                    <h4>1 Digital Land</h4>
                  </div>
                </div>
                <div className="items three">
                  <div className="box-block">
                    <h6>Total Supply </h6>
                    <h4>{details?.total_quantity} Land Boxes</h4>
                  </div>
                </div>
                <div className="items four">
                  <div className="box-block">
                    <h6>Pre-book Allocation </h6>
                    <h4>400 Land Boxes</h4>
                  </div>
                </div>
                <div className="items five">
                  <div className="box-block">
                    <h6>Drop Supply </h6>
                    {eventInfo.status === LOOT_STATUS.SOLD_OUT ? (
                      <h4 className="theme-yellow-text">
                        {details?.total_quantity} Land Boxes
                        <br />
                        (Sold out)
                      </h4>
                    ) : (
                      <h4>{`${availQty} / ${details?.total_quantity || 0}`}</h4>
                    )}
                  </div>
                </div>

                <div className="items six">
                  <div className="box-block">
                    <h6>Pre-Book Ended On</h6>
                    <h4 className="cap">
                      {" "}
                      {dayjs(details?.preorder_end_time).format(
                        "DD - MMM - YYYY"
                      )}
                    </h4>
                    <h6 className="cap">
                      {dayjs(details?.preorder_end_time).format("hh:mm a")} IST
                    </h6>
                  </div>
                </div>
                <div className="items seven">
                  <div className="box-block">
                    <h6>Drop Ended on </h6>
                    <h4 className="cap">
                      {" "}
                      {dayjs(details?.auction_end_time).format(
                        "DD - MMM - YYYY"
                      )}
                    </h4>
                    <h6 className="cap">
                      {dayjs(details?.auction_end_time).format("hh:mm a")} IST
                    </h6>
                  </div>
                </div>
                {/* <div className="items six">
                  <div className="box-block">
                    <h6>Drop Start</h6>
                    <h4 className="cap">
                      {" "}
                      {dayjs(details?.auction_start_time).format(
                        "DD - MMM - YYYY"
                      )}
                    </h4>
                    <h6 className="cap">
                      {dayjs(details?.auction_start_time).format("hh:mm a")}
                    </h6>
                  </div>
                </div> */}
              </div>

              <div
                className="pack-section  cursor-pointer"
                //onClick={() => toggleMuteVideo()}
              >
                <video
                  src={images?.land_sold_out_video}
                  loop
                  muted
                  autoPlay
                  className="pack-image"
                  type="video/mp4"
                  playsInline
                  poster={images?.digital_land}
                />

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

                {/* <div className="time-show">
                  <div className="pl-3 pr-3">
                    <h4 className="mb-1">
                      {(() => {
                        if (
                          new Date(details?.preorder_start_time).getTime() >
                            new Date().getTime() &&
                          new Date(details?.preorder_og_start_time).getTime() >
                            new Date().getTime()
                        )
                          return (
                            <>
                              {" "}
                              PRE-BOOK <span>(OG Users)</span> STARTS IN
                            </>
                          );
                        else if (
                          new Date(details?.preorder_og_start_time).getTime() <
                            new Date().getTime() &&
                          new Date(details?.preorder_start_time).getTime() >
                            new Date().getTime()
                        )
                          return (
                            <>
                              PRE-BOOK <span>(OG Users)</span>
                            </>
                          );
                        else return eventInfo?.title;
                      })()}
                    </h4>
                    {eventInfo?.endAt && (
                      <div className="nft-collection-timer">
                        {new Date(details?.preorder_og_start_time).getTime() <
                          new Date().getTime() &&
                        new Date(details?.preorder_start_time).getTime() >
                          new Date().getTime() ? (
                          <>
                            {" "}
                            <span className="blink live-pill">Live Now</span>
                          </>
                        ) : (
                          <>
                            <IoIosTimer />
                            <NFTCounter
                              time={(() => {
                                if (
                                  new Date(
                                    details?.preorder_start_time
                                  ).getTime() > new Date().getTime() &&
                                  new Date(
                                    details?.preorder_og_start_time
                                  ).getTime() > new Date().getTime()
                                )
                                  return details?.preorder_og_start_time;
                                else if (
                                  new Date(
                                    details?.preorder_og_start_time
                                  ).getTime() < new Date().getTime() &&
                                  new Date(
                                    details?.preorder_start_time
                                  ).getTime() > new Date().getTime()
                                )
                                  return <></>;
                                else return eventInfo?.endAt;
                              })()}
                              timeClass="collection-timer"
                              className="theme-time"
                              handleEndEvent={() =>
                                setTimeout(initEventInfo, 500)
                              }
                            />
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {new Date(details?.preorder_start_time).getTime() >
                  new Date().getTime() ? (
                    <>
                      <div className="line"></div>
                      <div className="pl-3 pr-3">
                        <h4 className="mb-1">
                          PRE-BOOK <span>(EVERYONE)</span> STARTS IN
                        </h4>

                        <div className="nft-collection-timer">
                          <IoIosTimer />

                          <NFTCounter
                            time={details?.preorder_start_time}
                            timeClass="collection-timer"
                            className="theme-time"
                            handleEndEvent={() =>
                              setTimeout(initEventInfo, 500)
                            }
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div> */}
                <div className="time-show">
                  <div className="pl-3 pr-3">
                    {eventInfo?.title && (
                      <h4 className="mb-1">{eventInfo?.title}</h4>
                    )}
                    {eventInfo?.endAt && !holdTime && (
                      <div className="nft-collection-timer">
                        <IoIosTimer />

                        <NFTCounter
                          time={eventInfo?.endAt}
                          timeClass="collection-timer"
                          className="theme-time"
                          handleEndEvent={() => {
                            setHoldTime(true);
                            setTimeout(() => {
                              initEventInfo();
                              setHoldTime(false);
                            }, 1000);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="collection-btn">
                  {eventInfo?.status === LOOT_STATUS?.YTS ||
                  eventInfo?.status === LOOT_STATUS?.DROP_YTA ? (
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
                  ) : (
                    <></>
                  )}
                  {/* {(eventInfo?.status === LOOT_STATUS?.YTS ||
                    eventInfo?.status === LOOT_STATUS?.DROP_YTA) &&
                  calenderData ? (
                    <AddtoCalendar
                      // name="RADDX Loot Box Pre-book starts now"
                      // startDate="2023-03-09"
                      // startTime="17:00"
                      // endTime="17:05"
                      {...calenderData}
                    />
                  ) : (
                    <></>
                  )} */}
                  {eventInfo?.buttonTitle && (
                    <Link
                      className={`nav-label ${
                        eventInfo?.buttonDisabled && "disabled"
                      }`}
                      to="#"
                      onClick={handlePreBook}
                    >
                      {eventInfo?.buttonTitle}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* ref={lootStatusRef} */}
        </div>
      </div>
      {modalType === MODAL_TYPES.LOGIN_WITH_PASSWORD && (
        <LoginWithPassword
          show={modalType === MODAL_TYPES.LOGIN_WITH_PASSWORD}
          toggleModal={toggleModal}
          modalState={modalState}
        />
      )}
      {modalType === MODAL_TYPES.LOGIN_WITH_OTP && (
        <LoginWithOtp
          show={modalType === MODAL_TYPES.LOGIN_WITH_OTP}
          toggleModal={toggleModal}
          modalState={modalState}
        />
      )}
      {modalType === MODAL_TYPES.VERIFY_GOOGLE_OTP && (
        <LoginWithGoogleOtp
          show={modalType === MODAL_TYPES.VERIFY_GOOGLE_OTP}
          toggleModal={toggleModal}
          modalState={modalState}
        />
      )}
      {modalType === MODAL_TYPES.VERIFY_OTP && (
        <VerifyOtp
          show={modalType === MODAL_TYPES.VERIFY_OTP}
          toggleModal={toggleModal}
          modalState={modalState}
        />
      )}
      {modalType === MODAL_TYPES.FORGOT_PASSWORD && (
        <ForgotPassword
          show={modalType === MODAL_TYPES.FORGOT_PASSWORD}
          toggleModal={toggleModal}
          modalState={modalState}
        />
      )}
      {modalType === MODAL_TYPES.REGISTER && (
        <Register
          show={modalType === MODAL_TYPES.REGISTER}
          toggleModal={toggleModal}
          modalState={modalState}
        />
      )}
      {modalType === MODAL_TYPES.PREBOOK && (
        <Prebook
          name={"DIGITAL LANDBOX"}
          show={modalType === MODAL_TYPES.PREBOOK}
          toggleModal={toggleModal}
          onReload={() => {
            dataReload();
            buyButtonDisableStatus && buyButtonDisableCheck();
          }}
          modalState={modalState}
          slug={details?.slug}
        />
      )}
    </section>
  );
};

export default LootSectionTwo;
