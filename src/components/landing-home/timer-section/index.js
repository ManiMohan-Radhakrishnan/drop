import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FlipClock from "x-react-flipclock";
import { BsArrowRight } from "react-icons/bs";
import TimeCounter from "../../time-counter/index";
import { useHistory } from "react-router-dom";

import { subscribeApi } from "../../../api/base-methods";
import { validateEmail } from "../../../utils/common";
import "./style.scss";

const TimerSection = ({ live = false, launchTime }) => {
  const { user } = useSelector((state) => state.user.data);
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();
  const history = useHistory();

  const handleSubscribe = async () => {
    if (validateEmail(email)) {
      try {
        setLoading(true);

        const response = await subscribeApi(email, "jump");

        setEmail("");

        if (response.data.data.exists) {
          if (!response.data.data.subscribed) {
            setSuccess(
              "You're now on our waitlist! Keep an eye on your inbox for the latest updates on our Marketplace!"
            );
          } else {
            setSuccess(
              "Nobody loves NFTs like you do as your email id is already on our waitlist! We'll keep you posted on the Marketplace updates."
            );
          }
        } else {
          if (!response.data.data.subscribed) {
            setSuccess("new-signup");
          } else {
            setSuccess("new-signup-repeat");
          }
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: index.js ~ line 16 ~ handleSubscribe ~ error",
          error
        );
      } finally {
        setLoading(false);
      }
    } else {
      setSuccess("Enter a valid email");
    }
  };

  return (
    <section className={live ? "section_2 light-bg-c" : "section_2"}>
      <div className="container-fluid">
        {live ? (
          <>
            <div className="row mt-5 mb-5">
              <div className="col">
                <div className="live-timer-title">
                  <span>MARKETPLACE</span> IS LIVE NOW !!
                </div>

                <div>
                  <button
                    type="button"
                    className="btn waitlist preorder-btn mt-4"
                    // onClick={() =>
                    //   window.open("/explore/loot/4MQblyojUD3DwBrj", "_self")
                    // }
                  >
                    Explore in Marketplace
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="row">
              <div className="col-lg-12 text-center">
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
                  {/* {user?.slug ? "Fund Your Wallet" : "Sign Up For Drop"} */}
                  {user?.slug ? "Add Balance to Wallet" : "Sign Up Now"}
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2>
                  <span className="txt">MARKETPLACE</span>
                </h2>
                <p className="text-center mediumTitle">
                  TIME LEFT UNTIL LAUNCH
                </p>
                <div className="timer">
                  <div className="clock">
                    {/* <FlipClock type="countdown" count_to="2022-04-22 17:00:00" /> */}
                    <TimeCounter time={launchTime} />
                  </div>
                  {/* <button type="button" className="btn waitlist"> */}
                  <div title="Add to Calendar" class="addeventatc btn waitlist">
                    Add to Calendar
                    <span class="start">05/04/2022 06:00 PM</span>
                    <span class="end">05/04/2022 06:15 PM</span>
                    <span class="timezone">Asia/Calcutta</span>
                    <span class="title">Jump.trade Marketplace Launch</span>
                    {/* <span class="description">Description of the event</span> */}
                    <span class="organizer">https://jump.trade/</span>
                  </div>
                  {/* </button> */}

                  <div className="one-line-form">
                    <input
                      type="text"
                      name="text"
                      value={email}
                      placeholder="ENTER YOUR EMAIL"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={handleSubscribe}
                      disabled={loading}
                    >
                      JOIN THE WAITLIST <BsArrowRight className="arrow-icon" />
                    </button>
                  </div>
                  {success && (
                    <div className="success-message">
                      {(() => {
                        if (success === "new-signup") {
                          return (
                            <div>
                              You're now on our waitlist! While you wait for the
                              next Marketplace update, why don't you create a
                              GuardianLink account?
                              <br />
                              <a
                                href={`${
                                  process.env.REACT_APP_ACCOUNTS_URL
                                }/signup?fsz=${sessionStorage.getItem("fsz")}`}
                                target="_self"
                              >
                                Sign up now!
                              </a>
                            </div>
                          );
                        } else if (success === "new-signup-repeat") {
                          return (
                            <div>
                              Nobody loves NFTs like you do as your email id is
                              already on our waitlist! While we send you the
                              Marketplace updates, why don't you create a
                              GuardianLink account?
                              <br />
                              <a
                                href={`${
                                  process.env.REACT_APP_ACCOUNTS_URL
                                }/signup?fsz=${sessionStorage.getItem("fsz")}`}
                                target="_self"
                              >
                                Sign up now!
                              </a>
                            </div>
                          );
                        } else return success;
                      })()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TimerSection;
