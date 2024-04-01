import React from "react";

import winnerImg from "../../images/success.png";
import { currencyFormat } from "../../utils/common";
import "./style.scss";

const LootNFTOwn = ({ nft }) => {
  return (
    <>
      <div className="bid-winner">
        <div className="winner-title">
          <div className="winner-text">HURRAY!</div>
        </div>
        <div className="winner_details">
          <div className="winner-user-details">
            <img alt="" src={winnerImg} />
            <div className="winner-id">Congratulations!!</div>
          </div>
          <div className="">
            {/* <div className="lastbid-left">
              <div className="lastbid-title">Price</div>
              <div className="lastbid-value">
                {currencyFormat(
                  nft.buy_amount ? nft.buy_amount : nft.minimum_bid,
                  "USD"
                )}
              </div>
            </div> */}

            <table className="text-start mt-3 winner-table w-100">
              <tr>
                <th>Collection</th>
                <td>
                  {nft?.core_statistics?.role === "Bat"
                    ? "Meta Cricket League Signed Bat"
                    : "Meta Cricket League Players"}
                </td>
              </tr>
              <tr>
                <th>Category</th>
                <td>{nft?.core_statistics?.category}</td>
              </tr>
              {nft?.core_statistics?.level && (
                <tr>
                  <td>MCL Player Level</td>
                  <td>{nft?.core_statistics?.level}</td>
                </tr>
              )}
              <tr>
                <th>You Own</th>
                <td>
                  {nft.nft_type === "erc721" ? "1 of 1" : nft.total_user_buys}
                </td>
              </tr>
            </table>

            {/* <div className="lastbid-left">
              <div className="lastbid-title">Collection</div>
              <div className="lastbid-value">Meta Cricket League Players</div>
            </div>
            <div className="lastbid-left">
              <div className="lastbid-title">Category</div>
              <div className="lastbid-value">{nft.category_name}</div>
            </div>
            <div className="lastbid-left">
              <div className="lastbid-title">
                Meta Cricket League Player Level
              </div>
              <div className="lastbid-value">{nft.core_statistics.level}</div>
            </div>
            <div className="lastbid-right">
              <div className="lastbid-date-title">You Own</div>
              <div className="lastbid-date-value">
                {nft.nft_type === "erc721" ? "1 of 1" : nft.total_user_buys}
              </div>
            </div> */}
          </div>
        </div>
        {/* <div className="nft-sold-details">
          <div className="sold-for">
            <div className="sold-for-title">NFT sold for</div>
            <div className="sold-for-value">{currencyFormat(10, "USD")}</div>
          </div>
          <div className="sold-on">
            <div className="sold-on-title">NFT sold on</div>
            <div className="sold-on-value">
              {dayjs(new Date()).format("MMM D, YYYY hh:mm A")}
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default LootNFTOwn;
