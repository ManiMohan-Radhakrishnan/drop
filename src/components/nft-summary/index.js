import React from "react";
import { abbreviateNumber, currencyFormat, percDiff } from "../../utils/common";
import Badge from "./badge";
import "./style.scss";

const NFTSummary = ({
  nft,
  // socketData
  totalBid,
  bidChange,
  totalBuy,
  price,
  totalViews,
  totalFavourites,
}) => {
  const erc721 = nft.nft_type === "erc721";
  return (
    <div className="bg-dark">
      <div className="container-fluid">
        <div className="row">
          <div className="d-flex justify-content-center flex-wrap flex-row point-box">
            {/* <div className="d-flex justify-content-around flex-wrap flex-row point-box"> */}
            <div className="p-4 point-list">
              {erc721 ? (
                <Badge
                  title="Price"
                  // value={
                  //   price
                  //     ? currencyFormat(price, "USD")
                  //     : nft.minimum_bid && currencyFormat(nft.minimum_bid, "USD")
                  // }
                  value={(() => {
                    if (price && price >= 1000) {
                      return `$${abbreviateNumber(price)}`;
                    } else if (price && price < 1000) {
                      return currencyFormat(price, "USD");
                    } else if (
                      nft.order_details.minimum_bid &&
                      nft.order_details.minimum_bid >= 1000
                    ) {
                      return `$${abbreviateNumber(
                        nft.order_details.minimum_bid
                      )}`;
                    } else {
                      return currencyFormat(
                        nft.order_details.minimum_bid,
                        "USD"
                      );
                    }
                  })()}
                  // diff="+2000"
                  diff={
                    bidChange
                      ? bidChange
                      : nft?.order_details?.bid_change.toFixed(2)
                  }
                  tooltip="Price Increased from Last Bid"
                />
              ) : (
                <Badge
                  title="Price"
                  value={
                    price
                      ? currencyFormat(price, "USD")
                      : nft.order_details.buy_amount &&
                        currencyFormat(nft.order_details.buy_amount, "USD")
                  }
                  // diff="-2000"
                  tooltip="Buy Price"
                />
              )}
            </div>
            {erc721 && (
              <div className="p-4 point-list">
                <Badge
                  title="Base Price"
                  value={(() => {
                    if (nft.order_details.starting_bid >= 1000) {
                      return `$${abbreviateNumber(
                        nft.order_details.starting_bid
                      )}`;
                    } else {
                      return currencyFormat(
                        nft.order_details.starting_bid,
                        "USD"
                      );
                    }
                  })()}
                  // diff="+2000"
                  // diff={bidChange ? bidChange : nft.bid_change}
                  diff={
                    price
                      ? percDiff(nft.order_details.starting_bid, price)
                      : percDiff(
                          nft.order_details.starting_bid,
                          nft.order_details.minimum_bid
                        )
                  }
                  tooltip="Base Price"
                />
              </div>
            )}
            <div className="p-4 point-list">
              {erc721 ? (
                <Badge
                  title="Bids"
                  value={totalBid ? totalBid : nft.order_details.total_bids}
                />
              ) : (
                <Badge
                  title="Buys"
                  value={totalBuy ? totalBuy : nft.order_details.total_buys}
                />
              )}
            </div>
            <div className="p-4 point-list">
              <Badge
                title="Views"
                value={totalViews ? totalViews : nft.order_details.page_views}
              />
            </div>
            {/* <div className="p-4 point-list">
              <Badge
                title="Favourites"
                value={
                  totalFavourites
                    ? totalFavourites
                    : nft.order_details.total_favourites
                }
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTSummary;
