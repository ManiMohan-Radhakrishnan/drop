import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BsArrowRight } from "react-icons/bs";

import { isUserLoggedIn } from "../../../redux/reducers/user_reducer";
import { subscribeApi } from "../../../utils/base-methods";
import { validateEmail } from "../../../utils/common";
import { getSourceCookies } from "../../../utils/cookies";

import "./style.scss";

const JoinWaitList = () => {
  const loginStatus = useSelector(isUserLoggedIn);
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();
  const router = useRouter();
  const fsz = router.query.fsz;

  const [autoLogin, setAutoLogin] = useState(true);
  const [termsConditions, setTermsConditions] = useState(true);

  const handleSubscribe = async () => {
    if (validateEmail(email)) {
      try {
        setLoading(true);

        const response = await subscribeApi(email, "jump", getSourceCookies());

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
        !loginStatus &&
          router.push(
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
      <div className={style["join-waitlist-form-block"]}>
        <div className={style["join-waitlist-form"]}>
          <input
            type="text"
            name="text"
            value={email}
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="button" onClick={handleSubscribe} disabled={loading}>
            Join the waitlist &nbsp;
            <BsArrowRight />
          </button>
        </div>
        {success && (
          <div className={style["success-message"]}>
            {(() => {
              if (success === "new-signup") {
                return (
                  <div>
                    {`You're now on the waitlist! While we send you updates, why don't you create an account on Jump.trade?`}
                    <span>
                      {" "}
                      <a
                        // href={`${
                        //   process.env.REACT_APP_ACCOUNTS_URL
                        // }/signup?fsz=${sessionStorage.getItem("fsz")}`}
                        href={`${process.env.REACT_APP_ACCOUNTS_URL}/signup${
                          fsz ? `?fsz=${fsz}` : ""
                        }`}
                        target="_self"
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
                        // href={`${
                        //   process.env.REACT_APP_ACCOUNTS_URL
                        // }/signup?fsz=${sessionStorage.getItem("fsz")}`}
                        href={`${process.env.REACT_APP_ACCOUNTS_URL}/signup${
                          fsz ? `?fsz=${fsz}` : ""
                        }`}
                        target="_self"
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
      </div>
    </>
  );
};

export default JoinWaitList;
