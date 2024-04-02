import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import { ReactComponent as ARIcon } from "../../images/cric/img/cube.svg";

import NFTCounter from "../nft-counter";
import Image360 from "../../images/cric/img/360-degree-rotate.svg";

import "../new-drops-temp/style.scss";

import ScratchCard from "react-scratchcard";
import { bidDetail } from "../../api/actioncable-methods";
import { nftDetailApi } from "../../api/methods";

const DropCard = ({
  animateBtn,
  btnName,
  img,
  contentType,
  isBuy = false,
  cardTitle,
  smallTitle,
  started,
  cardDesc,
  dropTitle,
  endDate,
  isEnded,
  tba = false,
  setCheck,
  enabled = true,
  dropDescOne,
  dropDescTwo,
  dropDescThree,
  auctionTitle,
  auctionTime,
  editionTitle,
  itemTitle,
  itemType,
  editionType,

  additional,
  additionalDesc,
  slug,
  catName,
  type,
  price,
  priceTitle,
  year,
  is3D = false,
  setAuctionEndTime1,
  setAuctionEndTime2,
  setAuctionEndTime3,
}) => {
  const settings = {
    width: 300,
    height: 300,
    image: "https://picsum.photos/300/300",
    finishPercent: 50,
    onComplete: () => console.log("The card is now clear!"),
  };

  const { user } = useSelector((state) => state.user.data);

  const history = useHistory();
  const handleClick = () => {
    if (type === "loot") {
      !isEnded && history.push(`/explore/loot/${slug}`);
    } else {
      history.push(`/details/${slug}`);
    }
  };

  const [nftPrice, setNFTPrice] = useState(0);

  useEffect(() => {
    if (type !== "loot") {
      nftDetail();
    }
  }, [slug]);

  useEffect(() => {
    if (type !== "loot") {
      bidDetail(slug, (data) => {
        setNFTPrice(parseInt(data.minimum_bid));
        if (data.auction_end_time) {
          if (year === "1983") {
            setAuctionEndTime1(data.auction_end_time);
          } else if (year === "2003") {
            setAuctionEndTime2(data.auction_end_time);
          } else if (year === "2011") {
            setAuctionEndTime3(data.auction_end_time);
          }
        }
      });
    }
  }, []);

  const nftDetail = async () => {
    try {
      let response = await nftDetailApi({ nft_slug: slug });
      const NFT = response.data.data.nft;
      setNFTPrice(NFT.minimum_bid);
      if (year === "1983") {
        setAuctionEndTime1(NFT.auction_end_time);
      } else if (year === "2003") {
        setAuctionEndTime2(NFT.auction_end_time);
      } else if (year === "2011") {
        setAuctionEndTime3(NFT.auction_end_time);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* <ScratchCard {...settings}>
        <div
          style={{
            padding: "2rem",
            fontSize: "2rem",
            background: "white",
            color: "#222",
          }}
        >
          hello world
        </div>
      </ScratchCard> */}
      <div className="container">
        <div className="row">
          <div className="card_title">
            <h2>{cardTitle}</h2>
            <p className="small-title mb-3">{smallTitle}</p>
            <p>{cardDesc}</p>
          </div>
        </div>
        <div className="row drop_card">
          <div className="col-lg-6 border-right">
            <div className="drop-title">
              <h4 className="mb-4">{dropTitle}</h4>
              <p className="align-left-mobile">{dropDescOne}</p>
              <p className={!dropDescThree ? "mb-4 align-left-mobile" : ""}>
                {dropDescTwo}
              </p>
              <p className="mb-4">{dropDescThree}</p>
            </div>

            <div className="auction-mains">
              <div className="">
                <p className="heading-S">{auctionTitle}</p>

                {(() => {
                  if (isEnded) {
                    return (
                      <div className="end-date">
                        {dayjs(endDate).format("DD. MM. YYYY")}
                      </div>
                    );
                  } else {
                    return (
                      auctionTime && (
                        <NFTCounter
                          time={auctionTime}
                          handleEndEvent={setCheck}
                        />
                      )
                    );
                  }
                })()}
              </div>
              <div className="auction-two">
                <p className="heading-S">{itemTitle}</p>
                <h1>{itemType} </h1>
              </div>
            </div>

            <div className="auction-main1">
              <div className="auction-one">
                <p className="heading-S">
                  {nftPrice && isEnded
                    ? "Collection Sold for"
                    : nftPrice
                    ? "Current Bid Price"
                    : priceTitle}
                </p>
                <h1>{nftPrice ? `$${nftPrice}` : price}</h1>
              </div>
              <div className="auction-two">
                <p className="heading-S">{editionTitle}</p>
                <h1>{editionType} </h1>
              </div>
            </div>
            {additional && additionalDesc && (
              <div className="additional-perks">
                <p className="heading-S">{additional}</p>
                <p>{additionalDesc}</p>
              </div>
            )}
            <div className="bottom-border-mobile"></div>
          </div>
          <div className="col-lg-6">
            <div className="drop-card-post">
              <div className="img-table">
                {started && enabled ? (
                  contentType === "video" ? (
                    <video
                      loop
                      muted
                      autoPlay
                      playsInline
                      src={img}
                      role={
                        type === "loot"
                          ? !isEnded
                            ? "button"
                            : "figure"
                          : "button"
                      }
                      onClick={handleClick}
                    ></video>
                  ) : (
                    <Image
                      role={
                        type === "loot"
                          ? !isEnded
                            ? "button"
                            : "figure"
                          : "button"
                      }
                      src={img}
                      onClick={handleClick}
                    />
                  )
                ) : contentType === "video" ? (
                  <video loop muted autoPlay playsInline src={img}></video>
                ) : (
                  <Image src={img} />
                )}
                {/* {contentType == "video" ? (
                  <video
                    loop
                    muted
                    autoPlay
                    playsInline
                    src={img}
                    role={"button"}
                    onClick={handleClick}
                  ></video>
                ) : (
                  <Image role={"button"} src={img} onClick={handleClick} />
                )} */}
                {is3D && (
                  <Link
                    to={`/mcl/bat/3D/${year}/${slug}`}
                    className="stop-animate btn3d"
                  >
                    {/* <ARIcon /> */}
                    <div className="btnImgBlock">
                      <img src={Image360} />
                    </div>
                  </Link>
                )}
                <div className={`learnMore flex-btn-grp ${animateBtn}`}>
                  {started && enabled ? (
                    <>
                      {type === "loot" ? (
                        <>
                          {/* {!isEnded && (
                            <Link to="#" onClick={handleClick}>
                              {btnName}
                            </Link>
                          )} */}
                          <Link to="#">{btnName}</Link>
                        </>
                      ) : (
                        <>
                          <Link to="#" onClick={handleClick}>
                            {isEnded ? "Explore" : "Auction Now"}
                          </Link>
                        </>
                      )}
                    </>
                  ) : (
                    <Link
                      to="#"
                      onClick={() => {
                        if (user?.slug) {
                          window.open(
                            `${process.env.REACT_APP_ACCOUNTS_URL}/accounts/wallet#web`,
                            "_self"
                          );
                        } else {
                          window.open(
                            `${
                              process.env.REACT_APP_ACCOUNTS_URL
                            }/signup?fsz=${sessionStorage.getItem("fsz")}`,
                            "_self"
                          );
                        }
                      }}
                    >
                      {user?.slug ? <>Fund Your Wallet </> : "Fund Your Wallet"}
                    </Link>
                  )}

                  {/* <button type="button" onClick={()=> setModal(true)}>Place Your Bid Right Now!</button>  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DropCard;
