import React, { useEffect, useState } from "react";
import ReadMoreReact from "read-more-react";
import { useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { BiX } from "react-icons/bi";
import { useHistory } from "react-router";

import { treasureCheck } from "../../api/methods";
import NFTTimeLeft from "../nft-time-left";
import BidValue from "../bid-value";
import NFTLootBuy from "../nft-loot-buy";
import ToolTip from "../tooltip";
import { ReactComponent as DiscordSvg } from "./../../icons/discord_logo.svg";
import { currencyFormat } from "../../utils/common";

import "./style.scss";

const NFTLootBaseDetails = ({
  category,
  lootBuyPop,
  setLootBuyPop,
  availableQty,
  isAuctionStarted,
  isAuctionEnded,
  soldOut,
  auctionEndTime,
  handleAuctionStartTimer,
  handleAuctionEndTimer,
  canBuy,
  allocatingNFT,
}) => {
  const history = useHistory();

  const { user } = useSelector((state) => state.user.data);

  const [nftCount, setNftCount] = useState(0);
  const [modal, setModal] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const handleTreasureClick = async () => {
    if (user?.slug) {
      const response = await treasureCheck();
      if (response.data.data) {
        setNftCount(response.data.data.count);
        setModal(true);
      }
    } else {
      window.open(
        `${
          process.env.REACT_APP_ACCOUNTS_URL
        }/signin?fsz=${sessionStorage.getItem("fsz")}&redirect=${
          window.location.href
        }`,
        "_self"
      );
    }
  };

  useEffect(() => {
    let myInterval = 0;
    myInterval = setInterval(() => {
      setSeconds(seconds - 1);
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  }, [seconds]);

  return (
    <>
      <div className="creator mt-3">
        Meta Cricket League Collection
        {/* <ToolTip
          icon={<FaCheckCircle size={16} className="ms-2 check-icon" />}
          content="Verified Collection"
          placement="right"
        /> */}
        {(isAuctionEnded || soldOut) && (
          <span className="nft-type-band rounded-pill">
            {soldOut ? "Sold Out" : "Sale has ended"}
          </span>
        )}
      </div>
      <div className="nft-title-container">
        <div className="nft-title">{category.name}</div>
      </div>
      <p className="text-secondary nft-desc">
        {category.category_detail.description && (
          <ReadMoreReact
            min={300}
            ideal={350}
            max={600}
            text={category.category_detail.description}
          />
        )}
      </p>

      <div className="bottom-content">
        <div className="d-flex">
          <BidValue
            title="Buying Price"
            value={
              category.category_detail &&
              currencyFormat(category.category_detail.buy_amount, "USD")
            }
          />
        </div>
        <hr className="custom-divider" />
        {!isAuctionStarted && (
          <NFTTimeLeft
            title="Sale starting in"
            tooltipText="The Super Loot Sale"
            time={category.category_detail.auction_start_time}
            handleTimer={handleAuctionStartTimer}
          />
        )}
        {!isAuctionEnded && isAuctionStarted && (
          <NFTTimeLeft
            title="End of Buying Window"
            tooltipText="The Super Loot Sale"
            time={auctionEndTime}
            handleTimer={handleAuctionEndTimer}
          />
        )}
        {isAuctionEnded && (
          <NFTTimeLeft
            title="Sale ended on"
            tooltipText="Sale Ended"
            time={auctionEndTime}
            isEnded={true}
          />
        )}
        <hr className="custom-divider" />
        <BidValue
          title="Edition(s)"
          value={
            availableQty >= 0 && availableQty != null
              ? `${availableQty} / ${category.category_detail.total_quantity}`
              : `${category.category_detail.quantity} / ${category.category_detail.total_quantity}`
          }
        />

        <hr className="custom-divider" />

        <div className="text-center btn-flex mt-2">
          {/* <a
            href="javascript:;"
            onClick={handleTreasureClick}
            role={"button"}
            className="gift-icon"
          >
            <img
              src="https://cdn.beyondlife.club/media/mail/treasure_box_animation_light_grey.gif"
              alt="treasure"
            />
          </a> */}

          <NFTLootBuy
            category={category}
            lootBuyPop={lootBuyPop}
            availableQty={availableQty}
            setLootBuyPop={setLootBuyPop}
            isAuctionStarted={isAuctionStarted}
            isAuctionEnded={isAuctionEnded}
            soldOut={soldOut}
            setSeconds={setSeconds}
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
                  {isAuctionEnded ? "Sale has ended" : "Recharge Wallet"}
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
                  {isAuctionEnded ? "Sale has ended" : "Sign In"}
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
                    } else if (seconds > 0) {
                      return true;
                    } else if (!canBuy) {
                      return true;
                    } else {
                      return soldOut;
                    }
                  })()}
                  className="btn btn-dark text-center btn-lg rounded-pill place-bid-btn"
                  onClick={() => setLootBuyPop(!lootBuyPop)}
                >
                  {(() => {
                    if (!isAuctionStarted && !isAuctionEnded) {
                      return allocatingNFT ||
                        (!isAuctionStarted && !isAuctionEnded && canBuy)
                        ? "Allocating pre-ordered NFTs..."
                        : "Sale has not yet begun";
                    } else if (isAuctionEnded) {
                      return "Sale has ended";
                    } else if (soldOut) {
                      return "Sold Out";
                    } else if (!canBuy) {
                      return "Allocating pre-ordered NFTs...";
                    } else {
                      return seconds > 0
                        ? `Please wait for ${seconds} seconds`
                        : "BUY NOW";
                    }
                  })()}
                </button>
              );
            }
          })()}
        </div>
      </div>

      <Modal className="tr_box" show={modal} centered>
        <Modal.Body>
          <div className="tr_info">
            {nftCount >= 5 ? (
              <>
                <div className="cong_box">
                  <h3>Congratulations!!</h3>
                  <video
                    loop
                    muted
                    autoPlay
                    playsInline
                    src="https://cdn.beyondlife.club/media/mail/treasure_box_success.mp4"
                  ></video>
                  <h2>
                    You've ensured your Treasure Box! You can open your Treasure
                    Box on 3rd January, 2022 on 8.00PM IST/6.30AM PST to reveal
                    your big prize!
                  </h2>
                  <button
                    type="button"
                    className="tr_btn"
                    onClick={() => history.push("/my-treasure-box")}
                  >
                    Go to Treasure Box
                  </button>
                </div>
              </>
            ) : nftCount === 0 ? (
              <>
                <h2>
                  The Treasure Box is open only to those who have 5 or more
                  NFTs. Start collecting your NFTs now!
                </h2>
                <a
                  className="tr_btn"
                  role={"button"}
                  onClick={() => setModal(!modal)}
                >
                  Buy NFTs
                </a>
              </>
            ) : (
              <>
                <h2>
                  Congrats on the purchase of {nftCount} NFTs! <br /> You,
                  however, got to get {5 - nftCount} more NFTs to make yourself
                  eligible to access the Treasure Box! <br />
                  You have only {nftCount} NFTs, still you have to buy{" "}
                  {5 - nftCount} NFTs
                </h2>
                <a
                  className="tr_btn"
                  role={"button"}
                  onClick={() => setModal(!modal)}
                >
                  Buy More NFTs
                </a>
              </>
            )}
          </div>

          {/* <button
            type="button"
            className="rounded-pill close_btn"
            onClick={() => setModal(false)}
          >
            
          </button> */}
          <BiX
            role="button"
            size={45}
            className="rounded-pill close_btn"
            onClick={() => setModal(false)}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NFTLootBaseDetails;
