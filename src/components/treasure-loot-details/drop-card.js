import React from "react";
import dayjs from "dayjs";
import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import NFTCounter from "../nft-counter";

import "../new-drops-temp/style.scss";

const DropCard = ({
  img,
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
}) => {
  const { user } = useSelector((state) => state.user.data);

  const history = useHistory();
  const handleClick = () => {
    if (type === "loot") {
      history.push(`/explore/loot/${slug}`);
    } else {
      history.push(`/explore/category/${catName}/${slug}`);
    }
  };

  return (
    <>
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
              <p>{dropDescOne}</p>
              <p className={!dropDescThree ? "mb-4" : ""}>{dropDescTwo}</p>
              <p className="mb-4">{dropDescThree}</p>
            </div>

            <div className="auction-mains">
              <div className="">
                <p className="heading-S">{auctionTitle}</p>

                {(() => {
                  if (type === "loot") {
                    if (tba) {
                      return <div className="end-date">TBA</div>;
                    } else {
                      if (started) {
                        return <div className="end-date">10. 01. 2022</div>;
                      } else {
                        return (
                          <NFTCounter
                            time={auctionTime}
                            handleEndEvent={setCheck}
                          />
                        );
                      }
                    }
                  } else {
                    if (isEnded) {
                      return (
                        <div className="end-date">
                          {dayjs(endDate).format("DD. MM. YYYY")}
                        </div>
                      );
                    } else {
                      return (
                        <NFTCounter
                          time={auctionTime}
                          handleEndEvent={setCheck}
                        />
                      );
                    }
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
                <p className="heading-S">{priceTitle}</p>
                <h1>{price}</h1>
              </div>
              <div className="auction-two">
                <p className="heading-S">{editionTitle}</p>
                <h1>{editionType} </h1>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="drop-card-post">
              <div className="img-table">
                {started && enabled ? (
                  <Image
                    role={type !== "loot" && "button"}
                    src={img}
                    onClick={type !== "loot" && handleClick}
                  />
                ) : (
                  <Image src={img} />
                )}
                <div className="learnMore">
                  {started && enabled ? (
                    <>
                      {type !== "loot" && (
                        <Link to="#" onClick={handleClick}>
                          Explore
                        </Link>
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
                      {user?.slug ? (
                        <>Get Ready For This NFT </>
                      ) : (
                        "Join The Waitlist "
                      )}
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
