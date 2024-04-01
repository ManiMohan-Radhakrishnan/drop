import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import { Offcanvas } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";

import ErrorText from "./error-text";
import sample from "../../images/sampleNFT.jpg";
import {
  bidBuyError,
  currencyFormat,
  validateCurrency,
  validateQuantity,
} from "../../utils/common";
import { nftBidApi, nftBuyApi } from "../../api/methods";
import ToolTip from "../tooltip/index";

import "./style.scss";
import { toast } from "react-toastify";

const NFTPlaceBid = ({
  placeBidPop = false,
  setPlaceBidPop,
  nft,
  bidPlaceHolder,
  setBidPlaceHolder,
  // socketData,
  price,
  userTotalBuys,
  isAuctionStarted,
  isAuctionEnded,
  soldOut,
  CurrentOrderSlug,
}) => {
  const { user } = useSelector((state) => state.user.data);
  const { params } = useRouteMatch();

  const [success, setSuccess] = useState(false);
  const [successData, setSuccessData] = useState({});

  const erc721 = nft.nft_type === "erc721";
  const [noBalance, setNoBalance] = useState(false);

  // const [buyAmount, setBuyAmount] = useState(0);
  // const [buyQuantity, setBuyQuantity] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [error, setError] = useState("");

  // const [buy, setBuy] = useState({
  //   amountClass: "",
  //   progressError: "",
  //   buttonDisable: true,
  //   processClass: "",
  //   buttonName: "Buy NFTs",
  //   isError: false,
  //   errorTitle: "",
  //   errorDescription: "",
  // });

  const [bid, setBid] = useState({
    bidError: "",
    progressError: "",
    buttonDisable: true,
    processClass: "",
    buttonName: "Place Bid",
    isError: false,
    errorTitle: "",
    errorDescription: "",
  });

  //pop up reset
  useEffect(() => {
    setNoBalance(false);
    setBidAmount("");
    setError("");

    setBid({
      bidError: "",
      progressError: "",
      buttonDisable: true,
      processClass: "",
      buttonName: "Place Bid",
      isError: false,
      errorTitle: "",
      errorDescription: "",
    });
  }, [params]);

  const handleBid = async () => {
    setBidPlaceHolder("");
    if (!user)
      window.open(
        `${process.env.REACT_APP_ACCOUNTS_URL}/signin?redirect=${window.location.href}`,
        "_self"
      );

    if (!isAuctionEnded) {
      try {
        setBid({
          ...bid,
          progressError: "loading",
          processClass: "process",
          buttonName: "Processing...",
          buttonDisable: true,
        });
        const result = await nftBidApi({
          order_slug: CurrentOrderSlug,
          order: { amount: parseFloat(bidAmount) },
        });
        if (result.data.success) {
          setSuccess(true);
          setSuccessData(result.data.data.bid);
          setBid({
            ...bid,
            progressError: "",
            processClass: "",
            buttonName: "Place Bid",
            buttonDisable: false,
          });
        }
      } catch (error) {
        if (error.response.data.status === 422) {
          const err = bidBuyError(error.response.data.fail_status);
          // setBid({
          //   ...bid,
          //   isError: true,
          //   progressError: "error-progress",
          //   errorTitle: err.title,
          //   errorDescription: err.description,
          // });
          toast.error(error?.response?.data?.message);
        }

        const err = bidBuyError(error.response.data.fail_status);
        setBid({
          ...bid,
          isError: true,
          progressError: "error-progress",
          errorTitle: err.title,
          errorDescription: err.description,
        });
      }
    } else {
      const err = bidBuyError(702);
      setBid({
        ...bid,
        isError: true,
        errorTitle: err.title,
        errorDescription: err.description,
      });
      toast.error(error?.response?.data?.message);
    }
  };

  const handleSuccess = () => {
    setPlaceBidPop(!placeBidPop);
    // window.location.reload();
    setSuccess(false);

    setBidAmount("");
    setBid({
      ...bid,
      buttonDisable: true,
    });
  };

  const handleBidInputChange = (e) => {
    if (e.target.value) {
      const minimumBid = price ? price : nft.order_details.minimum_bid;
      if (validateCurrency(e.target.value)) {
        if (user) {
          if (parseFloat(user.balance) < parseFloat(e.target.value)) {
            setBid({
              ...bid,
              progressError: "error-progress",
              buttonDisable: true,
            });
            setError("error-balance");
            setNoBalance(true);
            setBidAmount(e.target.value);
          } else if (
            (price || nft.order_details.total_bids > 0) &&
            parseFloat(e.target.value) <= parseFloat(minimumBid)
          ) {
            setBid({
              ...bid,
              progressError: "error-progress",
              buttonDisable: true,
            });
            setError("error-bid");
            setNoBalance(false);
            setBidAmount(e.target.value);
          } else if (
            (!price || nft.order_details.total_bids === 0) &&
            parseFloat(e.target.value) <
              parseFloat(nft.order_details.starting_bid)
          ) {
            setBid({
              ...bid,
              progressError: "error-progress",
              buttonDisable: true,
            });
            setError("error-bid");
            setNoBalance(false);
            setBidAmount(e.target.value);
          } else {
            setBid({ ...bid, progressError: "", buttonDisable: false });
            setNoBalance(false);
            setError("");
            setBidAmount(e.target.value);
          }
        } else {
          setBidAmount(e.target.value);
          setBid({ ...bid, buttonDisable: false });
        }
      }
    } else {
      setBidAmount(e.target.value);
      setNoBalance(false);
      setError("");
      setBid({ ...bid, bidError: "", progressError: "", buttonDisable: true });
    }
  };

  return (
    <Offcanvas
      show={placeBidPop}
      onHide={() => setPlaceBidPop(!placeBidPop)}
      placement="end"
      className="w-100 w-md-50 w-lg-42"
    >
      <Offcanvas.Body className="p-0 pop-body-container">
        {user ? (
          <>
            <div className="pop-nft-details">
              {!success ? (
                <>
                  <div className="pop-head-content">
                    <div className="pop-bid-title">
                      {erc721 ? "Place Bid" : "Place a buy"}
                    </div>
                    <div
                      className="close-button-pop"
                      onClick={() => setPlaceBidPop(!placeBidPop)}
                    >
                      {/* <BiX
                        role="button"
                        size={45}
                        onClick={() => setPlaceBidPop(!placeBidPop)}
                      /> */}
                      <img
                        alt="place bid logo"
                        src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e"
                      ></img>
                    </div>
                  </div>

                  {/* error-progress -> error progress , loading -> progressing */}
                  <div className={`pop-bid-progress ${bid.progressError}`}>
                    <div className="progress-complete"></div>
                  </div>
                  <div className="pop-body-content">
                    <div className="error-float-container">
                      {noBalance && <ErrorText type="nobalance" />}
                      {/* <ErrorText type="ending-time" /> */}
                      {/* {buy.isError && (
                        <ErrorText
                          handleClick={() =>
                            setBuy({
                              ...buy,
                              isError: false,
                              progressError: "",
                            })
                          }
                          type="error"
                          title={buy.errorTitle}
                          desc={buy.errorDescription}
                        />
                      )} */}
                    </div>

                    <div className="pop-nft-media">
                      {(() => {
                        if (nft?.asset_type?.includes("image")) {
                          return (
                            <img
                              alt="media logo"
                              className="type_image typeimg_audio"
                              src={nft.asset_url ? nft.asset_url : sample}
                            />
                          );
                        } else if (nft?.asset_type?.includes("audio")) {
                          return (
                            <>
                              <img
                                alt="media logo"
                                className="type_image typeimg_audio"
                                src={nft.cover_url ? nft.cover_url : sample}
                              />
                              {/* 
                            <audio
                              controls
                              className="shadow-sm audioOnmedia"
                              disablepictureinpicture
                              controlslist="nodownload noplaybackrate"
                            >
                              <source
                                src={nft.asset_url}
                                type={nft.asset_type}
                              />
                              Your browser does not support the audio element.
                            </audio> */}
                            </>
                          );
                        } else if (nft?.asset_type?.includes("video")) {
                          return (
                            <img
                              alt="media logo"
                              className="type_image typeimg_audio"
                              src={nft.cover_url ? nft.cover_url : sample}
                            />
                          );
                        } else {
                          return (
                            <img
                              alt="media logo"
                              className="type_image typeimg_audio"
                              src={nft.asset_url ? nft.asset_url : sample}
                            />
                          );
                        }
                      })()}
                    </div>
                    <div className="pop-author-name text-center mt-3">
                      {/* {nft.category_name} */}
                      Raddx Collection
                    </div>
                    <div className="pop-nft-title text-center mb-1">
                      {nft?.name}
                    </div>

                    {/* error-bid -> less value than min bid,  error-balance -> low value, error-balance-float -> low value in quantity  */}
                    <div className={`input-bid-container mt-5 ${error}`}>
                      <label className="input-bid-text">
                        {erc721
                          ? `Enter ${
                              price || nft?.order_details?.total_bids > 0
                                ? "bid amount greater than"
                                : "minimum bid amount of "
                            } ${currencyFormat(
                              price ? price : nft.order_details.minimum_bid,
                              "USD"
                            )}`
                          : `Enter Quantity`}
                      </label>

                      <div className="input-bid-wrap">
                        <span className="bid-currency">$</span>
                        <input
                          type="text"
                          className="input-bid"
                          value={bidAmount}
                          placeholder={bidPlaceHolder}
                          disabled={(() => {
                            if (!isAuctionStarted && !isAuctionEnded) {
                              return !isAuctionStarted;
                            } else {
                              return isAuctionEnded;
                            }
                          })()}
                          onChange={handleBidInputChange}
                        />
                      </div>
                      <div className="balance-details">
                        {user &&
                          erc721 &&
                          `Your wallet balance is ${currencyFormat(
                            user?.balance,
                            "USD"
                          )}`}
                        {(() => {
                          if (!erc721) {
                            if (userTotalBuys) {
                              return `You can buy maximum of ${
                                userTotalBuys
                                  ? nft.buy_count - userTotalBuys
                                  : nft.buy_count
                              } of this NFT`;
                            } else {
                              return `You can buy maximum of ${
                                nft.total_user_buys
                                  ? nft.buy_count - nft.total_user_buys
                                  : nft.buy_count
                              } of this NFT`;
                            }
                          }
                        })()}
                      </div>
                    </div>
                  </div>
                  <div className="bottom-area">
                    <div className="terms text-secondary">
                      {erc721 ? (
                        <>
                          Once a bid is placed, it cannot be withdrawn.{" "}
                          <ToolTip
                            icon={<u role={"button"}>Learn more</u>}
                            content={
                              "The bid, once placed, cannot be cancelled until it is outbid. Your bid amount will be reflected in 'Funds on Hold' section of your wallet."
                            }
                            placement="top"
                          />{" "}
                          about bid.
                        </>
                      ) : (
                        <>
                          An nft can't be reversed after it's been purchased.
                          <a
                            href={process.env.REACT_APP_HELP_URL}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Learn more
                          </a>{" "}
                          about how it works.
                        </>
                      )}
                    </div>

                    <div className="bottom-content-pop">
                      <div
                        className="back-button"
                        onClick={() => setPlaceBidPop(!placeBidPop)}
                      >
                        Back
                      </div>
                      <div className="place-bid-button">
                        <button
                          disabled={bid.buttonDisable}
                          className={`btn btn-dark text-center btn-lg w-75 rounded-pill place-bid-btn-pop ${bid.processClass}`} //process -> proccessing
                          onClick={handleBid}
                        >
                          {(() => {
                            if (!isAuctionStarted && !isAuctionEnded) {
                              return "Auction has not yet begun";
                            } else if (isAuctionEnded) {
                              return "Auction has ended";
                            } else if (bidAmount > 0) {
                              return bid.buttonName;
                            } else {
                              return "Please enter bid amount";
                            }
                          })()}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="sucess-title">
                    <FaCheckCircle color={"#23bf61"} size={60} />
                    {erc721 ? (
                      <div className="message mt-3">
                        Bid placed successfully. <br /> Congratulations, you are
                        now the highest bidder!
                      </div>
                    ) : (
                      <div className="message mt-3">
                        NFT successfully bought.
                      </div>
                    )}
                  </div>
                  <div className="pop-body-content success">
                    <div className="pop-nft-media mt-4 preview">
                      {(() => {
                        if (nft?.asset_type?.includes("image")) {
                          return (
                            <img
                              alt="media logo"
                              className="type_image typeimg_audio"
                              src={nft.asset_url ? nft.asset_url : sample}
                            />
                          );
                        } else if (nft?.asset_type?.includes("audio")) {
                          return (
                            <>
                              <img
                                alt="media logo"
                                className="type_image typeimg_audio"
                                src={nft.cover_url ? nft.cover_url : sample}
                              />
                            </>
                          );
                        } else if (nft?.asset_type?.includes("video")) {
                          return (
                            <img
                              alt="media logo"
                              className="type_image typeimg_audio"
                              src={nft.cover_url ? nft.cover_url : sample}
                            />
                          );
                        } else {
                          return (
                            <img
                              alt="media logo"
                              className="type_image typeimg_audio"
                              src={nft.asset_url ? nft.asset_url : sample}
                            />
                          );
                        }
                      })()}
                    </div>
                    <div className="pop-author-name text-center mt-3">
                      {nft.category_name}
                    </div>
                    <div className="pop-nft-title text-center mb-1">
                      {nft?.name}
                    </div>

                    <div className="success-summary-container mt-3">
                      <div className="success-summary">
                        <div>{erc721 ? "Bid price" : "Price"}</div>
                        <div className="bold">
                          {erc721
                            ? currencyFormat(successData.amount, "USD")
                            : currencyFormat(successData.total_amount, "USD")}
                        </div>
                      </div>
                      {!erc721 && (
                        <div className="success-summary">
                          <div>Quantity</div>
                          <div className="bold">{successData.quantity}</div>
                        </div>
                      )}
                      <div className="success-summary">
                        <div>{erc721 ? "Bid placed on" : "Time"}</div>
                        <div className="bold">
                          {dayjs(successData.created_at).format(
                            "MMM D, YYYY hh:mm A"
                          )}
                        </div>
                      </div>

                      {erc721 && (
                        <div className="success-summary">
                          <div>Bid placed for</div>
                          <div className="bold">{nft?.name}</div>
                        </div>
                      )}

                      <div className="success-summary">
                        <div>Transaction ID</div>
                        <div className="bold">{successData.transaction_id}</div>
                      </div>
                    </div>
                  </div>
                  <div className="bottom-area">
                    <div className="bottom-content-pop">
                      <div className="place-bid-button">
                        <button
                          className="btn btn-dark text-center btn-lg w-75 rounded-pill place-bid-btn-pop "
                          onClick={handleSuccess}
                        >
                          Okay
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="pop-nft-details">
              <div className="pop-head-content">
                <div className="pop-bid-title">
                  {/* {erc721 ? "Sign in to place a bid" : "Sign in to place a buy"} */}
                </div>
                <div
                  className="close-button-pop"
                  onClick={() => setPlaceBidPop(!placeBidPop)}
                >
                  {/* <BiX
                    role="button"
                    size={45}
                    onClick={() => setPlaceBidPop(!placeBidPop)}
                  /> */}
                  <img
                    alt="bid logo"
                    src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e"
                  ></img>
                </div>
              </div>
              <div className="pop-signin">
                <div className="pop-signin-title text-center mb-1">
                  {erc721 ? "Sign in to place  bid" : "Sign in to place a buy"}
                </div>
                <div className="pop-nft-media">
                  <button
                    className="btn btn-dark text-center btn-lg mt-2 rounded-pill place-bid-btn"
                    onClick={() =>
                      window.open(
                        `${process.env.REACT_APP_ACCOUNTS_URL}/signin?redirect=${window.location.href}`,
                        "_self"
                      )
                    }
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default NFTPlaceBid;
