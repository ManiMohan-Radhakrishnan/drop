import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
// import Image from "next/future/image";
import { useSelector } from "react-redux";

// import { isUserLoggedIn } from "../../../redux/reducers/user_reducer";
import { subscribeApi } from "../../../api/base-methods";
import useQuery from "../../../hook/useQuery";
import { validateEmail } from "../../../utils/common";
import { getCookies } from "../../../utils/cookies";

// import images from "../images.json";
// import BadgeBg from "../../../images/raddx-nft/badge-new.png";
// import CarBg from "../../../images/raddx-nft/car_bg.png";
// import CarMobileBg from "../../../images/raddx-nft/car_mobile_bg.png";

// import useWindowSize from "../hooks/useWindowSize";
// import { useRouter } from "next/router";
import { useHistory } from "react-router-dom";

import "./style.scss";
import {
  getRaddxLandStatus,
  getRaddxLootStatus,
  getRaddxOneStatus,
} from "../../../redux/reducers/drop_reducer";

const JoinWaitList = () => {
  // const loginStatus = useSelector(isUserLoggedIn);
  const history = useHistory();
  const user = useSelector((state) => state?.user);
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();

  const raddx_loot_status = useSelector(getRaddxLootStatus);
  // const { width: windowWidth } = useWindowSize();
  // const router = useRouter();
  let query = useQuery();

  const fsz = query.get("fsz");

  const [autoLogin, setAutoLogin] = useState(true);
  const [termsConditions, setTermsConditions] = useState(true);

  const handleSubscribe = async () => {
    if (validateEmail(email)) {
      try {
        setLoading(true);

        const response = await subscribeApi(
          email,
          termsConditions,
          "raddx",
          getCookies()
        );

        setEmail("");

        if (response.data.data.exists) {
          if (!response.data.data.subscribed) {
            setSuccess(
              "Email submitted successfully. You're now on the waitlist!"
            );
          } else {
            setSuccess(
              "You've already signed up for the waitlist. Stay tuned for the latest updates!"
            );
          }
        } else {
          if (!response.data.data.subscribed) {
            setSuccess("new-signup");
          } else {
            setSuccess("new-signup-repeat");
          }
        }
        !user?.login &&
          termsConditions &&
          history.push(
            `?with=otp&email=${response?.data?.data?.signin_email || ""}`
          );
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
    <>
      <section className="super-loot-section">
        <div className="super-loot-content-box">
          <div className="join-waitlist-form-block">
            <div className="join-waitlist-form-content">
              <h6>
                {raddx_loot_status == "BUY"
                  ? "Drop Live Now!"
                  : "Gear Up For The Drop!"}
              </h6>
              <div className="join-waitlist-form singleline">
                {/* <input
                  type="text"
                  name="text"
                  value={email}
                  placeholder="Email"
                  className="email-content"
                  onChange={(e) => setEmail(e.target.value)}
                /> */}

                {/* {user?.login?<button
                  type="button"
                  onClick={handleSubscribe}
                  disabled={loading}>
                  {!loading ? "Join Now" : "Loading..."}
                </button> : */}

                <button
                  // text={user?.slug ? "FUND YOUR WALLET" : "Sign Up"}
                  onClick={() => {
                    if (user?.login) {
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
                >
                  {user?.login ? "FUND YOUR WALLET" : "Sign Up"}
                </button>
              </div>
            </div>
            <div className="join-waitlist-info-box">
              {success && (
                <div className="success-message">
                  {(() => {
                    if (success === "new-signup") {
                      return (
                        <div>
                          {`You're now on the waitlist! While we send you updates, why don't you create an account on Jump.trade?`}
                          <span>
                            {" "}
                            <a
                              onClick={() =>
                                window.open(
                                  `${
                                    process.env.REACT_APP_ACCOUNTS_URL
                                  }/signup${fsz ? `?fsz=${fsz}` : ""}`,
                                  "_self"
                                )
                              }
                              // href={`${
                              //   process.env.REACT_APP_ACCOUNTS_URL
                              // }/signup?fsz=${sessionStorage.getItem("fsz")}`}
                              // href={`${
                              //   process.env.REACT_APP_ACCOUNTS_URL
                              // }/signup${fsz ? `?fsz=${fsz}` : ""}`}
                              // target="_self"
                            >
                              Sign up here
                            </a>
                          </span>
                        </div>
                      );
                    } else if (success === "new-signup-repeat") {
                      return (
                        <div>
                          {`You're already on the waitlist! While we send you updates, why don't you create an account on Jump.trade?`}
                          <span>
                            {" "}
                            <a
                              onClick={() =>
                                window.open(
                                  `${
                                    process.env.REACT_APP_ACCOUNTS_URL
                                  }/signup${fsz ? `?fsz=${fsz}` : ""}`,
                                  "_self"
                                )
                              }
                              // href={`${
                              //   process.env.REACT_APP_ACCOUNTS_URL
                              // }/signup?fsz=${sessionStorage.getItem("fsz")}`}
                              // href={`${
                              //   process.env.REACT_APP_ACCOUNTS_URL
                              // }/signup${fsz ? `?fsz=${fsz}` : ""}`}
                              // target="_self"
                            >
                              Sign up here
                            </a>
                          </span>
                        </div>
                      );
                    } else return success;
                  })()}
                </div>
              )}
              {autoLogin && email && !user?.login && (
                <div className="py-2 allow-footer">
                  <input
                    type="checkbox"
                    name="termsConditions"
                    checked={termsConditions}
                    onClick={() => setTermsConditions(!termsConditions)}
                  />{" "}
                  I allow Jump.trade to create an account for me and I confirm
                  that I am 18 years or older. View{" "}
                  <a
                    target="_blank"
                    onClick={() =>
                      window.open(
                        `${process.env.REACT_APP_MARKETPLACE_URL}/terms-and-conditions`,
                        "_self"
                      )
                    }
                    className="link link-orange"
                  >{`T&Cs`}</a>{" "}
                  and
                  <a
                    target="_blank"
                    onClick={() =>
                      window.open(
                        `${process.env.REACT_APP_MARKETPLACE_URL}/privacy-policy`,
                        "_self"
                      )
                    }
                    className="link link-orange"
                  >{` Privacy Policy.`}</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JoinWaitList;
