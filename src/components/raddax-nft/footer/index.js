import { useEffect, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import PlayStore from "../../../images/google-play-image.png";
import AppStore from "../../../images/apple-image.png";
import PlayStoreWhite from "../../../images/google-play-image_white.png";
import AppStoreWhite from "../../../images/apple-image_white.png";

import { BsArrowRight, BsArrowUpCircleFill } from "react-icons/bs";
import { decodeURIComponentSafe, validateEmail } from "../../../utils/common";
import { subscribeApi } from "../../../api/base-methods";
import { getCookies } from "../../../utils/cookies";

// import discount from "../../images/discount.png";
import { Image } from "react-bootstrap";
import "./style.scss";
import { Link, Router } from "react-router-dom/cjs/react-router-dom.min";

import {
  MODAL_TYPES,
  LOOT_STATUS,
} from "../../../components/loot-box-section/common";

import LoginWithPassword from "../../../components/loot-box-section/login-with-password";
import LoginWithOtp from "../../../components/loot-box-section/login-with-otp";
import LoginWithGoogleOtp from "../../../components/loot-box-section/google-otp";
import VerifyOtp from "../../../components/loot-box-section/verify-otp";
import ForgotPassword from "../../../components/loot-box-section/forgot-password";
import Register from "../../../components/loot-box-section/register";
import useQuery from "../../../hook/useQuery";

const Footer = () => {
  let query = useQuery();
  const history = useHistory();
  const user = useSelector((state) => state?.user);
  const [email, setEmail] = useState();
  const [vEmail, setVEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [GShover, setGSHover] = useState(false);
  const [AShover, setASHover] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalState, setModalState] = useState({});

  const [autoLogin, setAutoLogin] = useState(true);
  const [termsConditions, setTermsConditions] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSendNewsLetter = async () => {
    if (validateEmail(email)) {
      setVEmail(null);
      //console.log(user, "user");

      try {
        setLoading(true);

        const result = await subscribeApi(
          email,
          termsConditions,
          "jump",
          getCookies()
        );
        if (!result.data.data.subscribed) {
          setVEmail(
            "We will buzz you with important updates. Thank you for being a part of Jump.trade #jump.trade #nft"
          );
        } else {
          setVEmail(
            "We got it again!, We are excited to have you as part of our NFT club. Details have been noted already. We will buzz you with important updates. See you soon!"
          );
        }

        !user?.login &&
          termsConditions &&
          history.push(
            `?with=otp&email=${result?.data?.data?.signin_email || ""}`
          );

        setEmail("");
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.log(
          "🚀 ~ file: index.js ~ line 46 ~ handleSendNewsLetter ~ error",
          error
        );
      }
    } else {
      setVEmail("Please provide a valid email");
    }
  };

  const toggleModal = (modalType = "", modalState = {}) => {
    setModalType(modalType);
    setModalState(modalState);
  };

  useEffect(() => {
    const email = query.get("email");
    const withParams = query.get("with");
    if (!user?.login && email && withParams) {
      let Loginemail = decodeURIComponentSafe(email);
      toggleModal(MODAL_TYPES.LOGIN_WITH_OTP, { Loginemail });
    }
  }, [query]);

  return (
    <>
      <div className={"footer"}>
        <div className={"fmenu1-raddax"}>
          <div className={`submenu first-box`}>
            <a
              target="_blank"
              href={`${process.env.REACT_APP_MARKETPLACE_URL}`}
              prefetch={false}
            >
              <a>
                <Image
                  layout="responsive"
                  height="100"
                  width="100"
                  src={
                    "https://cdn.guardianlink.io/product-hotspot/images/jump/jump-trade-logo.svg"
                  }
                  className={"footer-logo"}
                  alt="JumptradeLogo"
                  priority={true}
                />
              </a>
            </a>
            <p className={"footer-brand-info"}>
              Jump.trade is Asia&apos;s Largest NFT Marketplace. Begin trading
              NFTs today.
            </p>
            <div className={`downloads-section`}>
              <div
                className={`d-flex pt-3 gap-3 flex-wrap justify-content-center downloads_btns`}
              >
                <a
                  href="https://play.google.com/store/apps/details?id=com.jump.trade"
                  target="_blank"
                  rel="nofollow noopoener noreferrer"
                >
                  <Image
                    layout="responsive"
                    height="100"
                    width="100"
                    className={"image_icon"}
                    src={GShover ? PlayStoreWhite : PlayStore}
                    alt="PlayStore"
                    priority={true}
                    onMouseOver={() => setGSHover(true)}
                    onMouseOut={() => setGSHover(false)}
                  />
                </a>
                <a
                  href="https://apps.apple.com/in/app/jump-trade/id1618739753"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <Image
                    layout="responsive"
                    height="100"
                    width="100"
                    className={"image_icon"}
                    src={AShover ? AppStoreWhite : AppStore}
                    alt="AppStore"
                    priority={true}
                    onMouseOver={() => setASHover(true)}
                    onMouseOut={() => setASHover(false)}
                  />
                </a>
              </div>
            </div>
          </div>
          <div className={`submenu third-box`}>
            <div className={"footer-form-block"}>
              <h6>Stay Informed! Subscribe Today For The Latest Updates.</h6>
              <div className={`input-group input-group `}>
                <input
                  type="text"
                  className={`form-control form-control`}
                  placeholder="Enter your email"
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <span
                  className={`input-group-text input-group-text`}
                  disabled={loading}
                  onClick={handleSendNewsLetter}
                >
                  {loading ? (
                    <BiLoaderAlt className="fa fa-spin" />
                  ) : (
                    <BsArrowRight />
                  )}
                </span>
              </div>
              {/* {autoLogin && email && !loginStatus && (
                <div className="py-2 gap-2 mt-2">
                  <input
                    type="checkbox"
                    name="termsConditions"
                    checked={termsConditions}
                    onClick={() => setTermsConditions(!termsConditions)}
                  />{" "}
                  I allow Jump.trade to create an account for me and I confirm
                  that I am 18 years or older. View{" "}
                  <a
                    target="_blank"
                    onClick={() =>
                      window.open(
                        `${process.env.REACT_APP_MARKETPLACE_URL}/terms-and-conditions`
                      )
                    }
                    className={`${style["link"]} ${style["link-orange"]}`}
                  >{`T&Cs`}</a>{" "}
                  and
                  <a
                    target="_blank"
                    onClick={() =>
                      window.open(
                        `${process.env.REACT_APP_MARKETPLACE_URL}/privacy-policy`
                      )
                    }
                    className={`${style["link"]} ${style["link-orange"]}`}
                  >{` Privacy Policy.`}</a>
                </div>
              )} */}
              {autoLogin && email && !user?.login && (
                <div className="py-2 allow-footer">
                  <input
                    type="checkbox"
                    name="termsConditions"
                    checked={termsConditions}
                    onClick={() => setTermsConditions(!termsConditions)}
                  />{" "}
                  I allow Jump.trade to create an account for me and I confirm
                  that I am 18 years or older. View{" "}
                  <a
                    target="_blank"
                    onClick={() =>
                      window.open(
                        `${process.env.REACT_APP_MARKETPLACE_URL}/terms-and-conditions`
                      )
                    }
                    className="link link-orange"
                  >{`T&Cs`}</a>{" "}
                  and
                  <a
                    target="_blank"
                    onClick={() =>
                      window.open(
                        `${process.env.REACT_APP_MARKETPLACE_URL}/privacy-policy`
                      )
                    }
                    className="link link-orange"
                  >{` Privacy Policy.`}</a>
                </div>
              )}
              <p className={"nft_email_error"}>{vEmail}</p>
            </div>
            <div className={"footer-menulist-block"}>
              <div className={"footer-menu-list"}>
                <ul className={"footer-menu-links"}>
                  <li
                    onClick={() =>
                      window.open(
                        `${process.env.REACT_APP_MARKETPLACE_URL}/about-us`,
                        "_blank"
                      )
                    }
                  >
                    About Us
                  </li>

                  <li>
                    <a
                      onClick={() =>
                        window.open(
                          `${process.env.REACT_APP_GUARDIAN_CONTACT_US}`,
                          "_blank"
                        )
                      }
                      rel="noopener noreferrer"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li
                    onClick={() =>
                      window.open(
                        `${process.env.REACT_APP_MARKETPLACE_URL}/blog`,
                        "_blank"
                      )
                    }
                  >
                    Blog
                  </li>

                  {/* <Nav.Link
                    className={"blink_contest"}
                    onClick={() => router.push("/creator-application")}
                  >
                    Creator
                    <span className="new-badge">new</span>
                  </Nav.Link> */}
                  {/* <li onClick={() => router.push("/")}>Marketplace</li>

                  <li onClick={() => router.push("/mcl-game")}>MCL Game</li> */}
                </ul>
              </div>

              <div className={"footer-menu-list"}>
                <ul className={"footer-menu-links"}>
                  <li
                    onClick={() =>
                      window.open(
                        `${process.env.REACT_APP_MARKETPLACE_URL}/faq`,
                        "_blank"
                      )
                    }
                  >
                    FAQs
                  </li>
                  <li
                    onClick={() =>
                      window.open(
                        `${process.env.REACT_APP_INSTRUCTION_URL}`,
                        "_blank"
                      )
                    }
                  >
                    Instruction
                  </li>

                  <li
                    onClick={() =>
                      window.open(
                        `${process.env.REACT_APP_MARKETPLACE_URL}/release-notes`,
                        "_blank"
                      )
                    }
                  >
                    Release Notes
                  </li>
                  {/* <li
                    onClick={() =>
                      window.open(
                        process.env.NEXT_PUBLIC_GUARDIAN_CONTACT_US,
                        "_blank"
                      )
                    }
                  >
                    Contact Us
                  </li> */}
                </ul>
              </div>
              <div className={"footer-menu-list"}>
                <ul className={"footer-menu-links"}>
                  <li
                    onClick={() =>
                      window.open(
                        `${process.env.REACT_APP_MARKETPLACE_URL}/privacy-policy`,
                        "_blank"
                      )
                    }
                  >
                    Privacy Policy
                  </li>

                  <li
                    onClick={() =>
                      window.open(
                        `${process.env.REACT_APP_MARKETPLACE_URL}/terms-and-conditions`,
                        "_blank"
                      )
                    }
                  >
                    Terms &amp; Conditions
                  </li>
                  {/* <li
                    onClick={() => router.push("/offers")}
                    className={style["offer"]}
                  >
                    Offers
                    <Image
                      src={discount}
                      alt="discount"
                      height={20}
                      width={20}
                    />
                  </li> */}
                  <li
                    onClick={() =>
                      window.open(
                        `${process.env.REACT_APP_MARKETPLACE_URL}/nft-marketplace/contest`,
                        "_blank"
                      )
                    }
                  >
                    Contest
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Third box-end */}
        </div>
      </div>
      <div className={`bottom-bar`}>
        <div
          className={`bottom-container d-flex justify-content-center align-items-center`}
        >
          <div className={`copyrights me-3`}>
            © All rights reserved | Appstars Applications Pvt. Ltd., India &
            Guardian Blockchain Labs Pte. Ltd., Singapore.
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
      </div>
    </>
  );
};

export default Footer;
