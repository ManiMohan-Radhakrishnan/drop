import "./style.scss";

import RaddxList from "../../images/raddx-litepaper.pdf";

const RaddxWhitePaperSection = () => {
  return (
    <>
      <section className="whitepaper_sec">
        <div className="container">
          <div className="row justify-content-center">
            <div className="whitepaper_box p-4 text-center position-relative">
              <h2 className="marketplace_app display-1 text-uppercase fw-bold">
                RADDX RACING METAVERSE LITEPAPER
              </h2>
              <p className="my-3 text-capitaliz fs-2 h-meduim">
                <span>
                  RADDX is an authentic 3D real-time multiplayer action racing
                  game built on blockchain technology. Read the Litepaper to
                  learn more about the game, its structure, and key details.
                </span>
              </p>

              <a href={RaddxList} target="_blank" rel="noreferrer">
                <button className="read_moree fs-5 fw-bold">
                  <span>Read Now</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RaddxWhitePaperSection;
