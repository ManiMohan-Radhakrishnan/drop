import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { BiLoaderAlt } from "react-icons/bi";
import { Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { HiOutlineArrowRight } from "react-icons/hi";
// import nftVideo from "../../images/cric/img/video/nftCollection.m4v";
import cric from "../../../images/cric/img/playtowin.jpg";
import dummy_bat from "../../../images/cric/dummy_bat.png";
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

import guardianlogo from "../../../images/guardianlink.svg";

import { sendEmailNewletter } from "../../../api/axios-newsletter";
import { validateEmail } from "./../../../utils/common";
import { treasureCheck } from "../../../api/methods";
import "./style.scss";

import play from "../../../images/play.png";
import playBtn from "../../../images/play-btn.png";
import { VscClose } from "react-icons/vsc";
import { BsPlayFill } from "react-icons/bs";

const RaddxCollectionList = ({
  active,
  exe_scroll_one,
  exe_scroll_two,
  exe_scroll_three,
  exe_scroll_four,
  exe_scroll_five,
  exe_scroll_six,
}) => {
  const history = useHistory();
  const { hash } = useLocation();

  const [nftCount, setNftCount] = useState(0);

  const { user } = useSelector((state) => state.user.data);

  return (
    <>
      <section className="raddax-collection" id="ab_3">
        <div className="">
          <div className="navigation-tab">
            <div className="app-showcase">
              <Navbar className="kd-feature-tabs">
                <div className="nav nav-tabs sticky-tabs">
                  <Link
                    to="#"
                    className={`nav-label ${active === "one" ? "active" : ""}`}
                    onClick={exe_scroll_one}
                  >
                    RADDX LOOT BOX
                  </Link>
                  <Link
                    to="#"
                    onClick={exe_scroll_two}
                    className={`nav-label ${active === "two" ? "active" : ""}`}
                  >
                    DIGITAL LANDBOX
                  </Link>
                  <Link
                    className={`nav-label ${
                      active === "three" ? "active" : ""
                    }`}
                    to="#"
                    onClick={exe_scroll_three}
                  >
                    VINTAGE CAR AUCTION
                  </Link>
                  <Link
                    className={`nav-label ${active === "four" ? "active" : ""}`}
                    to="#"
                    onClick={exe_scroll_four}
                  >
                    INVISIBLE CAR AUCTION
                  </Link>
                  <Link
                    className={`nav-label ${active === "five" ? "active" : ""}`}
                    to="#"
                    onClick={exe_scroll_five}
                  >
                    BATTLE CAR AUCTION
                  </Link>
                  <Link
                    className={`nav-label ${active === "six" ? "active" : ""}`}
                    to="#"
                    onClick={exe_scroll_six}
                  >
                    $1 SUPER LOOT BOX
                  </Link>
                </div>
              </Navbar>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RaddxCollectionList;
