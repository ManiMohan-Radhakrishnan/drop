import WinIcon from "../../images/drops/car-nft-images/discover-section/win.svg";
import PlayIcon from "../../images/drops/car-nft-images/discover-section/play.svg";
import TradeIcon from "../../images/drops/car-nft-images/discover-section/trade.svg";
import ActionPacked from "../../images/drops/car-nft-images/discover-section/action-packed.png";
import DigitalDream from "../../images/drops/car-nft-images/discover-section/digital-dream.png";
import LevelImage from "../../images/drops/car-nft-images/discover-section/level-image.png";
import EarnReward from "../../images/drops/car-nft-images/discover-section/earn-reward.png";
import TradeImage from "../../images/drops/car-nft-images/discover-section/trade-red-image.png";
import DiscoverBg from "../../images/drops/car-nft-images/discover-section/discover-bg.jpg";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import images from "../../utils/images.json";

import "./style.scss";

const SensationalNftCar = () => {
  return (
    <section
      className={`sensational-nft-section`}
      style={{
        backgroundImage: `url(${images?.raddx_racing_metaverse})`,
      }}
    >
      <div className="container-fluid position-relative">
        <div className="row">
          <div className="col-12">
            <div className="sec-heading">
              <h4>DISCOVER THE THRILL OF RACING IN THE METAVERSE</h4>
              <p>
                COLLECT & TRADE stunning CARS and accelerate your way to the
                finish line to WIN BIG REWARDS daily!
              </p>
            </div>
            <ul className="step-info-block">
              <li>
                <img src={TradeIcon} alt="TradeIcon" height={80} width={80} />
                <h5>Trade Car NFTs</h5>
              </li>
              <li>
                <img src={PlayIcon} alt="PlayIcon" height={80} width={80} />
                <h5>Play Tournaments</h5>
              </li>
              <li>
                <img src={WinIcon} alt="WinIcon" height={80} width={80} />
                <h5>Win Cash Rewards Daily</h5>
              </li>
            </ul>

            <Swiper
              className={"sensational-nft-swiper"}
              modules={[Navigation, Autoplay, Pagination]}
              autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
              speed={500}
              pagination={{ dynamicBullets: true }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                500: {
                  slidesPerView: 2,
                },
                800: {
                  slidesPerView: 3,
                },

                991: {
                  slidesPerView: 4,
                },
                1200: {
                  slidesPerView: 5,
                },
              }}
            >
              <SwiperSlide>
                <article className={`nft-car-cards red-card`}>
                  <div
                    className={`img-block`}
                    style={{
                      backgroundImage: `url(${images?.raddx_collect})`,
                    }}
                  >
                    <h2 className={`title`}>COLLECT</h2>
                  </div>
                  <div className={`content-block`}>
                    <h6>
                      OWN <span>your</span> DIGITAL DREAM CARS
                    </h6>
                  </div>
                </article>
              </SwiperSlide>
              <SwiperSlide>
                <article className={`nft-car-cards yellow-card`}>
                  <div
                    className={`img-block`}
                    style={{
                      backgroundImage: `url(${images?.raddx_race})`,
                    }}
                  >
                    <h2 className={`title`}>RACE</h2>
                  </div>
                  <div className={`content-block`}>
                    <h6>
                      <span>Compete for the</span> TOP <span>places in</span>{" "}
                      ACTION-PACKED <span>races</span>
                    </h6>
                  </div>
                </article>
              </SwiperSlide>
              <SwiperSlide>
                <article className={`nft-car-cards green-card`}>
                  <div
                    className={`img-block`}
                    style={{
                      backgroundImage: `url(${images?.raddx_earn})`,
                    }}
                  >
                    <h2 className={`title`}>EARN</h2>
                  </div>
                  <div className={`content-block`}>
                    <h6>
                      <span>Race Your Way To Victory & </span>WIN BIG REWARDS!
                    </h6>
                  </div>
                </article>
              </SwiperSlide>
              <SwiperSlide>
                <article className={`nft-car-cards blue-card`}>
                  <div
                    className={`img-block`}
                    style={{
                      backgroundImage: `url(${images?.raddx_upgrade})`,
                    }}
                  >
                    <h2 className={`title`}>UPGRADE</h2>
                  </div>
                  <div className={`content-block`}>
                    <h6>
                      <span>Level Up Your Car to </span> BOOST ITS PERFORMANCE &
                      VISUALS!
                    </h6>
                  </div>
                </article>
              </SwiperSlide>
              <SwiperSlide>
                <article className={`nft-car-cards orange-card`}>
                  <div
                    className={`img-block`}
                    style={{
                      backgroundImage: `url(${images?.raddx_trade})`,
                    }}
                  >
                    <h2 className={`title`}>TRADE</h2>
                  </div>
                  <div className={`content-block`}>
                    <h6>
                      <span>Explore Exciting Options To </span> TRADE YOUR CAR
                      NFTS!
                    </h6>
                  </div>
                </article>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SensationalNftCar;
