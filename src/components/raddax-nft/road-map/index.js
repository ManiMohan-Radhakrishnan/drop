import React from "react";
import roadmapImg from "../../../images/raddx-nft/roadmap-line.png";
import "./style.scss";
const RoadMap = () => {
  return (
    <section className="roadmap-sec position-relative">
      <div className="container-fluid position-relative">
        <h1 className="section-title">RoadMap</h1>
        <div className="row m-0">
          <div className="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
            <div className="card-block card1">
              <div className="card bg-transparent rounded-0 border-0 text-white position-relative">
                <div className="card-body">
                  <h5>Q1 2023</h5>
                  <ul className="mt-3">
                    <li>Metaverse Design & Development</li>
                    <li>Brand partnership</li>
                    <li> Community building activities</li>
                    <li>Drop Landing page</li>
                    <li>Progressive Marketing Campaign</li>
                  </ul>
                </div>
              </div>
              <div className="dot position-absolute"></div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
            <div className="card-block card2">
              <div className="card rounded-0 border-0 text-white position-relative">
                <div className="card-body">
                  <h5>Q2 2023</h5>
                  <ul className="mt-3">
                    <li>Genesis Car NFTs Drop</li>
                    <li>Genesis Digital LandBox Drop</li>

                    <li>Opening for Secondary Sales</li>
                    <li>Onboarding 10 million users</li>
                    <li>Beta Game Launch on Android & iOS</li>
                  </ul>
                </div>
              </div>
              <div className="dot position-absolute"></div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
            <div className="card-block card3">
              <div className="card rounded-0 border-0 text-white position-relative">
                <div className="card-body">
                  <h5>Q3 2023</h5>
                  <ul className="mt-3">
                    <li>Litepaper release</li>
                    <li>Game Launch on Android & iOS</li>
                    <li>Daily Multiple Tournaments</li>
                    <li>Daily Mission & Earn Rewards</li>
                  </ul>
                </div>
              </div>
              <div className="dot position-absolute"></div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
            <div className="card-block card4">
              <div className="card rounded-0 border-0 text-white position-relative">
                <div className="card-body">
                  <h5>Q4 2023</h5>
                  <ul className="mt-3">
                    <li>Weapons & Accessories</li>
                    <li>Rental Feature</li>
                    <li>New Game modes</li>
                    <li>Social Features</li>
                  </ul>
                </div>
              </div>
              <div className="dot position-absolute"></div>
            </div>
          </div>
        </div>
        <img
          src={roadmapImg}
          alt="img"
          className="img-fluid line d-none d-lg-block w-100"
        />
      </div>
    </section>
  );
};

export default RoadMap;
