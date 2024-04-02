import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { BiLoaderAlt } from "react-icons/bi";
import { Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { HiOutlineArrowRight } from "react-icons/hi";
// import nftVideo from "../../images/cric/img/video/nftCollection.m4v";
import cric from "../../images/cric/img/playtowin.jpg";
import dummy_bat from "../../images/cric/dummy_bat.png";
import { BiX } from "react-icons/bi";
import {
  FaTelegramPlane,
  FaDiscord,
  FaInstagram,
  FaMediumM,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { useHistory } from "react-router";

import guardianlogo from "../../images/guardianlink.svg";

import DropCard from "./drop-card";
import JukeDropCard from "./juke-drop-card";
import { sendEmailNewletter } from "../../api/axios-newsletter";
import { validateEmail } from "./../../utils/common";
import { treasureCheck } from "../../api/methods";
import "../new-drops-temp/style.scss";

import play from "../../images/play.png";
import playBtn from "../../images/play-btn.png";
import { VscClose } from "react-icons/vsc";
import { BsPlayFill } from "react-icons/bs";

const NewDropsTemp2 = ({
  categories,
  setIsLive,
  setTrigger,
  trigger,
  sticky,
  setSticky,
}) => {
  const history = useHistory();
  const { hash } = useLocation();

  const [nftCount, setNftCount] = useState(0);

  const { user } = useSelector((state) => state.user.data);
  const r_one = useRef(null);
  const r_two = useRef(null);
  const r_three = useRef(null);
  const r_four = useRef(null);
  const r_five = useRef(null);
  const r_six = useRef(null);
  const r_seven = useRef(null);
  const r_email = useRef(null);

  const header_ref = useRef(null);

  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState();
  const [email2, setEmail2] = useState();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [vEmail, setVEmail] = useState();
  const [vEmail2, setVEmail2] = useState();
  const [active, setActive] = useState();

  // new code

  const [auctionEndTime1, setAuctionEndTime1] = useState();
  const [auctionEndTime2, setAuctionEndTime2] = useState();
  const [auctionEndTime3, setAuctionEndTime3] = useState();

  const [auction_started, set_auction_started] = useState(false);
  const [loot_started, set_loot_started] = useState(false);
  const [juke_started, set_juke_started] = useState(false);
  const [stanley_started, set_stanley_started] = useState(false);

  const [auction_ended1, set_auction_ended1] = useState(false);
  const [auction_ended2, set_auction_ended2] = useState(false);
  const [auction_ended3, set_auction_ended3] = useState(false);
  const [loot_ended, set_loot_ended] = useState(false);
  const [juke_ended, set_juke_ended] = useState(false);
  const [stanley_ended, set_stanley_ended] = useState(false);

  const auction_start_date = "Apr 22, 2022 10:30:00";
  const auction_end_date1 = "Apr 24, 2022 10:30:00";
  const auction_end_date2 = "Apr 24, 2022 10:30:00";
  const auction_end_date3 = "Apr 24, 2022 10:30:00";

  const loot_start_date = "Apr 22, 2022 11:30:00";
  const loot_end_date = "Apr 22, 2022 12:30:00";

  const juke_start_date = "Apr 22, 2022 10:30:00";
  const juke_end_date = "Apr 30, 2022 16:30:00";

  const stanley_start_date = "Apr 22, 2022 10:30:00";
  const stanley_end_date = "Apr 30, 2022 18:30:00";

  const [auction_time1, set_auction_time1] = useState();
  const [auction_time2, set_auction_time2] = useState();
  const [auction_time3, set_auction_time3] = useState();
  const [loot_time, set_loot_time] = useState();
  const [juke_time, set_juke_time] = useState();
  const [stanley_time, set_stanley_time] = useState();
  const videoRef = useRef();
  // const closeoRef = useRef();
  const [video, setVideo] = useState(false);

  const timeFunction = (check = false) => {
    var offset = new Date().getTimezoneOffset();

    var auction_start_date_utc = new Date(auction_start_date);
    auction_start_date_utc.setMinutes(
      auction_start_date_utc.getMinutes() - offset
    );

    var auction_end_date_utc1;
    if (auctionEndTime1) {
      auction_end_date_utc1 = new Date(auctionEndTime1);
    }
    // else {
    //   auction_end_date_utc1 = new Date(auction_end_date1);
    //   auction_end_date_utc1.setMinutes(
    //     auction_end_date_utc1.getMinutes() - offset
    //   );
    // }
    var auction_end_date_utc2;
    if (auctionEndTime2) {
      auction_end_date_utc2 = new Date(auctionEndTime2);
    }
    // else{
    //    auction_end_date_utc2 = new Date(auction_end_date2);
    //   auction_end_date_utc2.setMinutes(
    //     auction_end_date_utc2.getMinutes() - offset
    //   );
    // }
    var auction_end_date_utc3;
    if (auctionEndTime3) {
      auction_end_date_utc3 = new Date(auctionEndTime3);
    }
    // else {
    //   auction_end_date_utc3 = new Date(auction_end_date3);
    //   auction_end_date_utc3.setMinutes(
    //     auction_end_date_utc3.getMinutes() - offset
    //   );
    // }

    var loot_start_date_utc = new Date(loot_start_date);
    loot_start_date_utc.setMinutes(loot_start_date_utc.getMinutes() - offset);

    var loot_end_date_utc = new Date(loot_end_date);
    loot_end_date_utc.setMinutes(loot_end_date_utc.getMinutes() - offset);

    var juke_start_date_utc = new Date(juke_start_date);
    juke_start_date_utc.setMinutes(juke_start_date_utc.getMinutes() - offset);

    var juke_end_date_utc = new Date(juke_end_date);
    juke_end_date_utc.setMinutes(juke_end_date_utc.getMinutes() - offset);

    var stanley_start_date_utc = new Date(stanley_start_date);
    stanley_start_date_utc.setMinutes(
      stanley_start_date_utc.getMinutes() - offset
    );

    var stanley_end_date_utc = new Date(stanley_end_date);
    stanley_end_date_utc.setMinutes(stanley_end_date_utc.getMinutes() - offset);

    var s_time = new Date();

    if (check) s_time.setSeconds(s_time.getSeconds() + 2);

    if (new Date(auction_start_date_utc) < s_time) {
      set_auction_time1(auction_end_date_utc1);
      set_auction_started(true);
      setIsLive(true);
      setTrigger(!trigger);
    } else {
      set_auction_time1(auction_start_date_utc);
    }
    if (new Date(auction_start_date_utc) < s_time) {
      set_auction_time2(auction_end_date_utc2);
      set_auction_started(true);
      setIsLive(true);
      setTrigger(!trigger);
    } else {
      set_auction_time2(auction_start_date_utc);
    }
    if (new Date(auction_start_date_utc) < s_time) {
      set_auction_time3(auction_end_date_utc3);
      set_auction_started(true);
      setIsLive(true);
      setTrigger(!trigger);
    } else {
      set_auction_time3(auction_start_date_utc);
    }

    if (new Date(auction_end_date_utc1) < s_time) {
      set_auction_ended1(true);
    } else {
      set_auction_ended1(false);
    }
    if (new Date(auction_end_date_utc2) < s_time) {
      set_auction_ended2(true);
    } else {
      set_auction_ended2(false);
    }
    if (new Date(auction_end_date_utc3) < s_time) {
      set_auction_ended3(true);
    } else {
      set_auction_ended3(false);
    }

    if (new Date(loot_start_date_utc) < s_time) {
      set_loot_time(loot_end_date_utc);
      set_loot_started(true);
      setTrigger(!trigger);
    } else {
      set_loot_time(loot_start_date_utc);
    }

    if (new Date(loot_end_date_utc) < s_time) {
      set_loot_ended(true);
    }

    if (new Date(juke_start_date_utc) < s_time) {
      set_juke_time(juke_end_date_utc);
      set_juke_started(true);
      setTrigger(!trigger);
    } else {
      set_juke_time(juke_start_date_utc);
    }

    if (new Date(juke_end_date_utc) < s_time) {
      set_juke_ended(true);
    }

    if (new Date(stanley_start_date_utc) < s_time) {
      set_stanley_time(stanley_end_date_utc);
      set_stanley_started(true);
      setTrigger(!trigger);
    } else {
      set_stanley_time(stanley_start_date_utc);
    }

    if (new Date(stanley_end_date_utc) < s_time) {
      set_stanley_ended(true);
    }
  };

  useEffect(() => {
    timeFunction(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hash === "#1983") {
      r_two.current.scrollIntoView();
    } else if (hash === "#2003") {
      r_three.current.scrollIntoView();
    } else if (hash === "#2011") {
      r_four.current.scrollIntoView();
    }
  }, [hash]);

  const handleCheck = () => {
    timeFunction(true);
  };

  useEffect(() => {
    timeFunction(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctionEndTime1, auctionEndTime2, auctionEndTime3]);

  // const sendEmailNewletter = (input) => {
  //   axios.post(process.env.REACT_APP_NEWSLETTER_API, formData)
  // };
  const handleSendNewsLetter = async () => {
    if (validateEmail(email)) {
      setVEmail(null);
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("Nemail", email);

        const result = await sendEmailNewletter(formData);
        if (result.data.status) {
          setVEmail(
            "We will buzz you when the NFT Drop is ready to launch. Thank you for being a part of BeyondLife.club #beyondLife.club #nft"
          );
        } else {
          setVEmail(
            "We got it again!, We are excited to have you as part of our NFT club. Details have been noted already. So, worry not! We will return to you once we are all set with the NFT drops. See you soon!"
          );
        }
        setLoading(false);
        setEmail("");
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

  const handleSendNewsLetter2 = async () => {
    if (validateEmail(email2)) {
      setVEmail2(null);

      try {
        setLoading2(true);

        const formData = new FormData();
        formData.append("Nemail", email2);

        const result = await sendEmailNewletter(formData);

        if (result.data.status) {
          setVEmail2(
            "We will buzz you when the NFT Drop is ready to launch. Thank you for being a part of BeyondLife.club #beyondLife.club #nft"
          );
        } else {
          setVEmail2(
            "We got it again!, We are excited to have you as part of our NFT club. Details have been noted already. So, worry not! We will return to you once we are all set with the NFT drops. See you soon!"
          );
        }

        setEmail2("");
        setLoading2(false);
      } catch (error) {
        setLoading2(false);

        console.log(
          "🚀 ~ file: index.js ~ line 46 ~ handleSendNewsLetter ~ error",
          error
        );
      }
    } else {
      setVEmail2("Please provide a valid email");
    }
  };

  const exe_scroll_one = () => {
    r_one.current.scrollIntoView();
    setActive("one");
  };

  const exe_scroll_email = () => {
    r_email.current.scrollIntoView();
  };

  const exe_scroll_two = () => {
    r_two.current.scrollIntoView();
    setActive("two");
  };
  const exe_scroll_three = () => {
    r_three.current.scrollIntoView();
    setActive("three");
  };

  const exe_scroll_four = () => {
    r_four.current.scrollIntoView();
    setActive("four");
  };

  const handleTreasureClick = async () => {
    if (user?.slug) {
      const response = await treasureCheck();
      if (response.data.data) {
        setNftCount(response.data.data.bundle_count);
        setModal(true);
      }
    } else {
      window.open(
        `${
          process.env.REACT_APP_ACCOUNTS_URL
        }/signin?fsz=${sessionStorage.getItem("fsz")}&redirect=${
          window.location.href
        }`,
        "_self"
      );
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, true);
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });

    scrollHandler();

    return () => {
      window.removeEventListener("scroll", scrollHandler, true);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollHandler = () => {
    const position = header_ref.current?.getBoundingClientRect();
    if (position?.top <= 0) {
      updateSubHeader(true);
      localStorage.setItem("sub-header", "true");
    } else {
      updateSubHeader(false);
      localStorage.setItem("sub-header", "false");
    }
  };

  const updateSubHeader = (input) => {
    if (input) {
      if (localStorage.getItem("sub-header") === "false") {
        setSticky(input);
      }
    } else {
      if (localStorage.getItem("sub-header") === "true") {
        setSticky(input);
      }
    }
  };

  return (
    <>
      <div className="new_drop_wrapper">
        <section className="sw_ab_1">
          <img className="dr_baner" src={cric} alt="" />
          <div className="banner_content">
            <div className="drop-title mb-0">
              <h2 className="drop-title__heading mb-4">
                Jump.trade launches the world's first-ever P2E cricket game &
                signed collectibles!
              </h2>
              <p className="drop-title__description mb-4">
                {/* <a
                  href="https://www.beyondlife.club"
                  target="_blank"
                  rel="noreferrer"
                  className="text-whites no_border"
                >
                  BeyondLife.club's
                </a>{" "} */}
                Jump.trade, a GuardianLink brand, brings you the Meta Cricket
                League (MCL)! You can now make your own metaverse cricket team
                and also earn rewards by winning matches. Jump.trade also
                presents exclusive, authenticated, and collectible cricket bat
                NFTs signed by some of the biggest legends of the game!
              </p>
              <div className="learnMore">
                {auction_started ? (
                  <>
                    {user?.slug ? (
                      <Link
                        className="nav-label"
                        to="#"
                        onClick={exe_scroll_one}
                      >
                        Explore Now
                      </Link>
                    ) : (
                      <Link
                        className="nav-label"
                        to="#"
                        onClick={() =>
                          window.open(
                            `${
                              process.env.REACT_APP_ACCOUNTS_URL
                            }/signup?fsz=${sessionStorage.getItem("fsz")}`,
                            "_self"
                          )
                        }
                      >
                        Join The Waitlist
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    {!user?.slug && (
                      <Link
                        className="nav-label"
                        to="#"
                        // onClick={exe_scroll_email}
                        onClick={() =>
                          window.open(
                            `${
                              process.env.REACT_APP_ACCOUNTS_URL
                            }/signup?fsz=${sessionStorage.getItem("fsz")}`,
                            "_self"
                          )
                        }
                      >
                        Join The Waitlist
                      </Link>
                    )}
                  </>
                )}
                <div ref={header_ref}></div>
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
              </div>
            </div>
          </div>

          {/* <div onClick={exe_scroll_one} className="scroll"></div> */}
        </section>

        <section className="">
          <div ref={videoRef}>
            {!video ? (
              <>
                <div>
                  <section className="trailer_section d-flex align-items-center">
                    <div className="trailer-container">
                      <div className="top-fixed-trailer"></div>
                      <div className="">
                        <div className="col-xl-8 col-lg-8 col-md-9 col-sm-12 col-12">
                          <div className="trailer-content ps-5">
                            <h2 className="mb-2">Meta Cricket League</h2>
                            <h4 className="">
                              {" "}
                              Redefining Cricket... For You!
                            </h4>

                            <p className="text-white trailer-desc">
                              Experience A Glimpse Of The Meta Cricket League,
                              The World's First-Ever P2E Cricket Game... The
                              Thrill, The Joy, & The Awesomeness! Watch The Game
                              Trailer!
                            </p>
                            <a className="d-flex py-4">
                              {" "}
                              <img
                                src={play}
                                alt=""
                                className="watch-btn"
                                onClick={() => {
                                  setVideo(!video);
                                  videoRef.current.scrollIntoView();
                                }}
                              />
                            </a>
                            {/* <button
                          class="glow-on-hover mt-5"
                          onClick={() => {
                            setVideo(!video);
                            videoRef.current.scrollIntoView();
                          }}
                          type="button"
                        >
                          <BsPlayFill
                            className="anim-play"
                            size={80}
                            color="#e1ff04"
                          />
                          <div className="watch-btn-text">
                            Watch The <span>Trailer</span>
                          </div>
                        </button> */}
                          </div>
                        </div>
                      </div>
                      <div className="bottom-fixed-trailer">
                        <div className="px-md-5 px-2">
                          <div class="d-flex flex-column-mob justify-content-between">
                            <a
                              target="_self"
                              onClick={() =>
                                window.open(
                                  `${process.env.REACT_APP_MARKETPLACE_URL}/nft-marketplace`,
                                  "_self"
                                )
                              }
                              className="list-style-none p-8"
                            >
                              <div class="p-2 d-flex flex-btnn align-self-start">
                                <div className="btn-click-icon">
                                  <img src={playBtn} alt="" />
                                </div>
                                <div className="btn-click ms-md-3 ms-0 fs-5">
                                  <span>Explore Marketplace</span>
                                </div>
                              </div>
                            </a>
                            <div className="vr"></div>
                            <a
                              target="_blank"
                              // href="https://guardianlink.gitbook.io/meta-cricket-league/"
                              className="list-style-none p-8"
                            >
                              <div class="p-2 d-flex flex-btnn align-self-start">
                                <div className="btn-click-icon">
                                  <img src={playBtn} alt="" />
                                </div>
                                <div className="btn-click ms-md-3 ms-0 fs-5">
                                  <a
                                    target="_blank"
                                    href="https://mcl-wp.jump.trade/"
                                    className="list-style-none p-8"
                                  >
                                    <span>Whitepaper</span>
                                  </a>
                                  {/* <p className="coming_soon">Coming Soon</p> */}
                                </div>
                              </div>
                            </a>
                            <div className="vr"></div>

                            <a className="list-style-none p-8">
                              <div class="p-2 d-flex flex-btnn align-self-start">
                                <div className="btn-click-icon">
                                  <img src={playBtn} alt="" />
                                </div>
                                <div className="btn-click ms-md-3 ms-0 fs-5">
                                  <a
                                    target="_blank"
                                    rel="nofollow noopener noreferrer"
                                    onClick={() =>
                                      window.open(
                                        `${process.env.REACT_APP_MARKETPLACE_URL}/mcl-game`,
                                        "_self"
                                      )
                                    }
                                    className="list-style-none p-8"
                                  >
                                    Meta Cricket League
                                  </a>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </>
            ) : (
              <>
                <div>
                  <section className="video-container">
                    <div className="trailer-container">
                      <div className="trailer-close-btn  end-0 translate-middle-x">
                        <div
                          className="close-comp d-inline-flex "
                          onClick={() => {
                            setVideo(!video);
                            videoRef.current.scrollIntoView();
                          }}
                        >
                          <VscClose size={50} color="#e1ff04" />
                        </div>
                      </div>
                      <iframe
                        width="100%"
                        height="auto"
                        src="https://www.youtube.com/embed/d4mzqS8Zsis?rel=0&hd=1&wmode=opaque&enablejsapi=1&controls=0"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </div>
                  </section>
                </div>
              </>
            )}
          </div>
        </section>

        <section className="sw_3" id="ab_3">
          <div className="">
            <div className="navigation-tab">
              <div className="app-showcase">
                <Navbar className="kd-feature-tabs">
                  <div className="nav nav-tabs sticky-tabs">
                    <Link
                      to="#"
                      className={`nav-label ${
                        active === "one" ? "active" : ""
                      }`}
                      onClick={exe_scroll_one}
                    >
                      Collection 1: <br />
                      <span className="main_title">The Super Loot</span>
                      <span className="sub_title"></span>
                    </Link>
                    <Link
                      to="#"
                      onClick={exe_scroll_two}
                      className={`nav-label ${
                        active === "two" ? "active" : ""
                      }`}
                    >
                      Collection 2:
                      <br />
                      <span className="main_title">
                        The 1983 Meta Cricket Collection
                      </span>
                      <span className="sub_title"></span>
                    </Link>
                    <Link
                      className={`nav-label ${
                        active === "three" ? "active" : ""
                      }`}
                      to="#"
                      onClick={exe_scroll_three}
                    >
                      Collection 3:
                      <br />
                      <span className="main_title">
                        The 2003 Meta Cricket Collection
                      </span>
                      <span className="sub_title"></span>
                    </Link>
                    <Link
                      className={`nav-label ${
                        active === "four" ? "active" : ""
                      }`}
                      to="#"
                      onClick={exe_scroll_four}
                    >
                      Collection 4:
                      <br />
                      <span className="main_title">
                        The 2011 Meta Cricket Collection
                      </span>
                      <span className="sub_title"></span>
                    </Link>
                  </div>
                </Navbar>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="video_sec">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="ab_21">
                  <h1>Welcome to Jump.trade NFTs</h1>
                  <div className="video_vimo">
                    <iframe
                      title="video-player"
                      width="700px"
                      height="350px"
                      src="https://player.vimeo.com/video/654484174?"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <section className="drops_list">
          {/* <section className="dropCard-Section juke_box" ref={r_seven}>
            <DropCard
              animateBtn={stanley_started && "blink-animate"}
              btnName="Auction Now"
              started={stanley_started}
              img="https://cdn.beyondlife.club/media/mail/stanlee_birthday.png"
              endDate={stanley_end_date}
              isEnded={stanley_ended}
              price="$30,000"
              priceTitle="Minimum Bid Price"
              setCheck={handleCheck}
              cardTitle="Stan Lee B'day Special"
              smallTitle="Honoring the legendary creator!"
              cardDesc="Being a legend is one… and being the creator of legends is another! As a tribute to Stan Lee, we present you exclusive and special birthday NFTs"
              dropTitle="About Collection"
              dropDescOne={
                <>
                  <p>
                    {" "}
                    To celebrate the legendary creator Jump.trade 99th B'day and
                    as a tribute to the co-creator of Chakra the Invincible, we
                    bring you highly collectible and rare NFTs to honor the
                    legendary creator! The winner of the Stan Lee birthday NFT
                    auction will not only get the digital assets but also its
                    physical collectibles! The NFT collection holds some gems
                    like:
                  </p>
                  <ul>
                    <li>
                      <b>
                        The original story treatment of Chakra the Invincible
                      </b>
                    </li>
                    <li>
                      <b>
                        Hand-signed lithographs of Chakra the Invincible,
                        including the special 'Rise of Infinitus' lithograph
                      </b>
                    </li>
                    <li>
                      <b>
                        A signed copy of the extremely rare first-ever Chakra
                        the Invincible comic book.
                      </b>
                    </li>
                    <li>
                      <b>
                        The original doodle sketch of a never-before-seen
                        unreleased character 'The Power of Percy the Gentle'.
                      </b>
                    </li>
                  </ul>
                </>
              }
              dropDescTwo="It can't get any better for any fan of the great Stan on his 99th Birthday! It's your biggest chance to lay your hands on this priceless NFT collection!              "
              auctionTitle={
                !stanley_started
                  ? "Auction starting in"
                  : stanley_ended
                  ? "Auction ended on"
                  : "Auction ending in"
              }
              auctionTime={stanley_time}
              additional="Additional Perk"
              additionalDesc={
                <>
                  Treasure box was indeed a great succeess. We witnessed a
                  massive count from our beyondlife.club fam, having claimed
                  their digital assets. The duration given was 48hours from the
                  launch (3rd January). Until next time, have a watch for more
                  stuffs lined up!
                  <div className="tr_btns">
               
                    <a
                      href="/guaranteed-gift-box"
                      className="an_g"
                      role="button"
                    >
                      Click here to know more
                    </a>
                  </div>
                </>
              }
              editionTitle="Editions"
              editionType="1/1"
              itemTitle=""
              itemType=""
              slug={categories[5]?.slug}
              catName={"cat-stanlee-bday-special"}
              enabled={categories[5]?.enabled}
              type={"category"}
              scroll={exe_scroll_email}
            />
          </section>
          <section className="dropCard-Section" ref={r_four}>
            <JukeDropCard
              animateBtn={juke_started && "blink-animate"}
              btnName="Sold Out"
              started={juke_started}
              endDate={juke_end_date}
              isEnded={juke_ended}
              img="https://cdn.beyondlife.club/media/mail/chakra_jumbo_juke_box.mp4"
              contentType={"video"}
              price="$25"
              priceTitle="Buy Price"
              setCheck={handleCheck}
              cardTitle="The Jumbo Juke Box"
              smallTitle="A Formidable Collection of Comic NFTs"
              cardDesc={
                <>
                  <a
                    className="text-whites"
                    target="_blank"
                    rel="noreferrer"
                    href="https://orangecomet.com"
                  >
                    {" "}
                    Orange Comet{" "}
                  </a>{" "}
                  and BeyondLife.club together present Jump.trade Chakra the
                  Invincible NFTs, the first Indian superhero co-created by him.
                  We're making this more special with our exclusive JUMBO JUKE
                  BOX - A collection of surprise NFTs!
                </>
              }
              dropTitle="About Collection"
              dropDescOne="You can own Chakra The Invincible's comic book covers and Chakra's animated videos.
              The Jumbo JukeBox - is one of a kind in every sense. An exclusive NFT offering to become a proud owner of unique comic book covers of Chakra The Invincible, co-created by Stan Lee. Your exploration starts here! 
              "
              dropDescTwo={
                <>
                  <p>
                    You open The Jumbo JukeBox, you hold a chance to find the
                    following:
                  </p>
                  <ul>
                    <li>
                      <b>Common and uncommon</b> editions of Chakra the
                      Invincible comic book cover, from its initial stage of
                      publication.
                    </li>
                    <li>
                      <b>Rare</b> editions of the same superhero comic book
                      cover, that has its storyline attached.
                    </li>
                    <li>
                      <b>Ultimate rare</b> comic book cover edition of Chakra
                      the Invincible, that speaks the essence of the entire
                      saga.
                    </li>
                    <li>
                      <b>Secret silver age</b> rare comic book cover editions
                      that will enlighten the ethnicity of Chakra the Invincible
                      comic.
                    </li>
                    <li>
                      And wait! Not just that,{" "}
                      <b>animated Chakra the Invincible videos</b> are also part
                      of the Jumbo JukeBox. Through these animated videos, you
                      will experience Chakra and his Universe.
                    </li>
                  </ul>
                </>
              }
              auctionTitle={
                !juke_started
                  ? "Juke box opens in"
                  : juke_ended
                  ? "Juke box ended on"
                  : "Juke box ending in"
              }
              auctionTime={juke_time}
              additional="Additional Perk"
              additionalDesc={
                <>
                  <p>Jumbo Jukebox with its perks attached: </p>
                  <ul>
                    <li>
                      Every Jukebox owner will receive a digital comic book
                      editions of the Chakra The Invincible saga (Issue - 01).
                    </li>
                    <li>
                      To add on, while the Jumbo Jukebox holder mints the NFT, a
                      random number of comic book editions, ranging from Issue -
                      02 to Issue - 25, will be allocated. This enhances
                      tradability.
                    </li>
                  </ul>
                  Treasure box was indeed a great succeess. We witnessed a
                  massive count from our beyondlife.club fam, having claimed
                  their digital assets. The duration given was 48hours from the
                  launch (3rd January). Until next time, have a watch for more
                  stuffs lined up!
                  <div className="tr_btns tr_btns_big">
                
                    <a
                      href="/guaranteed-gift-box"
                      className="an_g"
                      role="button"
                    >
                      Click here to know more
                    </a>
                  </div>
                </>
              }
              editionTitle="Items "
              editionType="5400"
              itemTitle=""
              itemType=""
              slug={categories[3]?.slug}
              catName={"cat-jumbo-juke-box"}
              type={"loot"}
              enabled={categories[3]?.enabled}
              scroll={exe_scroll_email}
            />
          </section>
          <section className="dropCard-Section" ref={r_five}>
            <DropCard
              animateBtn="blink-animate"
              btnName="Auction Now"
              started={auction_started}
              endDate={auction_end_date}
              isEnded={auction_ended}
              img="https://cdn.beyondlife.club/media/mail/abc.jpg"
              price="$1000"
              priceTitle="Minimum Bid Price"
              setCheck={handleCheck}
              cardTitle="Seven Chakra's Powers Video"
              smallTitle="An NFT Collection Featuring Chakra's Powers"
              cardDesc={
                <>
                  Chakra the Invincible is all about powers activated by the 7
                  chakras. In fact, it is these 7 'chakras' that make Chakra
                  invincible.{" "}
                  <a
                    className="text-whites"
                    target="_blank"
                    rel="noreferrer"
                    href="https://orangecomet.com"
                  >
                    Orange Comet's
                  </a>{" "}
                  distinctive NFT collection brings you unique 3D animations of
                  Chakra showing the 7 powers!
                </>
              }
              dropTitle="About Collection"
              dropDescOne="In celebration of Chakra's powers, the seven different 1/1 auctions each feature a different 3D animation showcasing his superhuman abilities will be presented as NFTs."
              dropDescTwo="These new NFT animations were created based on a grown-up version of Chakra that Stan Lee was developing for a live-action version of the character prior to his passing."
              dropDescThree={
                <>
                  The winner of each auction will also receive an extremely
                  limited Chakra The Invincible{" "}
                  <b>lithograph hand-signed by Stan Lee</b> several years ago,
                  and a <b>complete edition of 25 comic books.</b>
                </>
              }
              auctionTitle={
                !auction_started
                  ? "Auction starting in"
                  : auction_ended
                  ? "Auction ended on"
                  : "Auction ending in"
              }
              auctionTime={auction_time}
              additional="Additional Perk"
              additionalDesc={
                <>
                  Treasure box was indeed a great succeess. We witnessed a
                  massive count from our beyondlife.club fam, having claimed
                  their digital assets. The duration given was 48hours from the
                  launch (3rd January). Until next time, have a watch for more
                  stuffs lined up!
                  <div className="tr_btns">
             
                    <a
                      href="/guaranteed-gift-box"
                      className="an_g"
                      role="button"
                    >
                      Click here to know more
                    </a>
                  </div>
                </>
              }
              editionTitle="Editions"
              editionType="7/7"
              itemTitle=""
              itemType=""
              slug={categories[4]?.slug}
              catName={"cat-seven-chakra-powers"}
              type={"category"}
              enabled={categories[4]?.enabled}
              scroll={exe_scroll_email}
            />
          </section>
          <section className="dropCard-Section mistry_nft" ref={r_two}>
            <DropCard
              animateBtn="blink-animate"
              btnName="Auction Now"
              started={auction_started}
              endDate={auction_end_date}
              isEnded={auction_ended}
              img="https://cdn.beyondlife.club/media/mail/art_punks.jpg"
              price="$200"
              priceTitle="Minimum Bid Price"
              setCheck={handleCheck}
              isBuy
              cardTitle="Chakra Artpunks"
              smallTitle="A collection of exclusive stills of characters from prized Chakra comics!"
              cardDesc={
                <>
                  The Chakra comic collections feature a vast spectrum of
                  characters, each with their own signature attributes.{" "}
                  <a
                    className="text-whites"
                    target="_blank"
                    rel="noreferrer"
                    href="https://orangecomet.com"
                  >
                    Orange Comet
                  </a>{" "}
                  has brought these characters into the NFT world as a part of
                  the 'Chakraverse' with our Chakra Artpunks still collection!
                </>
              }
              dropTitle="About Collection"
              dropDescOne="Chakra the Invincible is a very special character brought to you by Stan Lee in collaboration with Sharad Devarajan and Gotham Chopra. BeyondLife.club, in its first-ever Hollywood-meets-Bollywood Superhero NFT collection, brings you Chakra Artpunks. As the name implies, the Chakra Artpunks is a series of stills that will depict various characters in the Chakra comics... each one with their own signature looks, accessories, and some very special signature elements that make these Jump.trade Chakra The Invincible NFTs an absolute collectible! "
              auctionTitle={
                !auction_started
                  ? "Auction starting in"
                  : auction_ended
                  ? "Auction ended on"
                  : "Auction ending in"
              }
              auctionTime={auction_time}
              additional="Additional Perk"
              additionalDesc={
                <>
                  Treasure box was indeed a great succeess. We witnessed a
                  massive count from our beyondlife.club fam, having claimed
                  their digital assets. The duration given was 48hours from the
                  launch (3rd January). Until next time, have a watch for more
                  stuffs lined up!
                  <div className="tr_btns">
                  
                    <a
                      href="/guaranteed-gift-box"
                      className="an_g"
                      role="button"
                    >
                      Click here to know more
                    </a>
                  </div>
                </>
              }
              editionTitle="Editions"
              editionType="15/15"
              itemTitle=""
              itemType=""
              slug={categories[1]?.slug}
              catName={"cat-chakra-artpunks"}
              type={"category"}
              enabled={categories[1]?.enabled}
              scroll={exe_scroll_email}
            />
          </section>*/}

          <section className="dropCard-Section" ref={r_one}>
            <DropCard
              animateBtn="blink-animate"
              btnName="Sold Out"
              img="https://cdn.guardianlink.io/product-hotspot/images/SuperLoot_SoldOut_9mins.m4v"
              // src={nftVideo}
              contentType={"video"}
              price="$25"
              priceTitle="Buy Price"
              started={loot_started}
              endDate={loot_end_date}
              isEnded={loot_ended}
              setCheck={handleCheck}
              cardTitle="The Super Loot"
              smallTitle="Your Ticket To Play And Win Cash Rewards In The MCL"
              cardDesc={
                <>
                  The Super Loot is a collection of 25000 loot boxes that
                  contain assured metaverse cricket player NFTs, using which you
                  can play in Meta Cricket League. Your Super Loot can also
                  contain Authenticated Signed Bat NFTs of cricket's biggest
                  legends from across the world.
                </>
              }
              dropTitle="About Collection"
              dropDescOne={
                <>
                  Each Super Loot contains:
                  <br />
                  <br />
                  <ul>
                    <li>2 Metaverse Cricket Player NFTs</li>
                    <span className="text-center">(OR)</span>
                    <li>
                      2 Metaverse Cricket Player NFTs + 1 Authenticated Signed
                      Bat NFT
                    </li>
                  </ul>
                </>
              }
              dropDescTwo="The Meta Cricket Player NFTs are playable and upgradeable, resulting in its value increasing both in game as well as on the marketplace. The Authenticated Signed Bat NFTs are collectible and playable NFT bats per our MCL roadmap."
              auctionTitle={
                !loot_started
                  ? "Loot opens in"
                  : loot_ended
                  ? "Loot ended on"
                  : "Loot ending in"
              }
              auctionTime={loot_time}
              additional="Additional Perk"
              additionalDesc={
                <>
                  Keeping up with the GuardianLink legacy of giving back to the
                  community, collectors who hold 5 Super Loot boxes will also
                  get to unlock the Treasure Box that contains coin rewards.
                  <br />
                  <br />
                  For every 5 Super Loot boxes you hold, you unlock 1 Treasure
                  Box!
                  <div className="tr_btns">
                    <button
                      className="access-treasure-btn"
                      role="button"
                      onClick={handleTreasureClick}
                    >
                      Access your Treasure Box
                      <img
                        width={60}
                        style={{ marginTop: "-22px" }}
                        alt="treasure"
                        src="https://cdn.guardianlink.io/product-hotspot/images/chest_box_2.gif"
                      />
                    </button>
                    {/* <a
                      href="/guaranteed-gift-box"
                      className="an_g"
                      role="button"
                    >
                      Click here to know more
                    </a> */}
                  </div>
                </>
              }
              catName={"cat-chakra-artpunks-loot-box"}
              slug={"4MQblyojUD3DwBrj"}
              type={"loot"}
              enabled={true}
              scroll={exe_scroll_email}
              editionTitle="Items"
              editionType="25000"
            />
          </section>

          <section className="dropCard-Section" ref={r_two}>
            <DropCard
              animateBtn="blink-animate"
              btnName="Bid Now"
              Id={"posters"}
              started={auction_started}
              endDate={auction_time1}
              isEnded={auction_ended1}
              img={
                "https://cdn.guardianlink.io/product-hotspot/images/WC83_IMMORTAL_1.mp4"
              }
              contentType={"video"}
              price="$25"
              priceTitle="Minimum Bid Price"
              setCheck={handleCheck}
              cardTitle="The 1983 Meta Cricket Collection"
              smallTitle="Signed Collectible NFT Bats From India's First Victorious Finals of 1983"
              cardDesc={
                <>
                  Jump.trade brings you highly collectible and immensely
                  valuable NFT cricket bats from the finals of the 1983 World
                  Cup, signed by the victorious Indian team. Also included in
                  this collection are one Legendary Meta Batsman Player and 1
                  Legendary Meta Bowler Player NFT.
                </>
              }
              dropTitle="About Collection"
              dropDescOne={
                <>
                  Contained within this collection is:
                  <br />
                  <br />
                  <ul>
                    <li>1 IMMORTAL BAT NFT signed by the 1983 Champions</li>
                    <li>1 LEGENDARY META BATSMAN PLAYER NFT</li>
                    <li>1 LEGENDARY META BOWLER PLAYER NFT</li>
                  </ul>
                </>
              }
              dropDescTwo="The Meta Cricket Player NFTs are playable and upgradeable, resulting in its value increasing both in game as well as on the marketplace. The Immortal NFT bats, in addition to being highly collectible, are also powerful playable NFT bats per our MCL roadmap."
              auctionTitle={
                !auction_started
                  ? "Auction starting in"
                  : auction_ended1
                  ? "Auction ended on"
                  : "Auction ending in"
              }
              auctionTime={auction_time1}
              additional=""
              additionalDesc={
                <>
                  <div className="tr_btns">
                    <a
                      href="/guaranteed-gift-box"
                      className="an_g"
                      role="button"
                    >
                      Click here to know more
                    </a>
                  </div>
                </>
              }
              editionTitle="Editions"
              editionType="1/1"
              itemTitle=""
              itemType=""
              slug={"VAqOGlvSb3Kygw8p"}
              catName={"cat-animated-living-comic-book-cover"}
              type={"category"}
              enabled={true}
              scroll={exe_scroll_email}
              year="1983"
              is3D
              setAuctionEndTime1={setAuctionEndTime1}
            />
          </section>
          <section className="dropCard-Section" ref={r_three}>
            <DropCard
              animateBtn="blink-animate"
              btnName="Bid Now"
              Id={"posters"}
              started={auction_started}
              endDate={auction_time2}
              isEnded={auction_ended2}
              img={
                "https://cdn.guardianlink.io/product-hotspot/images/WC2003_IMMORTAL_2.mp4"
              }
              contentType={"video"}
              price="$25"
              priceTitle="Minimum Bid Price"
              setCheck={handleCheck}
              cardTitle="The 2003 Meta Cricket Collection"
              smallTitle="Signed Collectible Bats Of The Finalist Teams From The 2003 Championship"
              cardDesc={
                <>
                  Jump.trade brings you highly collectible and immensely
                  valuable twin NFT cricket bats from the finals of the 2003
                  world cup, signed by both teams that played the finals. Also
                  included in this collection are one Epic Meta Batsman Player
                  and 1 Epic Meta Bowler Player NFT.
                </>
              }
              dropTitle="About Collection"
              dropDescOne={
                <>
                  Contained within this collection is:
                  <br />
                  <br />
                  <ul>
                    <li>
                      1 IMMORTAL DUAL BAT NFT signed by the 2003 Finalists
                    </li>
                    <li>1 EPIC META BATSMAN PLAYER NFT</li>
                    <li>1 EPIC META BOWLER PLAYER NFT</li>
                  </ul>
                </>
              }
              dropDescTwo="The Meta Cricket Player NFTs are playable and upgradeable, resulting in its value increasing both in game as well as on the marketplace. The Immortal NFT bats, in addition to being highly collectible, are also powerful playable NFT bats per our MCL roadmap."
              auctionTitle={
                !auction_started
                  ? "Auction starting in"
                  : auction_ended2
                  ? "Auction ended on"
                  : "Auction ending in"
              }
              auctionTime={auction_time2}
              additional=""
              additionalDesc={
                <>
                  <div className="tr_btns">
                    <a
                      href="/guaranteed-gift-box"
                      className="an_g"
                      role="button"
                    >
                      Click here to know more
                    </a>
                  </div>
                </>
              }
              editionTitle="Editions"
              editionType="1/1"
              itemTitle=""
              itemType=""
              slug={"31ENnjQSDW3ywe0R"}
              catName={"cat-animated-living-comic-book-cover"}
              type={"category"}
              enabled={true}
              scroll={exe_scroll_email}
              year="2003"
              is3D
              setAuctionEndTime2={setAuctionEndTime2}
            />
          </section>
          <section className="dropCard-Section" ref={r_four}>
            <DropCard
              animateBtn="blink-animate"
              btnName="Bid Now"
              Id={"posters"}
              started={auction_started}
              endDate={auction_time3}
              isEnded={auction_ended3}
              img={
                "https://cdn.guardianlink.io/product-hotspot/images/WC2011_IMMORTAL_3.mp4"
              }
              contentType={"video"}
              price="$25"
              priceTitle="Minimum Bid Price"
              setCheck={handleCheck}
              cardTitle="The 2011 Meta Cricket Collection"
              smallTitle="Signed Collectible NFTs from the prolific 2011 final match signed by the triumphant Indian team."
              cardDesc={
                <>
                  Jump.trade brings you a highly collectible and immensely
                  valuable NFT cricket bat from the finals of the 2011 World
                  Cup, signed by the victorious Indian team. Also included in
                  this collection are one Legendary Meta Batsman Player and 1
                  Legendary Meta Bowler Player NFT.
                </>
              }
              dropTitle="About Collection"
              dropDescOne={
                <>
                  Contained within this collection is:
                  <br />
                  <br />
                  <ul>
                    <li>1 IMMORTAL BAT NFT signed by the 2011 Champions</li>
                    <li>1 LEGENDARY META BATSMAN PLAYER NFT</li>
                    <li>1 LEGENDARY META BOWLER PLAYER NFT</li>
                  </ul>
                </>
              }
              dropDescTwo="The Meta Cricket Player NFTs are playable and upgradeable, resulting in its value increasing both in game as well as on the marketplace. The Immortal NFT bats, in addition to being highly collectible, are also powerful playable NFT bats per our MCL roadmap."
              auctionTitle={
                !auction_started
                  ? "Auction starting in"
                  : auction_ended3
                  ? "Auction ended on"
                  : "Auction ending in"
              }
              auctionTime={auction_time3}
              additional=""
              additionalDesc={
                <>
                  <div className="tr_btns">
                    <a
                      href="/guaranteed-gift-box"
                      className="an_g"
                      role="button"
                    >
                      Click here to know more
                    </a>
                  </div>
                </>
              }
              editionTitle="Editions"
              editionType="1/1"
              itemTitle=""
              itemType=""
              slug={"O39gydkSlLBPYZob"}
              catName={"cat-animated-living-comic-book-cover"}
              type={"category"}
              enabled={true}
              scroll={exe_scroll_email}
              year="2011"
              is3D
              setAuctionEndTime3={setAuctionEndTime3}
            />
          </section>
        </section>

        {/* <section className="drop-newsletter" id="drop_newsletter" ref={r_email}>
          <div className="container">
            <div className="row">
              {auction_started ? (
                <h1>
                  <span className="big_text">Be Informed On Our Next NFTs</span>{" "}
                  <br />
                  Subscribe To Our Newsletter
                </h1>
              ) : (
                <>
                  <h1 className="text-size">
                    Join the Jump.trade#CricketGameNFT Waitlist
                  </h1>
                  <h5 className="text-para-size">
                    Sign up to follow the latest Jump.trade cricket game NFT
                    news and announcements. Stay updated on all our future
                    expansions and every step of our roadmap including the
                    Metaverse Cricket World Cup and the DAO of the game’s
                    future!
                  </h5>
                </>
              )}
            </div>
            <Form
              id="nft_form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendNewsLetter();
                return false;
              }}
            >
              <Form.Group className="formGroup mb-3" controlId="formBasicEmail">
                <Form.Control
                  className="nft_form_email"
                  type="email"
                  disabled={loading}
                  name="Nemail"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  className="nft_form"
                  disabled={loading}
                  type="button"
                  onClick={handleSendNewsLetter}
                >
                  {loading ? (
                    <BiLoaderAlt className="fa fa-spin" />
                  ) : (
                    <HiOutlineArrowRight />
                  )}
                </Button>
              </Form.Group>
              <p className="nft_email_error">{vEmail}</p>
            </Form>
          </div>
        </section> */}
      </div>

      <Modal className="tr_box" show={modal} centered>
        <Modal.Body>
          <div className="tr_info">
            {nftCount >= 5 ? (
              <>
                <div className="cong_box">
                  <h3>Congratulations!!</h3>
                  <img
                    alt=""
                    loop
                    muted
                    autoPlay
                    playsInline
                    src="https://cdn.guardianlink.io/product-hotspot/images/treasure-open-with-bg-01.gif"
                  ></img>
                  <h2>
                    The Treasure Box is yours to unlock and win rewards! The
                    Treasure Box arrives on 30th April 2022, 7:00 PM IST.
                  </h2>
                  <h2>Stay tuned!</h2>
                  <button
                    type="button"
                    className="tr_btn"
                    onClick={() => history.push("/my-treasure-box")}
                  >
                    Go to Treasure Box
                  </button>
                  {/* <a
                    className="tr_btn"
                    role={"button"}
                    onClick={() => setModal(!modal)}
                  >
                    Okay
                  </a> */}
                </div>
              </>
            ) : nftCount === 0 ? (
              <>
                <h2>
                  The Treasure Box is available only to those who have collected
                  5 or more NFTs in the MCL SuperLoot... But Worry Not! We may
                  have more Treasure Boxes in our future drops! Stay Tuned!
                </h2>
                <a
                  className="tr_btn"
                  role={"button"}
                  onClick={() => setModal(!modal)}
                >
                  Okay
                </a>
              </>
            ) : (
              <>
                <h2>
                  {/* Congrats on the purchase of {nftCount} NFTs! <br /> You,
                  however, got to get {5 - nftCount} more NFTs to make yourself
                  eligible to access the Treasure Box! <br />
                  You have only {nftCount} NFTs, still you have to buy{" "}
                  {5 - nftCount} NFTs */}
                  The Treasure Box is available only to those who have collected
                  5 or more NFTs in the MCL SuperLoot... But Worry Not! We may
                  have more Treasure Boxes in our future drops! Stay Tuned!
                </h2>
                <a
                  className="tr_btn"
                  role={"button"}
                  onClick={() => setModal(!modal)}
                >
                  Okay
                </a>
              </>
            )}
          </div>

          <BiX
            role="button"
            size={45}
            className="rounded-pill close_btn"
            onClick={() => setModal(false)}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewDropsTemp2;
