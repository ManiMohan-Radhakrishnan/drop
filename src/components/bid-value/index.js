import React from "react";

import userImg from "../../images/user_1.png";

import "./style.scss";

const BidValue = ({
  className,
  title,
  value,
  currency,
  status,
  isEnd = false,
  isLeft = false,
  name,
  avatar,
}) => {
  return (
    <div className={`current-bid ${className}`}>
      <div className="title">
        {title}
        {status && <span className="status-tag rounded-pill">{status}</span>}
      </div>
      <div className="value">
        {isEnd ? (
          <div className="user-detail">
            <img alt="" src={avatar ? avatar : userImg} />
            <div className="win-user-name">{name}</div>
          </div>
        ) : (
          <div className="crypto me-3">
            {currency} {value}
            {isLeft && <div className="edition">left</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default BidValue;