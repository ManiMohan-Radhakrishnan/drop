import React from "react";

import "./style.scss";

const OurTeamBeyond = () => {
  return (
    <section className="our-teambeyond-section">
      <div className="container-fluid">
        <div className="row mt-150">
          <div className="col-sm-12">
            <h2 className="sectionHeading">
              OUR PARTNERS & DIGITAL LAND PATRONS
            </h2>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="cmp_logo">
              {/* <img
                src="https://www.guardianlink.io/academy/wp-content/uploads/2022/03/PngItem_5363354.png"
                className="invert-reverse"
              /> */}
              <img src="https://cdn.guardianlink.io/product-hotspot/images/raddx/partners_polygon.png" />
              <img src="https://cdn.guardianlink.io/product-hotspot/images/raddx/partners_flipkart.png" />
              <img src="https://cdn.guardianlink.io/product-hotspot/images/raddx/partners_pepsi.png" />
              {/* <img src="https://cdn.guardianlink.io/product-hotspot/images/raddx/partners_binance.png" /> */}
              <img src="https://cdn.guardianlink.io/product-hotspot/images/raddx/partners_mondelez.png" />
              <img src="https://cdn.guardianlink.io/product-hotspot/images/raddx/partners_twitter.png" />
              <img src="https://cdn.guardianlink.io/product-hotspot/images/raddx/partners_viacom.png" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeamBeyond;
