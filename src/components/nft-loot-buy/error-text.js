import React from "react";
import { BiX } from "react-icons/bi";

import NFTCounter from "../nft-counter";

const ErrorText = ({ type, handleClick = () => {}, title, desc }) => {
  if (type === "nobalance") {
    return (
      <div className="error-container">
        <div className="error-text">Insufficient funds in your wallet</div>
        <div>
          <button
            type="button"
            onClick={() =>
              window.open(
                `${process.env.REACT_APP_ACCOUNTS_URL}/accounts/wallet`,
                "_blank"
              )
            }
            className="btn-error-button rounded rounded-pill"
          >
            Recharge Wallet
          </button>
        </div>
      </div>
    );
  }

  if (type === "ending-time") {
    return (
      <div className="error-container">
        <div className="time-details">
          <div className="time-title">End of Buying Window</div>
          <div className="time-counter">
            <NFTCounter
              time={"2021-09-28"}
              timeclassName="alert-counter-time"
              intervalclassName="alert-counter-interval"
              intervalGapclassName="alert-counter-gap"
            />
          </div>
        </div>
        <div>
          <button
            type="button"
            onClick={handleClick}
            className="btn-error-button rounded rounded-pill"
          >
            Dismiss
          </button>
        </div>
      </div>
    );
  }

  if (type === "error") {
    return (
      <div className="error-container">
        <BiX
          className="btn-cls"
          size={16}
          role="button"
          onClick={handleClick}
        />
        <div className="error-details">
          <div className="error-title">{title}</div>
          <div className="error-counter">{desc}</div>
        </div>
      </div>
    );
  }

  return null;
};

export default ErrorText;
