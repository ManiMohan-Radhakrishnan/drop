import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import CollectionImg from "../../../images/cric/img/collection/img-33.jpg";
import "./style.scss";
const ChampSection = () => {
  const { user } = useSelector((state) => state.user.data);
  return (
    <section className="metaverse-cricket">
      <div className="container-fluid container-filled">
        <div className="row justify-content-center w-100">
          <div className="col-12 col-sm-12 col-xl-9">
            <div className="metaverse-cricket-content">
              <div className="mc-first">
                <p>
                  METAVERSE CRICKET EXPERIENCE,
                  <br />
                  EXCLUSIVELY FOR YOU.
                </p>
              </div>
              <div className="mc-second">
                <h2>BE THE CHAMP</h2>
              </div>
              <div className="mc-third">
                <h3>YOUR COLLECTION... YOUR PRIDE!</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid px-0">
        <div className="one-all-weather">
          <div className="catches-matches">
            <div className="first-layer-catch">
              <h4>Purchase! Partake! Participate!</h4>
              <h3>
                Powered <br />
                By The Community!
              </h3>
            </div>
          </div>
          <div className="images-cricket">
            <div className="stump-img">
              <img src={CollectionImg} />
            </div>
            <div className="stump-content">
              <p>
                IT'S NOW ABOUT NFT COLLECTIBLES, COMMUNITIES, AND COLLECTIVE
                OWNERSHIP!
              </p>
              <h4>
                CRICKET DOES
                <br /> NOT STOP
              </h4>
              <h5>AT 11 PLAYERS</h5>
              <button
                className="btn waitlist"
                onClick={() => {
                  if (user?.slug) {
                    window.open(
                      `${process.env.REACT_APP_ACCOUNTS_URL}/accounts/wallet`,
                      "_self"
                    );
                  } else {
                    window.open(
                      sessionStorage.getItem("fsz") !== null
                        ? `${
                            process.env.REACT_APP_ACCOUNTS_URL
                          }/signup?fsz=${sessionStorage.getItem("fsz")}`
                        : `${process.env.REACT_APP_ACCOUNTS_URL}/signup`,
                      "_self"
                    );
                  }
                }}
              >
                {user?.slug ? "Add Balance to Wallet" : "Sign Up Now"}
                <BsArrowRight className="arrow-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChampSection;
