import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OwlCarousel from "react-owl-carousel";

import "./style.scss";

import images from "../../../utils/images.json";
import {
  getRaddxLandStatus,
  getRaddxLootStatus,
  getRaddxOneStatus,
} from "../../../redux/reducers/drop_reducer";

const Button = ({ className, id, onClick, text }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick} id={id}>
      {text}
    </button>
  );
};
const BannerSection = ({ exe_scroll_two, hideMenus = false }) => {
  const { user } = useSelector((state) => state.user.data);

  const raddx_one_status = useSelector(getRaddxOneStatus);
  const raddx_land_status = useSelector(getRaddxLandStatus);
  const raddx_loot_status = useSelector(getRaddxLootStatus);

  const [buttonTitle, setButtonTitle] = useState("");

  const statusCheck = {
    "YET TO START": "Explore",
    "PRE BOOK NOW": "Explore",
    BUY: "Live Now",
    "ASSIGNING NFTS": "Live Now",
    "SOLD OUT": "Sold Out",
    "DROP YET TO START": "Explore",
    "DROP ENDED": "Drop Ended",
  };

  // console.log("status", raddx_one_status, raddx_land_status, raddx_loot_status);

  useEffect(() => {
    if (raddx_loot_status) setButtonTitle(statusCheck[raddx_loot_status]);
  }, [raddx_loot_status]);

  // return (
  //   <>
  //     {/* <div className="new_drop_wrapper"> */}
  //     <section className="raddax-hero">
  //       <img className="dr_baner" src={images?.raddx_mobile_banner} alt="" />
  //       <div className="btn-block">
  //         <img
  //           src={images?.raddx_banner_logo}
  //           alt="banner-secion"
  //           className="hero-cntnt-img"
  //         />
  //         <div className="button-grp d-block d-lg-flex ">
  //           <Button
  //             className={"btn-dark text-white  w-max-lg-100"}
  //             id={"explore-now"}
  //             text={"EXPLORE NOW"}
  //             onClick={() => {
  //               exe_scroll_one();
  //             }}
  //           />
  //           <Button
  //             className={"background-clr-1 text-white w-max-lg-100"}
  //             id={"your-wallet"}
  //             text={"FUND YOUR WALLET"}
  //             onClick={() => {
  //               if (user?.slug) {
  //                 window.open(
  //                   `${process.env.REACT_APP_ACCOUNTS_URL}/accounts/wallet#web`,
  //                   "_self"
  //                 );
  //               } else {
  //                 window.open(
  //                   `${
  //                     process.env.REACT_APP_ACCOUNTS_URL
  //                   }/signup?fsz=${sessionStorage.getItem("fsz")}`,
  //                   "_self"
  //                 );
  //               }
  //             }}
  //           />
  //         </div>
  //       </div>
  //     </section>
  //   </>
  // );

  return (
    <>
      <OwlCarousel
        className="owl-theme hero-carousel"
        margin={20}
        nav={false}
        smartSpeed={500}
        dots={true}
        navContainerClass={"carousel-btn-block"}
        responsive={{
          0: {
            items: 1,
          },
          768: {
            items: 1,
          },
          800: {
            items: 1,
          },
        }}
        autoplay
        loop
        autoplayTimeout={5000}
        autoplayHoverPause={false}
      >
        <div class="item">
          <section className="raddax-hero">
            <img
              className="mobile-content-img"
              src={images?.raddx_mobile_banner}
              alt=""
            />
            <div className="btn-block">
              <img
                src={images?.raddx_banner_logo}
                alt="banner-secion"
                className="hero-cntnt-img"
              />
              <div className="button-grp d-block d-lg-flex ">
                <Button
                  className={"btn-dark text-white  w-max-lg-100"}
                  id={"explore-now"}
                  text={"DROP SOLD OUT"}
                  onClick={() => {
                    exe_scroll_two();
                  }}
                />
                {/* <Button
                  className={"background-clr-1 text-white w-max-lg-100"}
                  id={"your-wallet"}
                  text={"FUND YOUR WALLET"}
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
                /> */}
              </div>
            </div>
          </section>
        </div>
        <div class="item">
          <section className="raddax-hero raddx-banner-box">
            <div className="img-block left">
              <img
                src={
                  "https://cdn.guardianlink.io/product-hotspot/images/raddx/Jump-Page_Raddx-banner_Front-left.webp"
                }
                alt=""
              />
            </div>
            <div className="img-block right">
              <a
                onClick={() => {
                  window.open(
                    !hideMenus
                      ? `${process.env.REACT_APP_PUBLIC_URL}/guaranteed-gift-box`
                      : `${process.env.REACT_APP_PUBLIC_URL}/guaranteed-gift-box?hideMenus=true`,
                    "_self"
                  );
                }}
              >
                <img
                  src={
                    "https://cdn.guardianlink.io/product-hotspot/images/raddx/Jump-Page_Raddx-banner_Front.webp"
                  }
                  alt=""
                />
              </a>
            </div>
          </section>
        </div>
      </OwlCarousel>
    </>
  );
};

export default BannerSection;
