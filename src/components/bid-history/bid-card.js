import React, { useEffect } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

import BidName from "./bid-name";
import userImg from "../../images/user_1.png";
import { currencyFormat } from "../../utils/common";

import "./style.scss";

const BidCard = ({
  history,
  isEnd = false,
  latestIndex,
  bidExpired,
  orderDetails,
  isAuctionEnded,
  setBidExpiry,
}) => {
  const { user } = useSelector((state) => state.user.data);

  useEffect(() => {
    if (history?.status === "active" && latestIndex === 0) {
      setBidExpiry(dayjs(history.expires_at));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.slug, history]);

  return (
    <div className="bid-histroy-card">
      {isEnd ? (
        <div className="history-end-content">
          You've reached the end of the list
        </div>
      ) : (
        <>
          <div className="first-half">
            <img
              alt=""
              src={
                !history.private && history.avatar_url
                  ? history.avatar_url
                  : user?.slug === history.slug && history.avatar_url
                  ? history.avatar_url
                  : userImg
              }
            />
            <div className="bid-histoy-details">
              <div className={`time text-secondary`}>
                {dayjs(history.created_at).format("MMM D, YYYY hh:mm A")}{" "}
                <span
                  className={`expire-pill ${
                    (history?.status === "active" &&
                      latestIndex === 0 &&
                      dayjs() < dayjs(history.expires_at) &&
                      !bidExpired) ||
                    (history?.status === "success" && latestIndex === 0)
                      ? "active"
                      : orderDetails?.timed_auction &&
                        history?.status === "active" &&
                        isAuctionEnded &&
                        latestIndex === 0
                      ? "processing"
                      : ""
                  }`}
                >
                  {orderDetails?.timed_auction &&
                  history?.status === "active" &&
                  isAuctionEnded &&
                  latestIndex === 0
                    ? "Processing..."
                    : history?.status === "active" &&
                      latestIndex === 0 &&
                      dayjs() < dayjs(history.expires_at) &&
                      !bidExpired
                    ? "Active"
                    : history?.status === "success" && latestIndex === 0
                    ? "Success"
                    : "Expired"}
                </span>
              </div>

              {/* <div className="time text-secondary">
                {dayjs(history.created_at).format("MMM D, YYYY hh:mm A")}
              </div> */}
              <div className="bid-owner">
                Bid placed by{" "}
                <BidName
                  imgUrl={history.avatar_url}
                  text={history.user_name}
                  slug={history.slug}
                />
              </div>

              {/* {orderDetails?.timed_auction &&
                isAuctionEnded &&
                latestIndex === 0 && (
                  <div className="bid-expire-cntent">
                    Processing Winner Details
                  </div>
                )} */}
            </div>
          </div>

          <div className="second-half">
            <div className="bid-value">
              {currencyFormat(history.bid_amount, "USD")}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BidCard;
