import { Link } from "react-router-dom";
import NFTCounter from "../../nft-counter";
import { IoIosTimer } from "react-icons/io";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import AddtoCalendar from "../add-to-calender";
import images from "../../../utils/images.json";
import { useEffect, useState } from "react";
import { LOOT_STATUS, MODAL_TYPES } from "../../loot-box-section/common";
import { lootAvailableQty } from "../../../api/actioncable-methods";
import dayjs from "dayjs";
import ForgotPassword from "../../loot-box-section/forgot-password";
import VerifyOtp from "../../loot-box-section/verify-otp";
import LoginWithGoogleOtp from "../../loot-box-section/google-otp";
import LoginWithOtp from "../../loot-box-section/login-with-otp";
import Prebook from "../../loot-box-section/prebook-with-buy-options";
import LoginWithPassword from "../../loot-box-section/login-with-password";
import Register from "../../loot-box-section/register";
import { raddx_one_drop_action } from "../../../redux/actions/drop_action";
import { buyButtonDisableStatus } from "../../../utils/common";

const LootSectionSix = ({ details, dataReload = () => {} }) => {
  const { user } = useSelector((state) => state.user.data);

  const loginStatus = useSelector((state) => state.user.login);
  const [modalType, setModalType] = useState("");
  const [modalState, setModalState] = useState({});
  const dispatch = useDispatch();
  const [availQty, setAvailQty] = useState(details?.available_qty || 0);
  const [eventInfo, setEventInfo] = useState({});
  const [holdTime, setHoldTime] = useState(false);
  const [timeLeft, setTimeLeft] = useState(false);

  useEffect(() => {
    if (eventInfo) dispatch(raddx_one_drop_action(eventInfo?.status));
  }, [eventInfo]);

  const initEventInfo = (showToast = false) => {
    const now = new Date().getTime();
    let event_info = {
      title: "DROP STARTS IN",
      status: LOOT_STATUS?.YTS,
      buttonTitle: "Buy",
      buttonDisabled: true,
      userMaxQtyPurchased: false,
    };
    let statusChangeMessage = "";

    if (
      parseInt(details?.available_qty) === 0
      //  &&
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
    } else if (now < new Date(details?.auction_start_time).getTime()) {
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
          details?.available_qty === 0 ||
          (details?.purchased_qty === details?.qty_per_user && loginStatus),
        userMaxQtyPurchased:
          parseInt(details?.purchased_qty) ===
            parseInt(details?.qty_per_user) &&
          parseInt(details?.qty_per_user) > 0,
      };
    } else if (now >= new Date(details?.auction_end_time).getTime()) {
      statusChangeMessage = "Drop ended";
      // dispatch(setCryptoBatDropLive(LOOT_STATUS?.SOLD_OUT));
      event_info = {
        title: "DROP ENDED",
        status: LOOT_STATUS?.SOLD_OUT,
        // buttonTitle: "SOLD OUT",
        buttonDisabled: true,
      };
    }
    // if (statusChangeMessage) {
    //   toggleModal();
    //   showToast && toast.info(statusChangeMessage);
    // }
    setAvailQty(details?.available_qty);
    setEventInfo(event_info);
  };

  let quantity = null;

  useEffect(() => {
    if (details?.slug) {
      lootAvailableQty(details?.slug, (data) => {
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
        }
      });
    }
  }, [details?.slug]);

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
    <>
      <section className="main-loot-section-six">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="header-block">
                <h2 className="theme-yellow-text">$1 RADDX SUPER LOOT BOX</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="lootbox-info-hint">
                <div className="footbox-highlites">
                  <span className="theme-pink-text ">
                    Buy 5 Loot Box + 1 Digital Land Box
                  </span>{" "}
                  <i>{"=>"}</i>
                  <span className="theme-yellow-text ">
                    Get 1 Super Loot For Just $1!
                  </span>{" "}
                </div>
                <p>
                  Each Super Loot Gives You A Guaranteed Immortal Car In the
                  RADDX Racing Metaverse!
                </p>
              </div>
              <div className="loot-block">
                <div className="loot-section">
                  <div className="items one">
                    <h2>
                      <span className="loot-title">ABOUT COLLECTION</span>
                    </h2>
                    <p>
                      With a limited supply of just 100 units, these Immortal
                      cars assure ultimate damage-resistance, superior
                      longevity, and an elegant performance in the RADDX Racing
                      Metaverse, making the Immortal cars highly coveted and a
                      prized possession to own!
                    </p>
                  </div>
                  <div className="items two">
                    <div className="box-block">
                      <h6>Every Super Loot Box contains</h6>
                      <h4 className="loot-desc mt-1">1 RADDX Car NFT</h4>
                      <div className="price-list-group">
                        <div className="price-list-box">
                          <div className="pack-price-flex">
                            <div className="pack-price-heading">
                              <h3>1 Super Loot Box</h3>{" "}
                            </div>
                            <div className="pack-price-amount">
                              <h4>
                                {" "}
                                ${parseInt(details?.buy_amount || 0)}&nbsp;
                              </h4>
                              {/* <button className="buy-btn disabled">
                                Buy now
                              </button> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="items four">
                    <div className="box-block">
                      <h6>Total Supply </h6>
                      <h4>
                        <span>{details?.total_quantity} Boxes</span>
                      </h4>
                    </div>
                  </div>
                  <div className="items five">
                    <div className="box-block">
                      <h6>Available Supply </h6>
                      {eventInfo.status === LOOT_STATUS?.SOLD_OUT ? (
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
                  <div className="items six">
                    <div className="box-block">
                      <h6>Drop Starts On </h6>
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
                  </div>
                  <div className="items seven">
                    <div className="box-block">
                      <h6>Drop Ended On </h6>
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
                      <h6>Drop Starting From</h6>
                      <h4>23 - MAR - 2023</h4>
                      <h6>Onwards</h6>
                    </div>
                  </div> */}
                </div>

                <div
                  className="pack-section  cursor-pointer"
                  //onClick={() => toggleMuteVideo()}
                >
                  <img
                    alt="media logo"
                    className="type_image typeimg_audio pack-image"
                    src={images?.super_lootbox_usd1}
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
                  <div className="time-show">
                    <div className="pl-3 pr-3">
                      {loginStatus &&
                        eventInfo?.status !== LOOT_STATUS?.SOLD_OUT && (
                          <h5
                            className={`${
                              parseInt(details?.qty_per_user) > 0
                                ? "eligible"
                                : "not-eligible"
                            }`}
                          >
                            {parseInt(details?.qty_per_user) > 0
                              ? "Congrats! You're eligible to participate in this drop."
                              : "Oops! You're not eligible to participate in this drop."}
                          </h5>
                        )}
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
                    {eventInfo?.buttonTitle && (
                      <Link
                        className={`nav-label ${
                          (eventInfo?.buttonDisabled ||
                            eventInfo?.userMaxQtyPurchased) &&
                          "disabled"
                        }`}
                        to="#"
                        onClick={handlePreBook}
                      >
                        {eventInfo?.buttonTitle}
                      </Link>
                    )}
                  </div>
                  {eventInfo?.userMaxQtyPurchased && (
                    <h5 className="purchased">
                      You have reached your $1 Super Loot Box purchase limit.
                    </h5>
                  )}
                  {/* <div className="collection-btn">
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
                    {eventInfo?.buttonTitle && (
                      <Link
                        className={`nav-label ${
                          (eventInfo?.buttonDisabled ||
                            eventInfo?.userMaxQtyPurchased) &&
                          "disabled"
                        }`}
                        to="#"
                        onClick={handlePreBook}
                      >
                        {eventInfo?.buttonTitle}
                      </Link>
                    )}

                    {(eventInfo?.status === LOOT_STATUS?.YTS ||
                      eventInfo?.status === LOOT_STATUS?.DROP_YTA) && (
                      <AddtoCalendar
                        name="BUY $1 RADDX SUPER LOOT BOX"
                        startDate="2023-04-12"
                        startTime="18:00"
                        endTime="18:05"
                      />
                    )}
                  </div> */}
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
    </>
  );
};

export default LootSectionSix;
