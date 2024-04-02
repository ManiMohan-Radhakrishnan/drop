import { Link } from "react-router-dom";
import NFTCounter from "../../nft-counter";
import ToolTip from "../../tooltip/index";
import {
  BsArrowRight,
  BsFillCalendarPlusFill,
  BsFillQuestionCircleFill,
  BsInfoCircle,
} from "react-icons/bs";
import { IoIosTimer } from "react-icons/io";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { HiInformationCircle } from "react-icons/hi";
import { AiFillInfoCircle } from "react-icons/ai";
import AddtoCalendar from "../add-to-calender";

import images from "../../../utils/images.json";
import { useState } from "react";
import { LOOT_STATUS, MODAL_TYPES } from "../../loot-box-section/common";
import { toast } from "react-toastify";
import { buyButtonDisableStatus, dateFormat } from "../../../utils/common";
import { useEffect } from "react";
import LoginWithPassword from "../../loot-box-section/login-with-password";
import LoginWithOtp from "../../loot-box-section/login-with-otp";
import LoginWithGoogleOtp from "../../loot-box-section/google-otp";
import VerifyOtp from "../../loot-box-section/verify-otp";
import ForgotPassword from "../../loot-box-section/forgot-password";
import Register from "../../loot-box-section/register";
import Prebook from "../../loot-box-section/prebook-with-buy-options";
import dayjs from "dayjs";
import { lootAvailableQty } from "../../../api/actioncable-methods";
import { raddx_loot_drop_action } from "../../../redux/actions/drop_action";

const LootSectionOne = ({
  details,
  preBookStartTime,
  dataReload = () => {},
  hideMenus = false,
}) => {
  const { user } = useSelector((state) => state.user.data);
  const loginStatus = useSelector((state) => state.user.login);
  const [modalType, setModalType] = useState("");
  const [modalState, setModalState] = useState({});
  // const loginStatus = useSelector(isUserLoggedIn);
  const [availQty, setAvailQty] = useState(details?.available_qty || 0);
  const [eventInfo, setEventInfo] = useState({});
  const [nftQuantity, setNftQuantity] = useState(1);
  const [holdTime, setHoldTime] = useState(false);
  let calenderData = {};
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(false);

  useEffect(() => {
    if (eventInfo) dispatch(raddx_loot_drop_action(eventInfo?.status));
  }, [eventInfo]);

  const initEventInfo = (showToast = false) => {
    const now = new Date().getTime();
    let event_info = {
      // title: "PRE-BOOK STARTS IN",
      // // status: LOOT_STATUS?.PRE_BOOK,
      // endAt: dateFormat(preBookStartTime),
      // buttonTitle: "Pre-Book",
      // buttonDisabled: true,
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
      now < new Date(details?.auction_end_time).getTime() &&
      details?.flow_status === "buy"
    ) {
      // dispatch(setCryptoBatDropLive(LOOT_STATUS?.DROP));
      event_info = {
        title: "DROP ENDS IN",
        status: LOOT_STATUS?.DROP,
        endAt: details?.auction_end_time,
        buttonTitle: "Buy Now",
        buttonDisabled: details?.available_qty === 0,
      };
    } else if (now >= new Date(details?.auction_end_time).getTime()) {
      statusChangeMessage = "Drop ended";
      // dispatch(setCryptoBatDropLive(LOOT_STATUS?.SOLD_OUT));
      event_info = {
        title: "DROP ENDED",
        status: LOOT_STATUS?.DROP_ENDED,
        // buttonTitle: "Drop Ended",
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

  const handlePreBook = (quantity = 1) => {
    if (eventInfo?.buttonDisabled) return;
    if (loginStatus) {
      setNftQuantity(quantity);
      toggleModal(MODAL_TYPES.PREBOOK, {
        loot: { ...details },
        loot_status: eventInfo.status,
      });
    } else toggleModal(MODAL_TYPES.LOGIN_WITH_PASSWORD);
  };

  const toggleModal = (modalType = "", modalState = {}) => {
    setModalType(modalType);
    setModalState(modalState);
  };

  useEffect(() => {
    details?.slug && initEventInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

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
            // title: "SOLD OUT",
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
    <>
      <section className="main-loot-section-one">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="header-block">
                <h2 className="theme-yellow-text">RADDX LOOT BOX</h2>
                <p>
                  The RADDX Loot Box Gives You Access To Own
                  <span className="theme-yellow-text">
                    {" "}
                    Immortal Cars, Legendary Cars, Dual Engine Cars and Other
                    Sports Cars
                  </span>{" "}
                  With Pride!
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
                      Every RADDX Car NFT is playable, upgradeable, and
                      tradable! Challenge other users in thrilling races, events
                      and tournaments for an immersive and holistic Metaverse
                      experience! Grab the RADDX Loot Box to own yours today!
                    </p>
                    <div className="raddax-car-list-box">
                      <ul className="raddax-car-list">
                        <li>Immortal Cars</li>
                        <li>Superhero Cars</li>
                        <li> Fighter Cars </li>
                        <li>Superstar Italian Cars</li>
                        <li>Ghost Cars</li>
                      </ul>
                      <ul className="raddax-car-list">
                        <li>Habibi Cars</li>
                        <li>F & F Cars</li>
                        <li>Legendary Cars</li>
                        <li>Dual Engine Cars</li>
                        <li>Tuner Cars</li>
                      </ul>
                    </div>
                  </div>
                  {/* <div className="items two">
                    <div className="box-block">
                      <h6>Every RADDX Loot Box Contains</h6>
                      <p className="loot-desc">2 RADDX Car NFT</p>
                    </div>
                  </div> */}
                  <div className="items three">
                    <div className="box-block">
                      <h6 className="mini-font">
                        Every RADDX Loot Box contains
                      </h6>
                      <h4 className="loot-desc mt-1 ">2 RADDX Car NFTs</h4>
                      <div className="price-list-group">
                        <div className="price-list-box">
                          <div className="pack-price-flex">
                            <div className="pack-price-heading">
                              <h3>1 RADDX Loot Box</h3>{" "}
                            </div>
                            <div className="pack-price-amount">
                              <h4>${parseInt(details?.buy_amount) || 0}</h4>
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
                                      ? "Assigning Nfts"
                                      : "Pre-Book"}
                                  </button>
                                )}
                            </div>
                          </div>
                        </div>
                        <div className="price-list-box">
                          <div className="pack-price-flex">
                            <div className="pack-price-heading">
                              <h3>5 RADDX Loot Box</h3> <span>+</span>
                              <span>
                                {" "}
                                <a
                                  className="elite-box gift-box "
                                  onClick={() => {
                                    window.open(
                                      !hideMenus
                                        ? `${process.env.REACT_APP_PUBLIC_URL}/guaranteed-gift-box`
                                        : `${process.env.REACT_APP_PUBLIC_URL}/guaranteed-gift-box?hideMenus=true`,
                                      "_self"
                                    );
                                  }}
                                >
                                  1 Free GUARANTEED GIFT BOX
                                  {"  "}
                                </a>
                                <SharePopover
                                  icon={
                                    <HiInformationCircle
                                      size={20}
                                      className="ms-2 question-icon"
                                    />
                                  }
                                  placement="top"
                                  hideMenus={hideMenus}
                                  // title="Jump.trade Loot Box!"
                                />
                              </span>
                              <i>
                                For every 5 LOOT BOXES you buy, you get one
                                Guaranteed Gift Box.
                              </i>
                              <a
                                role="button"
                                onClick={() => {
                                  window.open(
                                    !hideMenus
                                      ? `${process.env.REACT_APP_PUBLIC_URL}/guaranteed-gift-box`
                                      : `${process.env.REACT_APP_PUBLIC_URL}/guaranteed-gift-box?hideMenus=true`,
                                    "_self"
                                  );
                                }}
                                className="more-btn"
                              >
                                {" "}
                                For More Details <BsArrowRight />{" "}
                              </a>
                            </div>
                            <div className="pack-price-amount">
                              <h4>
                                <s>$125</s>$
                                {parseInt(details?.preorder_offer_price) || "0"}
                              </h4>
                              {Object.keys(eventInfo).length !== 0 &&
                                eventInfo.status !== LOOT_STATUS.SOLD_OUT &&
                                eventInfo.status !== LOOT_STATUS.DROP_ENDED && (
                                  <button
                                    onClick={() => handlePreBook(5)}
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
                                      ? "Assigning Nfts"
                                      : "Pre-Book"}
                                  </button>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="items five">
                    <div className="box-block">
                      <h6>Total Supply </h6>
                      <h4>{details?.total_quantity} Boxes</h4>
                    </div>
                  </div>
                  <div className="items six">
                    <div className="box-block">
                      <h6>Pre-book Allocation </h6>
                      <h4>13000 Boxes</h4>
                    </div>
                  </div>
                  <div className="items seven">
                    <div className="box-block">
                      <h6>Drop Supply </h6>
                      {eventInfo.status === LOOT_STATUS.SOLD_OUT ? (
                        <h4 className="theme-yellow-text">
                          {details?.total_quantity} Loot Boxes
                          <br />
                          (Sold out)
                        </h4>
                      ) : (
                        <h4>{`${availQty} / ${
                          details?.total_quantity || 0
                        }`}</h4>
                      )}
                    </div>
                  </div>

                  <div className="items eight">
                    <div className="box-block">
                      <h6>Pre-Book Ended On</h6>
                      <h4 className="cap">
                        {" "}
                        {dayjs(details?.preorder_end_time).format(
                          "DD - MMM - YYYY"
                        )}
                      </h4>
                      <h6 className="cap">
                        {dayjs(details?.preorder_end_time).format("hh:mm a")}{" "}
                        IST
                      </h6>
                    </div>
                  </div>
                  <div className="items nine">
                    <div className="box-block">
                      <h6>Drop Ended on</h6>
                      <h4 className="cap">
                        {" "}
                        {dayjs("2023-04-05T16:00:00.000Z").format(
                          "DD - MMM - YYYY"
                        )}
                      </h4>
                      <h6 className="cap">
                        {dayjs("2023-04-05T16:00:00.000Z").format("hh:mm a")}{" "}
                        IST
                      </h6>
                    </div>
                  </div>
                  {/* <div className="items eight">
                    <div className="box-block">
                      <h6>Drop Start</h6>
                      <h4 className="cap">
                        {" "}
                        {dayjs(details?.auction_start_time).format(
                          "DD - MMM - YYYY"
                        )}
                      </h4>
                      <h6 className="cap">
                        {dayjs(details?.auction_start_time).format("hh:mm a")}{" "}
                        IST
                      </h6>
                    </div>
                  </div> */}
                </div>

                <div
                  className="pack-section  cursor-pointer"
                  //onClick={() => toggleMuteVideo()}
                >
                  <video
                    src={images.raddx_loot_box_sold_out}
                    className="pack-image"
                    poster={images?.raddx_lootbox}
                    controls={false}
                    type="video/mp4"
                    playsInline
                    autoPlay
                    muted
                    loop
                  ></video>
                  {/* <img
                    alt="media logo"
                    className="type_image typeimg_audio pack-image "
                    src={images?.raddx_lootbox}
                  /> */}

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
                        {""}
                        {(() => {
                         
                          if (
                            new Date(details?.preorder_start_time).getTime() >
                              new Date().getTime() &&
                            new Date(
                              details?.preorder_og_start_time
                            ).getTime() > new Date().getTime()
                          )
                            return (
                              <>
                                {" "}
                                PRE-BOOK <span>(OG Users)</span> STARTS IN
                              </>
                            );
                          else if (
                            new Date(
                              details?.preorder_og_start_time
                            ).getTime() < new Date().getTime() &&
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
                                  setTimeout(initEventInfo, 0)
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
                                setTimeout(initEventInfo, 0)
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
                        onClick={() => {
                          !eventInfo?.buttonDisabled && handlePreBook();
                        }}
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
            name={"RADDX LOOT BOX"}
            show={modalType === MODAL_TYPES.PREBOOK}
            toggleModal={toggleModal}
            modalState={modalState}
            slug={details?.slug}
            onReload={() => {
              dataReload();
              buyButtonDisableStatus && buyButtonDisableCheck();
            }}
            numberOfQuantity={nftQuantity}
          />
        )}
      </section>
    </>
  );
};

const SharePopover = ({ icon, placement, hideMenus }) => {
  return (
    <>
      <OverlayTrigger
        trigger="click"
        rootClose
        key={placement}
        placement={placement}
        overlay={
          <Popover className="mb-2 raddaxlootbox">
            <Popover.Body className="p-1 custom-pop ">
              <div>
                <h5>YOU HAVE CHANCES TO WIN</h5>
                {/* <p>BAYC NFT FAMILY (YUGA Labs)</p> */}
                <p>BITCOIN</p>
                <p>MAHINDRA THAR CAR</p>
                <p>ROYAL ENFIELD HUNTER 350</p>
                <p>ETHEREUM </p>
                <p>TESLA SHARES </p>
                <p>MACBOOK AIR </p>
                <p>APPLE 2022 10.9-INCH IPAD (WI-FI, 64GB)</p>
                <p>BINANCE COIN </p>
                <p
                  className="more-box"
                  onClick={() => {
                    window.open(
                      !hideMenus
                        ? `${process.env.REACT_APP_PUBLIC_URL}/guaranteed-gift-box`
                        : `${process.env.REACT_APP_PUBLIC_URL}/guaranteed-gift-box?hideMenus=true`,
                      "_self"
                    );
                  }}
                >
                  Click For More Details..
                </p>
              </div>
            </Popover.Body>
          </Popover>
        }
      >
        <span>{icon}</span>
      </OverlayTrigger>
    </>
  );
};

export default LootSectionOne;
