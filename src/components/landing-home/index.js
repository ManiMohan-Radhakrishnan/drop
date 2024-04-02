import React, { useRef, useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import Header from "./header";
import HeroTop from "./hero-top";
import TimerSection from "./timer-section";
import PlaySection from "./play-seciton";
import ChampSection from "./champ-section";
import RoadMap from "./road-map";
import PartnerSection from "./partner-section";
import JoinSection from "./join-section";
import Footer from "./footer";
import SuperLoot from "./super-loot";
import CallToAction from "./call-to-action";
import OurTeam from "./our-team";
import OurInvestor from "./our-investors";
import OurTeamBeyond from "./our-team-beyond";
import NftCollectionVideo from "./nft-collection-section";
import NFTCounter from "../nft-counter";
import HeroTopSec from "./hero-top-sec";
import NftBatBid from "../nft-bat-bid";
import HeroTopThird from "./hero-top-third";

// import "./style.scss";

const LandingHome = () => {
  const { hash } = useLocation();
  const [sticky, setSticky] = useState(false);

  const [live, set_live] = useState(true);
  const [auction_live, set_auction_live] = useState(true);

  const market_start_date = "May 04, 2022 12:30:00";
  const auction_start_date = "Apr 22, 2022 10:30:00";

  const [market_time, set_market_time] = useState();
  const [auction_time, set_auction_time] = useState();

  const timeFunction = (check = false) => {
    var offset = new Date().getTimezoneOffset();

    var market_start_date_utc = new Date(market_start_date);
    market_start_date_utc.setMinutes(
      market_start_date_utc.getMinutes() - offset
    );

    var auction_start_date_utc = new Date(auction_start_date);
    auction_start_date_utc.setMinutes(
      auction_start_date_utc.getMinutes() - offset
    );

    var s_time = new Date();

    if (check) s_time.setSeconds(s_time.getSeconds() + 2);
    console.log("🚀 ~ file: index.js ~ line 56 ~ timeFunction ~ check", check);

    if (new Date(market_start_date_utc) < s_time) {
      set_live(true);
    } else {
      set_market_time(market_start_date_utc);

      set_live(false);
    }

    if (new Date(auction_start_date_utc) < s_time) {
      set_auction_live(true);
    } else {
      set_auction_time(auction_start_date_utc);

      set_auction_live(false);
    }
  };

  useEffect(() => {
    timeFunction(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheck = () => {
    timeFunction(true);
  };

  const r_one = useRef(null);
  const r_two = useRef(null);
  const r_three = useRef(null);
  const r_ourteam = useRef(null);
  const header_ref = useRef(null);

  useEffect(() => {
    if (hash === "#join") {
      r_one.current.scrollIntoView();
    } else if (hash === "#drops") {
      r_two.current.scrollIntoView();
    } else if (hash === "#roadmap") {
      r_three.current.scrollIntoView();
    } else if (hash === "#ourteam") {
      r_ourteam.current.scrollIntoView();
    }
  }, [hash]);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, true);
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });

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
      <Header sticky={sticky} />

      {/* <HeroTop /> */}
      {/* <HeroTopSec /> */}
      <HeroTopThird />
      <div ref={header_ref}></div>
      <div ref={r_one}></div>

      {/* {live ? <NftBatBid /> : <TimerSection />} */}
      <TimerSection live={live} launchTime={market_time} />

      <NftBatBid live={auction_live} auction_time={auction_time} />

      {/* <NftBatBid /> */}
      <div ref={r_two}></div>
      {/* <SuperLoot /> */}
      <NftCollectionVideo />
      <PlaySection />
      <ChampSection />

      <div ref={r_three}></div>
      <RoadMap />
      <CallToAction />
      <div ref={r_ourteam}></div>

      <OurTeam />
      <OurInvestor />
      <OurTeamBeyond />

      {/* <ChampSection />
      
      <RoadMap />
      <ChampSection />
      {/* <RoadMap /> */}
      {/* <PartnerSection /> */}
      <JoinSection />
      <Footer />
      <div style={{ display: "none" }}>
        {market_time && (
          <NFTCounter time={market_time} handleEndEvent={handleCheck} />
        )}
      </div>

      <div style={{ display: "none" }}>
        {auction_time && (
          <NFTCounter time={auction_time} handleEndEvent={handleCheck} />
        )}
      </div>
    </>
  );
};
export default LandingHome;
