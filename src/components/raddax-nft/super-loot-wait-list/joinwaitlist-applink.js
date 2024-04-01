import React, { useState } from "react";
// import { BsArrowRight } from "react-icons/bs";
// import { useSelector } from "react-redux";

// import { isUserLoggedIn } from "../../../redux/reducers/user_reducer";
// import { subscribeApi } from "../../../utils/base-methods";
// import { validateEmail } from "../../../utils/common";
// import { getSourceCookies } from "../../../utils/cookies";

import useQuery from "../../../hook/useQuery";
import { validateEmail } from "../../../utils/common";
import { subscribeApi } from "../../../api/base-methods";
import { useHistory } from "react-router-dom";

import { getCookies } from "../../../utils/cookies";
import { useSelector } from "react-redux";

import "./style.scss";

const JoinWaitListAppLink = () => {
  const user = useSelector((state) => state?.user);
  const history = useHistory();
  // const loginStatus = useSelector(isUserLoggedIn);
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();
  const query = useQuery();
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
              "You've already signed up for the waitlist. Stay tuned for the latest updates!."
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
      <div className={"join-waitlist-form-block"}>
        <div className={"join-waitlist-form"}>
          <input
            type="text"
            name="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {success && (
            <div className={"success-message"}>
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
          <button type="button" onClick={handleSubscribe} disabled={loading}>
            {!loading ? "Join Now" : "Loading..."}
          </button>
          {autoLogin && email && !user?.login && (
            <div className={`getappLinkCheckbox py-2`}>
              <input
                type="checkbox"
                name="termsConditions"
                checked={termsConditions}
                onClick={() => setTermsConditions(!termsConditions)}
              />{" "}
              I allow Jump.trade to create an account for me and I confirm that
              I am 18 years or older. View{" "}
              <a
                target="_blank"
                onClick={() =>
                  window.open(
                    `${process.env.REACT_APP_MARKETPLACE_URL}/terms-and-conditions`
                  )
                }
                className={`link link-orange`}
              >{`T&Cs`}</a>{" "}
              and
              <a
                target="_blank"
                onClick={() =>
                  window.open(
                    `${process.env.REACT_APP_MARKETPLACE_URL}/privacy-policy`
                  )
                }
                className={`link link-orange`}
              >{` Privacy Policy.`}</a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default JoinWaitListAppLink;
