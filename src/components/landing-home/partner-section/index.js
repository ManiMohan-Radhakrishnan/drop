import React from "react";
import ImgPolygon from "../../../images/cric/img/polygon.png";
import ImgKalari from "../../../images/cric/img/kalari.png";

import "./style.scss";

const PartnerSection = () => {
  return (
    <section className="section_3">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-12 text-center">
            <h2 className="">PARTNERS & INVESTORS</h2>
          </div>
        </div>
        <div className="row justify-content-center mt-10">
          <div className="col-xl-3 col-lg-4 col-sm-6 col-md-6 col-xs-6">
            <div className="single-partner-box">
              <div className="icon">
                <img src={ImgKalari} alt="icon" />
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4 col-sm-6 col-md-6 col-xs-6">
            <div className="single-partner-box">
              <div className="icon">
                <img src={ImgPolygon} alt="icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
