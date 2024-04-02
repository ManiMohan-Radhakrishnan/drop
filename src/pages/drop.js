import React, { useState, useEffect, useRef } from "react";
// import Header from "../components/header";
// import Landing from "../components/landing";
import LandingHome from "../components/landing-home";
// import NewDropsTemp2 from "../components/new-drops-temp2";
import toaster from "../utils/toaster";
import { nftCategoriesApi } from "../api/methods";

import { setCookiesByName, removeCookiesByName } from "../utils/cookies";
import useQuery from "../hook/useQuery";
// import Footer from "../components/landing-home/footer";
import CallToAction from "../components/landing-home/call-to-action";
import Header from "../components/landing-home/header";
import Footer from "../components/raddax-nft/footer";
import Faq from "../components/raddax-nft/faq";
import Community from "../components/raddax-nft/community";
// import RoadMap from "../components/landing-home/road-map";
import OurTeam from "../components/landing-home/our-team";
import OurInvestor from "../components/landing-home/our-investors";
import OurTeamBeyond from "../components/landing-home/our-team-beyond";

import { useLocation } from "react-router-dom";
import BannerSection from "../components/landing-home/banner-section";
import TralierSection from "../components/landing-home/tralier-section/index";
import RaddxCollectionList from "../components/landing-home/raddx-collection-list/index";

import LootSectionOne from "../components/landing-home/loot-section-one";
import LootSectionTwo from "../components/landing-home/loot-section-two/index";
import VintageCar from "../components/landing-home/vintage-car";
import InvisibleCar from "../components/landing-home/invisible-car";
import BattleCar from "../components/landing-home/battle-car";
import LootSectionSix from "../components/landing-home/loot-section-six";
import ReferWin from "../components/raddax-nft/refer-win";
import RoadMap from "../components/raddax-nft/road-map";
import JoinWaitList from "../components/landing-home/join-wait-list";

import SensationalNftCar from "../components/sensational-nft-car";
import AppHelmet from "../components/helmet";

import {
  auction_details_thunk,
  auction_order_details_thunk,
  loot_details_thunk,
} from "../redux/thunk/user_thunk";
import { useDispatch, useSelector } from "react-redux";
import "../styles/style.scss";
import { bidDetail } from "../api/actioncable-methods";
import RaddxWhitePaperSection from "../components/game-banner-two";

const Drop = ({ hideMenus = false }) => {
  let query = useQuery();
  const { hash } = useLocation();

  const r_ourteam = useRef(null);
  const raddx_prebook_start_date = "Mar 09 2023 11:30:00";

  const [raddx_loot_prebook_time, set_raddx_time] = useState();

  const digital_landbox_start_date = "Mar 09 2023 11:30:00";

  const [digital_landbox_prebook_time, set_digital_landbox_time] = useState();

  const raddx_auction_start_date = "Apr 05 2023 06:30:00";

  const [raddx_auction_time, set_raddx_auction_time] = useState();

  const super_loot_start_date = "Apr 12 2023 12:30:00";

  const [super_loot_time, set_super_loot_time] = useState();

  const timeFunction = (check = false) => {
    var offset = new Date().getTimezoneOffset();

    var raddx_prebook_start_date_utc = new Date(raddx_prebook_start_date);
    raddx_prebook_start_date_utc.setMinutes(
      raddx_prebook_start_date_utc.getMinutes() - offset
    );

    var digital_landboxprebook_start_date_utc = new Date(
      digital_landbox_start_date
    );
    digital_landboxprebook_start_date_utc.setMinutes(
      digital_landboxprebook_start_date_utc.getMinutes() - offset
    );

    var raddx_auction_start_date_utc = new Date(raddx_auction_start_date);
    raddx_auction_start_date_utc.setMinutes(
      raddx_auction_start_date_utc.getMinutes() - offset
    );

    var super_loot_start_date_utc = new Date(super_loot_start_date);
    super_loot_start_date_utc.setMinutes(
      super_loot_start_date_utc.getMinutes() - offset
    );

    var s_time = new Date();

    if (check) s_time.setSeconds(s_time.getSeconds() + 2);

    if (new Date(raddx_prebook_start_date_utc) < s_time) {
    } else {
      set_raddx_time(raddx_prebook_start_date_utc);
    }

    if (new Date(digital_landboxprebook_start_date_utc) < s_time) {
    } else {
      set_digital_landbox_time(digital_landboxprebook_start_date_utc);
    }

    if (new Date(raddx_auction_start_date_utc) < s_time) {
    } else {
      set_raddx_auction_time(raddx_auction_start_date_utc);
    }

    if (new Date(super_loot_start_date_utc) < s_time) {
    } else {
      set_super_loot_time(super_loot_start_date_utc);
    }
  };

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    timeFunction(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (hash === "#roadmap") {
  //     r_three.current.scrollIntoView();
  //   } else if (hash === "#ourteam") {
  //     r_ourteam.current.scrollIntoView();
  //   }
  // }, [hash]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);

  const loginStatus = user?.login;

  const [lootItemsRaddx, setLootItemsRaddx] = useState({});
  const [lootItemsLand, setLootItemsLand] = useState({});
  const [superLootItems, setSuperLootItems] = useState({});
  const [orderSlug, setOrderSlug] = useState();

  const [auctionVintageCar, setAuctionVintageCar] = useState({});
  const [vintageCarCurrentBid, setVintageCarCurrentBid] = useState(0);
  const [vintageAuctionEndTime, setVintageAuctionEndTime] = useState("");

  const [auctionInvisibleCar, setAuctionInvisibleCar] = useState({});
  const [invisibleCarCurrentBid, setInvisibleCarCurrentBid] = useState(0);
  const [invisibleAuctionEndTime, setInvisibleAuctionEndTime] = useState("");

  const [auctionBattleCar, setAuctionBattleCar] = useState({});
  const [battleCarCurrentBid, setBattleCarCurrentBid] = useState(0);
  const [battleAuctionEndTime, setBattleAuctionEndTime] = useState("");

  const raddxLootSlug = process.env.REACT_APP_RADDX_LOOT_BOX_SLUG;
  const raddxLandSlug = process.env.REACT_APP_RADDX_LAND_SLUG;
  const raddxSuperLoot = process.env.REACT_APP_ONE_DOLLER_SLUG;

  const raddxVintageCarSlug = process.env.REACT_APP_RADDX_VINTAGE_CAR_SLUG;
  const raddxInvisibleCarSlug = process.env.REACT_APP_RADDX_INVISIBLE_CAR_SLUG;
  const raddxBattleCarSlug = process.env.REACT_APP_RADDX_BATTLE_CAR_SLUG;

  const dispatchCallback = (result) => {
    if (result?.status === 200) {
      setLootItemsRaddx(result?.data?.data?.loot);
    }
    setLoading(false);
    // if (loading) setLoad;
  };
  const dispatchCallbackLand = (result) => {
    if (result?.status === 200) {
      setLootItemsLand(result?.data?.data?.loot);
    }
    setLoading(false);
  };
  const dispatchCallbackVintageCar = (result) => {
    if (result?.status === 200) {
      setAuctionVintageCar(result?.data?.data?.nft);
      setVintageCarCurrentBid(
        result?.data?.data?.nft?.order_details?.minimum_bid ||
          result?.data?.data?.nft?.order_details?.starting_bid
      );
      setVintageAuctionEndTime(
        result?.data?.data?.nft?.order_details?.auction_end_time
      );
    }
    setLoading(false);
  };
  const dispatchCallbackInvisibleCar = (result) => {
    if (result?.status === 200) {
      setAuctionInvisibleCar(result?.data?.data?.nft);
      setInvisibleCarCurrentBid(
        result?.data?.data?.nft?.order_details?.minimum_bid ||
          result?.data?.data?.nft?.order_details?.starting_bid
      );
      setInvisibleAuctionEndTime(
        result?.data?.data?.nft?.order_details?.auction_end_time
      );
    }
    setLoading(false);
  };
  const dispatchCallbackBattleCar = (result) => {
    if (result?.status === 200) {
      setAuctionBattleCar(result?.data?.data?.nft);
      setBattleCarCurrentBid(
        result?.data?.data?.nft?.order_details?.minimum_bid ||
          result?.data?.data?.nft?.order_details?.starting_bid
      );
      setBattleAuctionEndTime(
        result?.data?.data?.nft?.order_details?.auction_end_time
      );
    }
    setLoading(false);
  };

  const dispatchCallbackSuperLoot = (result) => {
    if (result?.status === 200) {
      setSuperLootItems(result?.data?.data?.loot);
    }
    setLoading(false);
  };

  useEffect(() => {
    dataReloadLoot1();
    dataReloadLoot2();
    dataReloadLoot3();
    dataReloadAuctionVintageCar();
    dataReloadAuctionInvisibleCar();
    dataReloadAuctionBattleCar();
    // setLootItemsRaddx({
    //   slug: "b7V03aOSqyB7zx92",
    //   name: "Raddx 1",
    //   auction_start_time: "2023-03-20T08:15:00.000Z",
    //   auction_end_time: "2023-04-23T08:05:00.000Z",
    //   total_quantity: 30000,
    //   buy_amount: "25.0",
    //   qty_per_order: 100,
    //   qty_per_user: 100,
    //   flow_status: "buy",
    //   available_qty: 10000,
    //   preorder_start_time: "2023-03-11T12:58:00.000Z",
    //   preorder_og_start_time: "2023-03-10T01:45:00.000Z",
    //   preorder_end_time: "2023-03-20T08:11:00.000Z",
    //   preorder_qty_per_user: 100,
    //   preorder_qty_per_order: 100,
    //   current_time: "2023-01-09T08:01:45.301Z",
    //   purchased_qty: 1,
    //   preorder_reserved_qty: 1,
    //   og_user: false,
    // });
    // setLootItemsLand({
    //   slug: "eoX1rQ1Ji9aYE6wR",
    //   name: "Raddx 1",
    //   auction_start_time: "2023-03-20T08:15:00.000Z",
    //   auction_end_time: "2023-03-23T14:20:00.000Z",
    //   total_quantity: 500,
    //   buy_amount: "1599.0",
    //   qty_per_order: 100,
    //   qty_per_user: 100,
    //   available_qty: 10000,
    //   flow_status: "assign",
    //   preorder_start_time: "2023-03-03T12:10:00.000Z",
    //   preorder_og_start_time: "2023-03-03T12:07:00.000Z",
    //   preorder_end_time: "2023-03-20T08:11:00.000Z",
    //   preorder_qty_per_user: 100,
    //   preorder_qty_per_order: 100,
    //   current_time: "2023-01-09T08:01:45.301Z",
    //   purchased_qty: 1,
    //   preorder_reserved_qty: 10,
    // });

    // setAuctionVintageCar({
    //   slug: "VZWKN80Spx0N1q2y",
    //   name: "Raddx 1",
    //   auction_start_time: "2023-03-21T12:15:00.000Z",
    //   auction_end_time: "2023-03-21T20:25:00.000Z",
    //   total_quantity: 500,
    //   buy_amount: "1599.0",
    //   qty_per_order: 100,
    //   qty_per_user: 100,
    //   available_qty: 10000,
    //   preorder_qty_per_user: 100,
    //   preorder_qty_per_order: 100,
    //   current_time: "2023-03-13T08:01:45.301Z",
    //   purchased_qty: 1,
    //   preorder_reserved_qty: 10,
    // });

    // setAuctionInvisibleCar({
    //   slug: "VZWKN80Spx0N1q2y",
    //   name: "Raddx 1",
    //   auction_start_time: "2023-03-21T12:15:00.000Z",
    //   auction_end_time: "2023-03-21T20:25:00.000Z",
    //   total_quantity: 500,
    //   buy_amount: "1599.0",
    //   qty_per_order: 100,
    //   qty_per_user: 100,
    //   available_qty: 10000,
    //   preorder_qty_per_user: 100,
    //   preorder_qty_per_order: 100,
    //   current_time: "2023-03-13T08:01:45.301Z",
    //   purchased_qty: 1,
    //   preorder_reserved_qty: 10,
    // });

    // setAuctionBattleCar({
    //   slug: "VZWKN80Spx0N1q2y",
    //   name: "Raddx 1",
    //   auction_start_time: "2023-03-21T12:15:00.000Z",
    //   auction_end_time: "2023-03-21T20:25:00.000Z",
    //   total_quantity: 500,
    //   buy_amount: "1599.0",
    //   qty_per_order: 100,
    //   qty_per_user: 100,
    //   available_qty: 10000,
    //   preorder_qty_per_user: 100,
    //   preorder_qty_per_order: 100,
    //   current_time: "2023-03-13T08:01:45.301Z",
    //   purchased_qty: 1,
    //   preorder_reserved_qty: 10,
    // });
    // setSuperLootItems({
    //   auction_end_time: "2023-04-15T10:19:04.947Z",
    //   auction_start_time: "2023-04-11T11:19:51.405Z",
    //   available_qty: 94,
    //   buy_amount: "1.0",
    //   current_time: "2023-04-11T11:12:47.967Z",
    //   flow_status: "buy",
    //   loot_asserts: [
    //     { name: "jump_point", percentage: "100.0" },
    //     { name: "reward_point", percentage: "100.0" },
    //   ],
    //   name: "$1 RADDX SUPER LOOT BOX",
    //   offer_price: null,
    //   offer_quantity: null,
    //   og_user: false,
    //   preorder_end_time: null,
    //   preorder_offer_price: null,
    //   preorder_offer_quantity: null,
    //   preorder_og_start_time: null,
    //   preorder_qty_per_order: null,
    //   preorder_qty_per_user: null,
    //   preorder_reserved_qty: null,
    //   preorder_start_time: null,
    //   purchased_qty: 0,
    //   qty_per_order: 1,
    //   qty_per_user: 0,
    //   slug: "rd2GDa7YiD5Pwyp7",
    //   total_quantity: 100,
    // });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginStatus]);

  const dataReloadLoot1 = () => {
    // setLoading(true);
    setLootItemsRaddx({
      slug: "Kp5bJ6EaTVx612oE",
      name: "RADDX LOOT BOX",
      auction_start_time: "2023-04-05T16:00:00.000Z",
      auction_end_time: "2023-04-08T12:29:59.000Z",
      total_quantity: 15000,
      buy_amount: "25.0",
      offer_quantity: 5,
      offer_price: 120,
      qty_per_order: 5,
      preorder_start_time: "2023-03-10T11:30:00.000Z",
      preorder_end_time: "2023-03-13T11:30:00.000Z",
      preorder_qty_per_user: 30000,
      available_qty: 0,
      preorder_og_start_time: "2023-03-09T11:30:00.000Z",
      preorder_offer_quantity: 5,
      preorder_offer_price: 120,
      preorder_qty_per_order: 30000,
      current_time: "2023-04-07T10:15:46.892Z",
      flow_status: "buy",
      loot_asserts: [
        {
          name: "jump_point",
          percentage: "100.0",
        },
        {
          name: "reward_point",
          percentage: "100.0",
        },
      ],
    });
    // dispatch(
    //   loot_details_thunk({
    //     data: { slug: raddxLootSlug },
    //     callback: dispatchCallback,
    //   })
    // );
  };
  const dataReloadLoot2 = () => {
    // setLoading(true);
    // dispatch(
    //   loot_details_thunk({
    //     data: { slug: raddxLandSlug },
    //     callback: dispatchCallbackLand,
    //   })
    // );
    setLootItemsLand({
      slug: "BnkWbZleTYX67lKj",
      name: "DIGITAL LANDBOX",
      auction_start_time: "2023-04-07T12:30:00.000Z",
      auction_end_time: "2023-04-07T12:35:00.000Z",
      total_quantity: 500,
      buy_amount: "1599.0",
      offer_quantity: null,
      offer_price: null,
      qty_per_order: 500,
      preorder_start_time: "2023-03-10T11:30:00.000Z",
      preorder_end_time: "2023-03-13T11:30:00.000Z",
      preorder_qty_per_user: 500,
      available_qty: 0,
      preorder_og_start_time: "2023-03-09T11:30:00.000Z",
      preorder_offer_quantity: null,
      preorder_offer_price: null,
      preorder_qty_per_order: 500,
      current_time: "2023-04-07T12:40:01.076Z",
      flow_status: "buy",
      loot_asserts: [
        {
          name: "jump_point",
          percentage: "100.0",
        },
        {
          name: "reward_point",
          percentage: "100.0",
        },
      ],
    });
  };
  const dataReloadLoot3 = () => {
    // setLoading(true);
    // dispatch(
    //   loot_details_thunk({
    //     data: { slug: raddxSuperLoot },
    //     callback: dispatchCallbackSuperLoot,
    //   })
    // );
    setSuperLootItems({
      auction_end_time: "2023-04-12T12:31:04.947Z",
      auction_start_time: "2023-04-12T12:30:51.405Z",
      available_qty: 0,
      buy_amount: "1.0",
      current_time: "2023-04-11T11:12:47.967Z",
      flow_status: "buy",
      loot_asserts: [
        { name: "jump_point", percentage: "100.0" },
        { name: "reward_point", percentage: "100.0" },
      ],
      name: "$1 RADDX SUPER LOOT BOX",
      offer_price: null,
      offer_quantity: null,
      og_user: false,
      preorder_end_time: null,
      preorder_offer_price: null,
      preorder_offer_quantity: null,
      preorder_og_start_time: null,
      preorder_qty_per_order: null,
      preorder_qty_per_user: null,
      preorder_reserved_qty: null,
      preorder_start_time: null,
      purchased_qty: 0,
      qty_per_order: 1,
      qty_per_user: 0,
      slug: "rd2GDa7YiD5Pwyp7",
      total_quantity: 100,
    });
  };

  const dataReloadAuctionVintageCar = () => {
    setLoading(true);
    dispatch(
      auction_details_thunk({
        data: { slug: raddxVintageCarSlug },
        callback: dispatchCallbackVintageCar,
      })
    );
  };
  const dataReloadAuctionInvisibleCar = () => {
    setLoading(true);
    dispatch(
      auction_details_thunk({
        data: { slug: raddxInvisibleCarSlug },
        callback: dispatchCallbackInvisibleCar,
      })
    );
  };
  const dataReloadAuctionBattleCar = () => {
    setLoading(true);
    dispatch(
      auction_details_thunk({
        data: { slug: raddxBattleCarSlug },
        callback: dispatchCallbackBattleCar,
      })
    );
  };

  // const dataReloadAuctionOrderVintageCar = () => {
  //   setLoading(true);
  //   dispatch(
  //     auction_order_details_thunk({
  //       data: { ...auctionVintageCar },
  //       callback: dispatchCallbackVintageCar,
  //     })
  //   );
  // };

  const fsz = query.get("fsz");

  const [trigger, setTrigger] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [active, setActive] = useState();

  const r_one = useRef(null);
  const r_two = useRef(null);
  const r_three = useRef(null);
  const r_four = useRef(null);
  const r_five = useRef(null);
  const r_six = useRef(null);

  const exe_scroll_one = () => {
    r_one.current.scrollIntoView();
    setActive("one");
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

  const exe_scroll_five = () => {
    r_five.current.scrollIntoView();
    setActive("five");
  };

  const exe_scroll_six = () => {
    r_six.current.scrollIntoView();
    setActive("six");
  };

  useEffect(() => {
    // nftCategories(1);

    if (fsz) {
      sessionStorage.setItem("fsz", fsz);
      setCookiesByName("source", fsz);
    } else {
      removeCookiesByName("source");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  useEffect(() => {
    bidDetail(auctionVintageCar?.order_details?.slug, (data) => {
      setVintageCarCurrentBid(data?.minimum_bid);
      if (data?.auction_end_time) {
        setVintageAuctionEndTime(data?.auction_end_time);
      }
    });
    bidDetail(auctionInvisibleCar?.order_details?.slug, (data) => {
      setInvisibleCarCurrentBid(data?.minimum_bid);
      if (data?.auction_end_time) {
        setInvisibleAuctionEndTime(data?.auction_end_time);
      }
    });
    bidDetail(auctionBattleCar?.order_details?.slug, (data) => {
      setBattleCarCurrentBid(data?.minimum_bid);
      if (data?.auction_end_time) {
        setBattleAuctionEndTime(data?.auction_end_time);
      }
    });
  }, [
    auctionVintageCar?.order_details?.slug,
    auctionInvisibleCar?.order_details?.slug,
    auctionBattleCar?.order_details?.slug,
  ]);

  return (
    <>
      <AppHelmet
        title={"Car NFTs | Digital Lands | RADDX Racing Game Metaverse"}
        description={
          "The RADDX Car Racing Game Metaverse Brings You A Garage Of Super-Awesome Racing Cars, Accessories, & Rewards. You Can Even Own Digital Land!"
        }
        image={
          "https://cdn.guardianlink.io/product-hotspot/images/raddx/Raddx-Banner-OGimage-Feb13.jpg"
        }
      />
      <div className={`${loading && "loader-home image-loader"}`}>
        {!hideMenus && <Header sticky={sticky} />}
        <div ref={r_one}></div>

        <BannerSection exe_scroll_two={exe_scroll_six} hideMenus={hideMenus} />
        <TralierSection />
        <JoinWaitList />
        <RaddxCollectionList
          active={active}
          exe_scroll_one={exe_scroll_one}
          exe_scroll_two={exe_scroll_two}
          exe_scroll_three={exe_scroll_three}
          exe_scroll_four={exe_scroll_four}
          exe_scroll_five={exe_scroll_five}
          exe_scroll_six={exe_scroll_six}
        />
        <div ref={r_one}></div>
        <LootSectionOne
          details={lootItemsRaddx}
          preBookStartTime={
            lootItemsRaddx.og_user
              ? lootItemsRaddx.preorder_og_start_time
              : lootItemsRaddx.preorder_start_time
          }
          dataReload={dataReloadLoot1}
          hideMenus={hideMenus}
        />
        <div ref={r_two}></div>
        <LootSectionTwo
          details={lootItemsLand}
          preBookStartTime={
            lootItemsLand.og_user
              ? lootItemsLand.preorder_og_start_time
              : lootItemsLand.preorder_start_time
          }
          dataReload={dataReloadLoot2}
        />
        <div ref={r_three}></div>
        <VintageCar
          details={auctionVintageCar}
          currentBid={vintageCarCurrentBid}
          auctionEndTime={vintageAuctionEndTime}
        />
        <div ref={r_four}></div>
        <InvisibleCar
          details={auctionInvisibleCar}
          currentBid={invisibleCarCurrentBid}
          auctionEndTime={invisibleAuctionEndTime}
        />
        <div ref={r_five}></div>
        <BattleCar
          details={auctionBattleCar}
          currentBid={battleCarCurrentBid}
          auctionEndTime={battleAuctionEndTime}
        />
        <div ref={r_six}></div>
        <LootSectionSix details={superLootItems} dataReload={dataReloadLoot3} />
        {/* <LootSectionSix details={super_loot_time} /> */}
        {/* <NewDropsTemp2
        categories={categories}
        trigger={trigger}
        setIsLive={setIsLive}
        setTrigger={setTrigger}
        sticky={sticky}
        setSticky={setSticky}
      /> */}
        {/* <baaneer>
        <vedoluio></vedoluio>
      </baaneer> */}
        {/* <CallToAction /> */}
        {/* <RoadMap /> */}
        <SensationalNftCar />
        {/* <SuperLootWaitList /> */}
        <RaddxWhitePaperSection />
        <RoadMap />
        <ReferWin />
        <div ref={r_ourteam}></div>
        <OurTeam />
        <OurInvestor />
        <OurTeamBeyond />
        <Faq />
        {!hideMenus && (
          <>
            <Community />
            <Footer />
          </>
        )}
      </div>
    </>
  );
};

export default Drop;
