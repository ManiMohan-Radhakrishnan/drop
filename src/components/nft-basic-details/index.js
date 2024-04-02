import React, { useState } from "react";
import _ from "lodash";
import ReadMoreReact from "read-more-react";
import { useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { BiX } from "react-icons/bi";
import { useHistory } from "react-router";

import { treasureCheck } from "../../api/methods";
import NFTTimeLeft from "../nft-time-left";
import BidValue from "../bid-value";
import ToolTip from "../tooltip";
import NFTPlaceBid from "./../nft-place-bid";
import { ReactComponent as DiscordSvg } from "./../../icons/discord_logo.svg";
import { currencyFormat } from "../../utils/common";
import userImg from "../../images/user_1.png";

import "./style.scss";

const NFTBaseDetails = ({
  nft,
  placeBidPop,
  setPlaceBidPop,
  bidPlaceHolder,
  setBidPlaceHolder,
  totalBuy,
  userTotalBuys,
  price,
  availableQty,
  userOutBid,
  userLastBid,
  isAuctionStarted,
  isAuctionEnded,
  soldOut,
  auctionEndTime,
  handleAuctionStartTimer,
  handleAuctionEndTimer,
  handleBeforeAuctionEndTimer,
  winner,
  CurrentOrderSlug,
  handleBidExpiredEndTimer,
}) => {
  const history = useHistory();
  const { user } = useSelector((state) => state.user.data);

  const erc721 = nft.nft_type === "erc721";
  const orderDetails = _.get(nft, "order_details", {});

  let desc = nft?.description?.split("\n");

  return (
    <>
      <div className="creator mt-3">
        RADDX Collection
        <span className={`nft-type-band lavender_color`}>
          {nft?.nft_type.toUpperCase()}
        </span>
        {(isAuctionEnded || soldOut) && (
          <span className="nft-type-band rounded-pill error_msg">
            {soldOut ? "Sold Out" : "Auction has ended"}
          </span>
        )}
      </div>
      <div className="nft-title-container">
        <div className="nft-title">{nft.name}</div>
      </div>
      <p className="text-secondary mt-1 mb-5 nft-desc">
        {/* {nft.description && (
          <ReadMoreReact
            min={200}
            ideal={200}
            max={560}
            text={nft.description}
          />
        )} */}
        {/* {desc?.map((description) => (
          <p>
            {description && (
              <ReadMoreReact
                min={300}
                ideal={500}
                max={560}
                text={description}
              />
            )}
          </p>
        ))} */}
        {nft.description && (
          <>
            <p>
              {desc[0] && (
                <ReadMoreReact min={200} ideal={500} max={560} text={desc[0]} />
              )}
            </p>
            <p>
              {desc[1] && (
                <ReadMoreReact min={80} ideal={100} max={560} text={desc[1]} />
              )}
            </p>
          </>
        )}
      </p>

      <div className="bottom-content">
        {erc721 && isAuctionEnded && winner && (
          <>
            <BidValue
              className={"owner-details"}
              title="Owned By"
              avatar={
                !winner.private && winner.avatar_url
                  ? winner.avatar_url
                  : user?.slug === winner.slug && winner.avatar_url
                  ? winner.avatar_url
                  : userImg
              }
              name={
                !winner.private && winner.user_name
                  ? winner.user_name
                  : user?.slug === winner.slug
                  ? `@${user.first_name}${user.last_name}`
                  : winner.user_name
              }
              isEnd
            />
          </>
        )}
        <div className="bottom-content-block">
          <div className="d-flex">
            {erc721 ? (
              <BidValue
                title={(() => {
                  if (isAuctionEnded) {
                    return "Collection Sold for";
                  } else if (orderDetails.total_bids === 0) {
                    return "Minimum Bid";
                  } else if (userLastBid || isAuctionStarted) {
                    return "Current Bid";
                  } else {
                    return "Minimum Bid";
                  }
                })()}
                value={
                  price
                    ? currencyFormat(price, "USD")
                    : currencyFormat(orderDetails?.minimum_bid, "USD")
                }
              />
            ) : (
              <BidValue
                title="Price"
                value={
                  nft?.buy_amount &&
                  currencyFormat(orderDetails?.buy_amount, "USD")
                }
              />
            )}

            {(() => {
              if (user && userLastBid && price) {
                return (
                  <BidValue
                    title="Your Last Bid"
                    value={currencyFormat(userLastBid, "USD")}
                    status={
                      parseFloat(userLastBid) < parseFloat(price)
                        ? "Outbid"
                        : ""
                    }
                  />
                );
              } else if (user && orderDetails.user_highest_bid) {
                return (
                  <BidValue
                    title="Your Last Bid"
                    value={currencyFormat(orderDetails.user_highest_bid, "USD")}
                    status={
                      parseFloat(orderDetails.user_highest_bid) <
                      parseFloat(orderDetails.minimum_bid)
                        ? "Outbid"
                        : ""
                    }
                  />
                );
              } else {
                return null;
              }
            })()}
          </div>
          <hr className="custom-divider" />
          {!isAuctionStarted && (
            <NFTTimeLeft
              title="Auction starts in"
              tooltipText={(() => {
                if (erc721) {
                  if (orderDetails?.auction_extend_minutes) {
                    return `The auction extends by ${orderDetails?.auction_extend_minutes} minutes for every successful bid placed in the last ${orderDetails?.auction_extend_minutes} minutes of the auction.`;
                  } else {
                    return "When there are less than 10 minutes left in the auction, successful bids will not reset the auction ending time";
                  }
                } else {
                  return "NFT Sale";
                }
              })()}
              time={orderDetails.auction_start_time}
              cTime={nft.time}
              handleTimer={handleAuctionStartTimer}
            />
          )}
          {!isAuctionEnded && isAuctionStarted && (
            <NFTTimeLeft
              title="End of Auction"
              tooltipText={(() => {
                if (erc721) {
                  if (orderDetails?.auction_extend_minutes) {
                    return `The auction extends by ${orderDetails?.auction_extend_minutes} minutes for every successful bid placed in the last ${orderDetails?.auction_extend_minutes} minutes of the auction.`;
                  } else {
                    return "When there are less than 10 minutes left in the auction, successful bids will not reset the auction ending time";
                  }
                } else {
                  return "NFT Sale";
                }
              })()}
              time={auctionEndTime}
              cTime={nft.time}
              handleTimer={handleAuctionEndTimer}
              handleBeforeEndTimer={handleBeforeAuctionEndTimer}
            />
          )}
          {isAuctionEnded && (
            <NFTTimeLeft
              title="Auction ended on"
              tooltipText="Auction Ended"
              time={auctionEndTime}
              cTime={nft.time}
              isEnded={true}
            />
          )}
          <hr className="custom-divider" />
          {/* <div className="d-flex">
          {(() => {
            if (erc721) {
              return null; 
            } else if (nft.total_quantity) {
              return (
                <>
                  <BidValue
                    title="Edition(s)"
                    value={
                      availableQty >= 0 && availableQty != null
                        ? `${availableQty} / ${nft.total_quantity}`
                        : `${nft.quantity} / ${nft.total_quantity}`
                    }
                  />
                  {nft.total_user_buys > 0 && (
                    <BidValue
                      title="You Own"
                      value={
                        userTotalBuys
                          ? `${userTotalBuys} / ${nft.total_quantity} NFTs`
                          : `${nft.total_user_buys} / ${nft.total_quantity} NFTs`
                      }
                    />
                  )}

                  <hr className="custom-divider" />
                </>
              );
            } else {
              return (
                <>
                  <BidValue
                    title="Unlimited Edition"
                    value={
                      totalBuy
                        ? `${totalBuy} / unlimited`
                        : `${nft.total_buys}  / unlimited`
                    }
                  />
                </>
              );
            }
          })()}

          {erc721 && isAuctionEnded && winner && (
            <>
              <BidValue
                title="Owned By"
                avatar={
                  !winner.private && winner.avatar_url
                    ? winner.avatar_url
                    : user?.slug === winner.slug && winner.avatar_url
                    ? winner.avatar_url
                    : userImg
                }
                name={
                  !winner.private && winner.user_name
                    ? winner.user_name
                    : user?.slug === winner.slug
                    ? `@${user.first_name}${user.last_name}`
                    : winner.user_name
                }
                isEnd
              />
              <hr className="custom-divider" />
            </>
          )}
        </div>
        <hr className="custom-divider" /> */}

          <div className="text-center btn-flex mt-2">
            {/* <a
            onClick={handleTreasureClick}
            role={"button"}
            className="gift-icon"
          >
            <img src="https://cdn.beyondlife.club/media/mail/treasure_box_animation_light_grey.gif" />
          </a> */}
            <NFTPlaceBid
              nft={nft}
              placeBidPop={placeBidPop}
              setPlaceBidPop={setPlaceBidPop}
              price={price}
              userTotalBuys={userTotalBuys}
              isAuctionStarted={isAuctionStarted}
              isAuctionEnded={isAuctionEnded}
              soldOut={soldOut}
              bidPlaceHolder={bidPlaceHolder}
              setBidPlaceHolder={setBidPlaceHolder}
              CurrentOrderSlug={CurrentOrderSlug}
            />

            {(() => {
              if (parseFloat(user?.balance) <= 0) {
                return (
                  <button
                    disabled={isAuctionEnded}
                    className={`btn ${
                      isAuctionEnded
                        ? "btn-dark place-bid-btn"
                        : "text-white place-bid-btn"
                    } text-center btn-lg rounded-pill`}
                    onClick={() =>
                      window.open(
                        `${process.env.REACT_APP_ACCOUNTS_URL}/accounts/wallet`,
                        "_self"
                      )
                    }
                  >
                    {isAuctionEnded ? "Auction has ended" : "Recharge Wallet"}
                  </button>
                );
              } else if (!user) {
                return (
                  <button
                    disabled={isAuctionEnded}
                    className="btn btn-dark text-center btn-lg rounded-pill place-bid-btn"
                    onClick={() =>
                      window.open(
                        `${process.env.REACT_APP_ACCOUNTS_URL}/signin?redirect=${window.location.href}`,
                        "_self"
                      )
                    }
                  >
                    {isAuctionEnded ? "Auction has ended" : "Sign In"}
                  </button>
                );
              } else if (erc721) {
                return (
                  <button
                    disabled={(() => {
                      if (!isAuctionStarted && !isAuctionEnded) {
                        return !isAuctionStarted;
                      } else {
                        return isAuctionEnded;
                      }
                    })()}
                    className="btn btn-dark text-center btn-lg rounded-pill place-bid-btn"
                    onClick={() => {
                      setPlaceBidPop(!placeBidPop);
                      setBidPlaceHolder("0");
                    }}
                  >
                    {(() => {
                      if (!isAuctionStarted && !isAuctionEnded) {
                        return "Auction has not yet begun";
                      } else if (isAuctionEnded) {
                        return "Auction has ended";
                      } else {
                        return "Place Bid";
                      }
                    })()}
                  </button>
                );
              } else {
                return (
                  <button
                    disabled={(() => {
                      if (!isAuctionStarted && !isAuctionEnded) {
                        return !isAuctionStarted;
                      } else if (isAuctionEnded) {
                        return isAuctionEnded;
                      } else {
                        return soldOut;
                      }
                    })()}
                    className="btn btn-dark text-center btn-lg rounded-pill place-bid-btn"
                    onClick={() => setPlaceBidPop(!placeBidPop)}
                  >
                    {(() => {
                      if (!isAuctionStarted && !isAuctionEnded) {
                        return "Auction has not yet begun";
                      } else if (isAuctionEnded) {
                        return "Auction has ended";
                      } else if (soldOut) {
                        return "Sold Out";
                      } else {
                        return "Buy";
                      }
                    })()}
                  </button>
                );
              }
            })()}

            {/* <div className="mt-2 royalty-info">
            {erc721 &&
              !isAuctionEnded &&
              nft.auction_extend_minutes &&
              `Counterbid within the last 5 minutes will extend the auction by ${nft.auction_extend_minutes} minutes`}
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default NFTBaseDetails;
