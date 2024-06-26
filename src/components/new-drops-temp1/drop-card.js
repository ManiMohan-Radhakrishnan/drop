import React, { useState } from "react";
import { useHistory } from "react-router";
import Image from "react-bootstrap/Image";
import NFTCounter from "../nft-counter";
import "../new-drops-temp/style.scss";
import { Link } from "react-router-dom";

const DropCard = ({
  Id,
  ref,
  img,
  cardTitle,
  smallTitle,
  cardDesc,
  dropTitle,
  dropDescOne,
  dropDescTwo,
  auctionTitle,
  auctionTime,
  editionTitle,
  editionType,
  additional,
  additionalDesc,
  slug,
  catName,
  scroll,
}) => {
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
              <p className="mb-4">{dropDescTwo}</p>
            </div>
            <div className="auction-time">
              <h5>{auctionTitle}</h5>
              <NFTCounter time={"Nov 04, 2021 00:00:00"} />
            </div>
            <div className="auction-main">
              <div className="auction-one">
                <p className="heading-S">Minimum Price</p>
                <h1>TBA</h1>
              </div>
              <div className="auction-two">
                <p className="heading-S">{editionTitle}</p>
                <h1>{editionType} </h1>
              </div>
            </div>
            <div className="additional-perks">
              <h5>{additional}</h5>
              <p>{additionalDesc}</p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="drop-card-post">
              <Image src={img} />
              <div className="learnMore">
                <Link to="#" onClick={scroll}>
                  Join The Waitlist
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DropCard;
