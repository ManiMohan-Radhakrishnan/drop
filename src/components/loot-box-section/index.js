import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Image from "next/future/image";

import { isUserLoggedIn } from "../../redux/reducers/user_reducer";
import { MODAL_TYPES, LOOT_STATUS } from "./common";
import LoginWithPassword from "./login-with-password";
import LoginWithOtp from "./login-with-otp";
import VerifyOtp from "./verify-otp";
import ForgotPassword from "./forgot-password";
import Register from "./register";
import LoginWithGoogleOtp from "./google-otp";
import FlipTimer from "../flip-timer";
import JoinWaitList from "./join-wait-list";

import LootImage from "../../images/drops/loot-image.png";
import DownArrow from "../..images/drops/bat-drop/bat-loot-video/arrow-with-round.svg";
import images from "../../utils/images.json";

import style from "./style.scss";

const dateFormat = (date = null, format = "YYYY-MM-DD HH:mm:ss") => {
  if (!date) return null;
  var input_date = new Date(date);
  return dayjs(input_date).format(format);
};

const LootBoxSection = ({ details }) => {
  const lootStatusRef = useRef(null);
  const [modalType, setModalType] = useState("");
  const [modalState, setModalState] = useState({});
  const loginStatus = useSelector(isUserLoggedIn);
  const [eventInfo, setEventInfo] = useState({
    title: "PRE - BOOK ENDS IN",
    status: LOOT_STATUS?.PRE_BOOK,
    endAt: dateFormat(details?.preorder_end_time),
    buttonTitle: "PRE-BOOK NOW",
  });

  const initEventInfo = () => {
    const now = new Date().getTime(details?.current_time);
    let event_info = { ...eventInfo };

    if (now < new Date(details?.preorder_start_time).getTime()) {
      event_info = {
        title: "PRE-BOOK STARTS IN",
        status: LOOT_STATUS?.YTS,
        endAt: dateFormat(details?.preorder_start_time),
        buttonTitle: "PRE-BOOK",
        buttonDisabled: true,
      };
    } else if (
      now >= new Date(details?.preorder_start_time).getTime() &&
      now <= new Date(details?.preorder_end_time).getTime()
    ) {
      event_info = {
        title: "PRE-BOOK ENDS IN",
        status: LOOT_STATUS?.PRE_BOOK,
        endAt: dateFormat(details?.preorder_end_time),
        buttonTitle: "PRE-BOOK NOW",
        buttonDisabled: false,
      };
    } else if (
      details?.auction_start_time === null ||
      details?.auction_end_time === null
    ) {
      event_info = {
        title: "DROP COMING SOON",
        status: LOOT_STATUS?.DROP_YTA,
        buttonTitle: "BUY NOW",
        buttonDisabled: true,
      };
    } else if (
      now > new Date(details?.preorder_end_time).getTime() &&
      now <= new Date(details?.auction_start_time).getTime()
    ) {
      event_info = {
        title: "DROP STARTS IN",
        status: LOOT_STATUS?.DROP_YTS,
        endAt: dateFormat(details?.auction_start_time),
        buttonTitle: "BUY NOW",
        buttonDisabled: true,
      };
    } else if (
      now > new Date(details?.auction_start_time).getTime() &&
      now <= new Date(details?.auction_end_time).getTime()
    ) {
      event_info = {
        title: "DROP ENDS IN",
        status: LOOT_STATUS?.DROP,
        endAt: dateFormat(details?.auction_end_time),
        buttonTitle: "BUY NOW",
        buttonDisabled: !details?.available_qty,
      };
    } else if (now > new Date(details?.auction_end_time).getTime()) {
      event_info = {
        title: "DROP ENDED",
        status: LOOT_STATUS?.SOLD_OUT,
        buttonTitle: "SOLD OUT",
        buttonDisabled: true,
      };
    }
    setEventInfo(event_info);
  };

  const toggleModal = (modalType = "", modalState = {}) => {
    setModalType(modalType);
    setModalState(modalState);
  };

  useEffect(() => {
    initEventInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

  return (
    <>
      <div className={style["loot-timer-section"]}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className={style["loot-timer-block"]}>
                <h4>{eventInfo?.title}</h4>
                <FlipTimer
                  endTime={eventInfo?.endAt}
                  handleEndEvent={initEventInfo}
                />
                <JoinWaitList />
                {/* <div title="Add to Calendar" className="addeventatc">
                  Add to my calendar
                  <span className="start">11/23/2022 08:00 AM</span>
                  <span className="end">11/23/2022 10:00 AM</span>
                  <span className="timezone">America/Los_Angeles</span>
                  <span className="title">Summary of the event</span>
                  <span className="description">Description of the event</span>
                  <span className="location">Location of the event</span>
                </div> */}
                <div className={style["prebook-sec"]}>
                  {eventInfo.status === LOOT_STATUS.PRE_BOOK && (
                    <p>PRE-BOOK NOW</p>
                  )}
                  <Image
                    height={50}
                    width={50}
                    src={DownArrow}
                    className={style["prebook-sec-icon"]}
                    alt="down-arrow"
                    onClick={() =>
                      lootStatusRef?.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className={style["main-loot-section"]}>
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
      </section>
    </>
  );
};

export default LootBoxSection;
