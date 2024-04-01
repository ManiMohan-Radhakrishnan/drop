import React, { useState } from "react";
import dc from "../../../images/cric/img/dc.svg";
import ig from "../../../images/cric/img/ig.svg";
import tw from "../../../images/cric/img/tw.svg";
import logo from "../../../images/cric/img/logo.svg";
import { useHistory } from "react-router";

import { subscribeApi } from "../../../api/base-methods";
import { validateEmail } from "../../../utils/common";

import "./style.scss";
import { BsArrowRight } from "react-icons/bs";

const Footer = () => {
  const history = useHistory();

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
    <>
      <div className="social_nav_fixed">
        <a
          href="https://discord.com/invite/JRWmNb38GW"
          target={"_blank"}
          className="social_link"
          rel="nofollow noopener"
        >
          <img src={dc} className="change-my-color" />
        </a>
        <a
          href="https://www.instagram.com/jumptradenft/"
          target={"_blank"}
          className="social_link"
          rel="nofollow noopener"
        >
          <img src={ig} className="change-my-color" />
        </a>
        <a
          href="https://twitter.com/Jumptradenft"
          target={"_blank"}
          className="social_link"
          rel="nofollow noopener"
        >
          <img src={tw} className="change-my-color" />
        </a>
      </div>
      <footer className="ck-footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-5 order-md-1 order-sm-2 order-2">
              <div className="conversation-begin">
                <h4>BECOME A PART OF THE COMMUNITY</h4>
                <h2>BEGIN A CONVERSATION</h2>
                <span className="discord-name">
                  <img src={dc} className="change-my-color" />
                  <a
                    href="https://discord.com/invite/JRWmNb38GW"
                    className="twitter-link"
                    target={"_blank"}
                    rel="nofollow noopener"
                  >
                    @DISCORD
                  </a>
                </span>
                <a
                  href="mailto:support@guardianlink.io"
                  className="support-mail mt-3 d-flex"
                >
                  support@guardianlink.io
                </a>
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-6 offset-md-1 col-lg-5 offset-lg-2  order-md-2 order-sm-1 order-1">
              <div className="follow-details">
                <h3 className="follow-heading">Get the latest NFT updates</h3>
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
                    <BsArrowRight className="arrow-icon" />
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
              <div className="follow-details">
                <h3 className="follow-heading">FOLLOW US</h3>
                <div className="social_nav">
                  <a
                    href="https://discord.com/invite/JRWmNb38GW"
                    target={"_blank"}
                    className="social_link"
                    rel="nofollow noopener"
                  >
                    <img src={dc} className="change-my-color" />
                  </a>
                  <a
                    href="https://www.instagram.com/jumptradenft/"
                    target={"_blank"}
                    className="social_link"
                    rel="nofollow noopener"
                  >
                    <img src={ig} className="change-my-color" />
                  </a>
                  <a
                    href="https://twitter.com/Jumptradenft"
                    target={"_blank"}
                    className="social_link"
                    rel="nofollow noopener"
                  >
                    <img src={tw} className="change-my-color" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-cusomize-rem">
            <div className="col-6 col-sm-6 col-md-5 order-md-1 order-sm-1 order-1">
              <div className="list-featured">
                <ul className="one-listed-ul">
                  <li>
                    <a
                      href="/mcl"
                      style={{ cursor: "pointer" }}
                      // href="/drop"
                      onClick={() => history.push("/mcl")}
                      className="list-footer"
                    >
                      DROP
                    </a>
                  </li>
                  <li>
                    <a
                      href="#roadmap"
                      style={{ cursor: "pointer" }}
                      onClick={() => history.push("/#roadmap")}
                      className="list-footer"
                    >
                      ROADMAP
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => history.push("/#ourteam")}
                      className="list-footer"
                    >
                      TEAM
                    </a>{" "}
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-3 offset-md-4 order-md-2 order-sm-2 order-2">
              <div className="footer-logo">
                <img src={logo} />
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="copyrightsfooter">
        <div className="left-side">
          <h5>
            <span className="copyrights">
              © All rights reserved | Guardian Blockchain Labs Pte. Ltd.,
              Singapore.
            </span>
          </h5>
        </div>
        <div className="right-side">
          <ul>
            <li>
              <a href="https://www.guardianlink.io/about-us" target={"_blank"}>
                About Us
              </a>
            </li>
            <li>
              <a
                href="https://www.guardianlink.io/contact-us"
                target={"_blank"}
              >
                Contact Us
              </a>
            </li>
            <li>
              <a href="/faq" target={"_blank"}>
                FAQs
              </a>
            </li>
            <li>
              <a href="/privacy-policy" target={"_blank"}>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms-and-conditions" target={"_blank"}>
                Terms &amp; conditions
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
