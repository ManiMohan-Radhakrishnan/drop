import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

import { subscribeApi } from "../../../api/base-methods";
import { validateEmail } from "../../../utils/common";
import "./style.scss";

const CallToAction = () => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();

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
    <section className="section_callAction">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>
              <span className="txt">
                Challenge The Boundaries Of Collecting &amp; Participating!{" "}
              </span>{" "}
              Buy Your Cricket NFTs Now!
            </h2>

            <div className="timer">
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
      </div>
    </section>
  );
};

export default CallToAction;
