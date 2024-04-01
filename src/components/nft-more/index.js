import React, { useRef } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import MoreCard from "./more-card";

import "./style.scss";

const NFTMore = ({ nftList = [], slug, price, auctionEndTime }) => {
  const ref = useRef(0);
  const scroll = (type) => {
    var width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    const one_rem = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );

    if (type === "left") {
      if (width <= 560) {
        ref.current.scrollLeft += -(width - one_rem);
      } else if (width <= 992 && width > 560) {
        ref.current.scrollLeft += -(width / 2 - one_rem);
      } else if (width <= 1024 && width > 992) {
        ref.current.scrollLeft += -(width / 3 - one_rem);
      } else {
        ref.current.scrollLeft += -(width / 4 - one_rem);
      }
    } else {
      if (width <= 560) {
        ref.current.scrollLeft += width - one_rem;
      } else if (width <= 992 && width > 560) {
        ref.current.scrollLeft += width / 2 - one_rem;
      } else if (width <= 1024 && width > 992) {
        ref.current.scrollLeft += width / 3 - one_rem;
      } else {
        ref.current.scrollLeft += width / 4 - one_rem;
      }
    }
  };

  return (
    <div className="nft-more">
      <div className="title">
        More from this artist
        <span className="title-count">({nftList.length})</span>
      </div>
      <div ref={ref} className="nft-more-content">
        {nftList.map((nft) => {
          let label = "",
            time,
            isEnded = false,
            isStarted = false,
            bidBuyValue = 0;

          if (new Date(nft.auction_start_time) > new Date()) {
            label = "Starting in";
            time = nft.auction_start_time;
          } else if (new Date(nft.auction_end_time) > new Date()) {
            if (nft.slug === slug) {
              time = auctionEndTime ? auctionEndTime : nft.auction_end_time;
            } else {
              time = nft.auction_end_time;
            }
            label = "Ends in";
            isStarted = true;
          } else {
            time = nft.auction_end_time;
            label = "Ended at";
            isEnded = true;
          }

          if (nft.nft_type === "erc721") {
            if (nft.slug === slug) {
              bidBuyValue = price ? price : nft.top_bid;
            } else {
              bidBuyValue = nft.top_bid;
            }
          } else {
            bidBuyValue = nft.buy_amount;
          }

          return (
            <MoreCard
              key={nft.slug}
              nft={nft}
              bidBuyPrice={bidBuyValue}
              isStarted={isStarted}
              isEnded={isEnded}
              time={time}
              label={label}
            />
          );
        })}
      </div>
      <button className="chevron-left-nav" onClick={() => scroll("left")}>
        <BsChevronLeft />
      </button>
      <button className="chevron-right-nav" onClick={() => scroll("right")}>
        <BsChevronRight />
      </button>
    </div>
  );
};

export default NFTMore;
