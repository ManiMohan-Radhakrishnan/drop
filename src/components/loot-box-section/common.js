import "./style.scss";
import { useHistory } from "react-router-dom";
import useQuery from "../../hook/useQuery";

export const MODAL_TYPES = Object.freeze({
  LOGIN_WITH_PASSWORD: "login_with_password",
  LOGIN_WITH_OTP: "login_with_otp",
  VERIFY_GOOGLE_OTP: "verify_google_otp",
  VERIFY_OTP: "verify_otp",
  FORGOT_PASSWORD: "forgot_password",
  REGISTER: "register",
  PREBOOK: "prebook",
});

export const LOOT_STATUS = Object.freeze({
  YTS: "YET TO START",
  PRE_BOOK: "PRE BOOK NOW",
  DROP: "BUY",
  ASSIGNING_NFTS: "ASSIGNING NFTS",
  SOLD_OUT: "SOLD OUT",
  DROP_YTA: "DROP YET TO START",
  DROP_ENDED: "DROP ENDED",
});

export const AUCTION_STATUS = Object.freeze({
  YTS: "YET TO START",
  AUCTION: "BID NOW",
});

export const LoginOptionTabs = ({ activeTab = "", onClick }) => {
  const router = useHistory();
  const query = useQuery();
  const withOtp = query?.get("with");
  {
    console.log("tab", "tabbbb");
  }

  return (
    <div
      className={`login-section-tab ${withOtp ? "justify-content-center" : ""}`}
    >
      {!withOtp ? (
        <>
          {" "}
          <p
            className={`tab ${
              activeTab === MODAL_TYPES.LOGIN_WITH_OTP ? "active" : ""
            } `}
            onClick={() => onClick(MODAL_TYPES.LOGIN_WITH_OTP)}
          >
            OTP
          </p>
          <p
            className={`tab ${
              activeTab === MODAL_TYPES.LOGIN_WITH_PASSWORD ? "active" : ""
            } `}
            onClick={() => onClick(MODAL_TYPES.LOGIN_WITH_PASSWORD)}
          >
            Password
          </p>
        </>
      ) : (
        <p
          className={`tab ${
            activeTab === MODAL_TYPES.LOGIN_WITH_PASSWORD ? "active" : ""
          } `}
          onClick={() => onClick(MODAL_TYPES.LOGIN_WITH_PASSWORD)}
        >
          OTP
        </p>
      )}
    </div>
  );
};

export const ConfirmError = ({ loading, resendEmail = () => {} }) => {
  return loading ? (
    <p className="text-dark">Sending email...</p>
  ) : (
    <p className="text-dark">
      You need to verify your account first.{" "}
      <a href="#" onClick={resendEmail}>
        Click here
      </a>{" "}
      to resend the confirmation email.
    </p>
  );
};

export const LoginErrorInfo = ({ error, loading, resendEmail }) => {
  if (error === "confirm-email") {
    return <ConfirmError loading={loading} resendEmail={resendEmail} />;
  } else if (error === "login-locked") {
    return (
      <p className="text-danger text-center">
        Your login has been disabled because we detected a suspicions activity
        on your account.{" "}
        <a href="https://help.jump.trade/en/support/solutions/articles/84000345960-why-is-my-login-disabled-">
          Learn more
        </a>
      </p>
    );
  } else {
    return <p className="text-danger text-center">{error}</p>;
  }
};
