import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import {
  carBiddingDetailsApi,
  nftActiveOrders,
  nftBidHistory,
  nftBidWinner,
  nftBuyHistory,
  nftDetailApi,
  nftMoreApi,
  orderBidHistory,
} from "../api/methods";
import BidAuction from "../components/bid-auction";
import BidHistory from "../components/bid-history";
import BuyHistory from "../components/buy-history/index";
import BidWinner from "../components/bid-winner";
import ChainAttributes from "../components/chain-attributes";
import Header from "../components/landing-home/header";
// import Header from "../components/landing-home/header";
import NFTArtist from "../components/nft-artist";
import NFTBaseDetails from "../components/nft-basic-details";
import NFTMedia from "../components/nft-media";
import NFTMore from "../components/nft-more";
import NFTProperties from "../components/nft-properties";
import NFTSectionTitle from "../components/nft-section-title";
import NFTTags from "../components/nft-tags";
import toaster from "../utils/toaster";
import NFTSummary from "./../components/nft-summary";
import SubHeader from "./../components/sub-header";
import { NFTLoader } from "../components/nft-basic-details/content-loader";
import {
  bidDetail,
  buyDetail,
  pageView,
  totalFav,
  userBidDetail,
  userBuyDetail,
  winnerDetail,
} from "../api/actioncable-methods";
import NFTPlayerStats from "../components/nft-player-stats";
import Footer from "../components/raddax-nft/footer";
import NFTChildProperties from "../components/nft-child-properties";
import _ from "lodash";

const Details = ({ details = false, hideMenus = false }) => {
  const hideSlug = ["VAqOGlvSb3Kygw8p", "O39gydkSlLBPYZob"];
  const history = useHistory();
  const { slug } = useParams();

  // let { orderSlug } = useParams();

  // orderSlug = details ? currentOrderSlug : orderSlug;

  const [small, setSmall] = useState(false);
  const [nft, setNft] = useState({});
  const [auctionEndTime, setAuctionEndTime] = useState("");
  const [nftMoreList, setNftMoreList] = useState([]);
  const [buyHistory, setBuyHistory] = useState([]);
  const [bidHistory, setBidHistory] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [bidWinner, setBidWinner] = useState(null);
  const [erc721, setErc721] = useState(false);
  const [isAuctionStarted, setIsAuctionStarted] = useState(false);
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);
  const [soldOut, setSoldOut] = useState(false);
  const [loader, setLoader] = useState(true);
  const [placeBidPop, setPlaceBidPop] = useState(false);
  const [animationStatus, setAnimationStatus] = useState(null);
  const [bidPlaceHolder, setBidPlaceHolder] = useState("");

  // Socket State
  const [totalBid, setTotalBid] = useState(0);
  const [bidChange, setBidChange] = useState(0);
  const [totalBuy, setTotalBuy] = useState(0);
  const [price, setPrice] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [totalFavourites, setTotalFavourites] = useState(0);
  const [availableQty, setAvailableQty] = useState(null);
  const [userTotalBuys, setUserTotalBuys] = useState(0);
  const [userOutBid, setUserOutBid] = useState(false);
  const [userLastBid, setUserLastBid] = useState(0);
  const [bidExpired, setBidExpired] = useState(false);
  const orderDetails = _.get(nft, "order_details", {});

  const { user } = useSelector((state) => state.user.data);

  const inputRef = useRef();

  const [currentOrderSlug, setCurrentOrderSlug] = useState();

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, true);
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });

    return () => {
      window.removeEventListener("scroll", scrollHandler, true);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollHandler = () => {
    const position = inputRef.current?.getBoundingClientRect();
    if (position?.top <= 0) {
      updateSubHeader(true);
      localStorage.setItem("sub-header", "true");
    } else {
      updateSubHeader(false);
      localStorage.setItem("sub-header", "false");
    }
  };

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    if (currentOrderSlug) {
      bidDetail(currentOrderSlug, (data) => {
        // debugger;

        setTotalBid(data.total_bids);
        setBidChange(data.bid_change);
        setPrice(data.minimum_bid);
        if (data.history) {
          setBidHistory((bidHistory) => [data.history, ...bidHistory]);
        }
        if (data.auction_end_time) {
          setAuctionEndTime(data.auction_end_time);
        }
        setBidExpired(false);
      });
      pageView(currentOrderSlug, (data) => {
        setTotalViews(data.page_views);
      });

      totalFav(slug, (data) => {
        setTotalFavourites(data.total_favourites);
      });

      winnerDetail(slug, currentOrderSlug, (data) => {
        setBidWinner(data.winner_details);
        setAnimationStatus(true);
        setTimeout(() => setAnimationStatus(false), 30000);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOrderSlug]);

  useEffect(() => {
    nftDetail(slug);
  }, []);

  useEffect(() => {
    if (user) {
      if (erc721 && currentOrderSlug) {
        userBidDetail(currentOrderSlug, user.slug, (data) => {
          setUserLastBid(data.user_bid);
          setUserOutBid(data.outbid);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [erc721, currentOrderSlug]);

  const updateSubHeader = (input) => {
    if (input) {
      if (localStorage.getItem("sub-header") === "false") {
        setSmall(input);
      }
    } else {
      if (localStorage.getItem("sub-header") === "true") {
        setSmall(input);
      }
    }
  };

  const nftDetail = async (slug) => {
    try {
      setLoader(true);

      let response = await carBiddingDetailsApi(slug);

      const NFT = response.data.data.nft;

      setCurrentOrderSlug(NFT?.order_details?.slug);

      if (NFT.is_loot || NFT.child) {
        history.push("/");
      }

      setAuctionEndTime(NFT?.order_details?.auction_end_time);
      setIsAuctionStarted(
        new Date(NFT.time).getTime() >=
          new Date(NFT.order_details?.auction_start_time).getTime()
      );
      setIsAuctionEnded(
        new Date(NFT.time).getTime() >
          new Date(NFT.order_details?.auction_end_time).getTime()
      );

      setErc721(NFT.nft_type === "erc721");
      if (NFT.nft_type === "erc721") {
        let history = await orderBidHistory({
          order_slug: NFT?.order_details?.slug,
          page: 1,
        });
        let winner = await nftBidWinner({
          order_slug: NFT?.order_details?.slug,
        });
        setBidHistory(history.data.data.histories);
        setTotalCount(history.data.data.total_count);
        setBidWinner(winner.data.data.winner);
      } else {
        if (NFT.quantity === 0) {
          setSoldOut(true);
        }
        let history = await nftBuyHistory({ nft_slug: slug, page: 1 });
        setBuyHistory(history.data.data.histories);
        setTotalCount(history.data.data.total_count);
      }

      setNft(response?.data?.data?.nft);
      setLoader(false);
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.status !== 404)
        toaster(
          500,
          "The request could not be processed at this time. Please try again.!"
        );
      if (err?.response?.data?.status === 404) {
        history.push("/not-found");
      }
    }
  };

  const handleAuctionStartTimer = () => {
    setIsAuctionStarted(true);
  };
  const handleAuctionEndTimer = () => {
    setIsAuctionEnded(true);
  };

  const handleBeforeAuctionEndTimer = () => {
    getAuctionEndTime();
  };

  const getAuctionEndTime = async () => {
    try {
      let response = await carBiddingDetailsApi(slug, 1);
      const NFT = response.data.data.nft;
      setAuctionEndTime(NFT?.order_details?.auction_end_time);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <Header /> */}
      {!hideMenus && <Header />}

      {loader ? (
        <NFTLoader />
      ) : (
        <section className="detail-page-content">
          <div className="bid_section_wrapper">
            <div className="container-fluid">
              <div className="row fit-to-height">
                <div className="col-12 col-lg-7">
                  <NFTMedia
                    nft={nft}
                    title={nft?.name}
                    slug={nft?.slug}
                    isFav={nft?.is_user_fav}
                    hideMenus={hideMenus}
                  />
                </div>

                <div className="col-12 col-lg-5">
                  <NFTBaseDetails
                    CurrentOrderSlug={currentOrderSlug}
                    nft={nft}
                    placeBidPop={placeBidPop}
                    setPlaceBidPop={setPlaceBidPop}
                    bidPlaceHolder={bidPlaceHolder}
                    setBidPlaceHolder={setBidPlaceHolder}
                    //Socket states start
                    totalBid={totalBid}
                    bidChange={bidChange}
                    totalBuy={totalBuy}
                    price={price}
                    totalViews={totalViews}
                    totalFavourites={totalFavourites}
                    availableQty={availableQty}
                    userTotalBuys={userTotalBuys}
                    userOutBid={userOutBid}
                    userLastBid={userLastBid}
                    //Socket states end

                    isAuctionStarted={isAuctionStarted}
                    isAuctionEnded={isAuctionEnded}
                    soldOut={soldOut}
                    auctionEndTime={auctionEndTime}
                    handleAuctionStartTimer={handleAuctionStartTimer}
                    handleAuctionEndTimer={handleAuctionEndTimer}
                    handleBeforeAuctionEndTimer={handleBeforeAuctionEndTimer}
                    winner={bidWinner}
                  />
                </div>
              </div>
            </div>
          </div>

          <div ref={inputRef}>
            <NFTSummary
              nft={nft}
              totalBid={totalBid}
              bidChange={bidChange}
              totalBuy={totalBuy}
              price={price}
              totalViews={totalViews}
              totalFavourites={totalFavourites}
            />
          </div>
          <div className="property_section_wrapper">
            <div className="container-fluid">
              <div className="row ">
                <div className="col-12 col-lg-6 order-lg-2 mb-4">
                  {(() => {
                    if (erc721) {
                      if (isAuctionStarted && !isAuctionEnded) {
                        return (
                          <BidHistory
                            nft={nft}
                            histories={bidHistory}
                            isAuctionEnded={isAuctionEnded}
                            totalCount={totalCount}
                            bidExpired={bidExpired}
                            orderDetails={orderDetails}
                          />
                        );
                      } else if (isAuctionEnded) {
                        if (bidWinner) {
                          return (
                            <BidWinner
                              orderDetails={orderDetails}
                              winner={bidWinner}
                              histories={bidHistory}
                              animationStatus={animationStatus}
                            />
                          );
                        } else {
                          return (
                            <BidHistory
                              nft={nft}
                              histories={bidHistory}
                              isAuctionEnded={isAuctionEnded}
                              totalCount={totalCount}
                              bidExpired={bidExpired}
                              orderDetails={orderDetails}
                            />
                          );
                        }
                      } else {
                        return (
                          <BidAuction
                            status="start"
                            bottomTitle="Auction starting in"
                            time={nft?.order_details?.auction_start_time}
                            cTime={nft.time}
                          />
                        );
                      }
                    } else {
                      if (isAuctionStarted && !isAuctionEnded) {
                        return (
                          <BuyHistory
                            nft={nft}
                            histories={buyHistory}
                            isAuctionEnded={isAuctionEnded}
                            totalCount={totalCount}
                          />
                        );
                      } else if (isAuctionEnded) {
                        return (
                          <BidAuction
                            status="end"
                            bottomTitle={
                              nft.total_quantity
                                ? "Limited Edition"
                                : "Unlimited Edition"
                            }
                            bottomValue={(() => {
                              if (nft.total_quantity) {
                                return availableQty >= 0 && availableQty != null
                                  ? `${availableQty} / ${nft.total_quantity}`
                                  : `${nft.quantity} / ${nft.total_quantity}`;
                              } else {
                                return totalBuy
                                  ? `${totalBuy} / unlimited`
                                  : `${nft.total_buys}  / unlimited`;
                              }
                            })()}
                            userTotalBuys={(() => {
                              if (userTotalBuys) {
                                return userTotalBuys;
                              } else if (nft.total_user_buys) {
                                return nft.total_user_buys;
                              } else {
                                return 0;
                              }
                            })()}
                          />
                        );
                      } else {
                        return (
                          <BidAuction
                            status="start"
                            bottomTitle="Auction starting in"
                            time={nft?.order_details?.auction_start_time}
                            cTime={nft.time}
                          />
                        );
                      }
                    }
                  })()}
                  {/* <BidWinner data={data} /> */}
                </div>
                <div className="col-12 col-lg-6 order-lg-1">
                  {/* {(() => {
                    if (
                      nft?.properties &&
                      typeof nft?.properties === "string"
                    ) {
                      let propertiesData = JSON.parse(nft?.properties);
                      if (
                        propertiesData &&
                        Object.keys(propertiesData)?.length > 0
                      ) {
                        return <NFTProperties properties={propertiesData} />;
                      }
                    } else {
                      if (
                        nft?.properties &&
                        Object.keys(nft?.properties)?.length > 0
                      ) {
                        return <NFTProperties properties={nft?.properties} />;
                      }
                    }
                  })()} */}

                  {nft?.children.length > 0 && (
                    <>
                      {/* <div className="mt-5"></div> */}
                      <NFTChildProperties child={nft?.children} />
                    </>
                  )}

                  {/* {nft?.chain_attributes.length > 0 && (
                    <>
                      <div className="mt-5"></div>
                      <ChainAttributes chains={nft.chain_attributes} />
                    </>
                  )} */}

                  {/* <NFTTags tags={nft.tag_names} /> */}
                </div>
              </div>
              {/* {!hideSlug.includes(slug) && (
                <>
                  <NFTSectionTitle title="Artist / Brand" />
                  <div className="mt-5">
                    <NFTArtist artistId={nft?.artist_id} />
                  </div>
                </>
              )} */}
              {/* {nftMoreList.length > 0 && (
                <div className="mt-5">
                  <NFTMore
                    nftList={nftMoreList}
                    slug={slug}
                    price={price}
                    auctionEndTime={auctionEndTime}
                  />
                </div>
              )} */}
            </div>
          </div>
        </section>
      )}

      {!hideMenus && <Footer />}
    </>
  );
};

export default Details;
