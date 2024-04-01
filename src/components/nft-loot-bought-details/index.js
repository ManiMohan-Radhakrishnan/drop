import React from "react";
import ReadMoreReact from "read-more-react";
// import { useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";

import BidValue from "../bid-value";
import ToolTip from "../tooltip";
import { ReactComponent as DiscordSvg } from "./../../icons/discord_logo.svg";
import { currencyFormat } from "../../utils/common";

import "./style.scss";
import { BsFillQuestionCircleFill } from "react-icons/bs";

const NFTLootBoughtDetails = ({ nft }) => {
  // const { user } = useSelector((state) => state.user.data);

  const playerCategory = [
    {
      type: "ROOKIE",
      value: "RO",
      color: "blue_color",
    },
    {
      type: "RARE",
      value: "RA",
      color: "orange_color",
    },
    {
      type: "EPIC",
      value: "EP",
      color: "purple_color",
    },
    {
      type: "LEGEND",
      value: "LG",
      color: "multi_color",
    },
    {
      type: "SUPER RARE",
      value: "SR",
      color: "lavender_color",
    },
    {
      type: "ULTRA RARE",
      value: "UR",
      color: "lavender_color",
    },
    {
      type: "IMMORTAL",
      value: "IM",
      color: "lavender_color",
    },
  ];
  const playerCatData = playerCategory.find(
    (obj) => obj.type === nft?.core_statistics?.category
  );

  return (
    <>
      <div className="creator mt-3">
        {/* Jump.trade Exclusive NFTs{" "} */}
        {nft?.core_statistics?.role === "Bat"
          ? "Meta Cricket League Signed Bat"
          : "Meta Cricket League Players"}
        <span className={`nft-type-band ${playerCatData?.color}`}>
          {nft?.nft_type.toUpperCase()}
        </span>
        {nft?.gl_coin && (
          <span
            className="nft-type-band rounded-pill"
            style={{ background: "#ea337f", color: "#091d15" }}
          >
            This NFT is eligible for {nft?.gl_coin} GL Coins Airdrop{" "}
            <ToolTip
              content={"Airdrop will arrive on or before Q3 2022"}
              icon={
                <BsFillQuestionCircleFill
                  size={16}
                  className="ms-2 question-icon"
                />
              }
              placement="top"
            />
          </span>
        )}
      </div>
      <div className="nft-title-container">
        <div className="nft-title">{nft.name}</div>
      </div>
      <p className="text-secondary nft-desc">
        {nft.description && (
          <ReadMoreReact
            min={200}
            ideal={200}
            max={550}
            text={nft.description}
          />
        )}
      </p>

      <div className="bottom-content">
        {nft?.child && (
          <>
            <div className="d-flex">
              <BidValue
                title="Price"
                value={
                  nft.nft_type === "erc721"
                    ? currencyFormat(nft.minimum_bid, "USD")
                    : currencyFormat(nft.buy_amount, "USD")
                }
              />
            </div>
            <hr className="custom-divider" />
          </>
        )}
        <div className="d-flex">
          <BidValue
            title="Collection"
            value={
              nft?.core_statistics?.role === "Bat"
                ? "Meta Cricket League Signed Bat"
                : "Meta Cricket League Players"
            }
          />
        </div>
        <hr className="custom-divider" />
        <div className="d-flex">
          <BidValue
            title={nft?.core_statistics?.role === "Bat" ? "Type" : "Role"}
            // value={nft?.core_statistics?.role}
            value={
              nft?.core_statistics?.role === "Bat"
                ? nft?.properties?.bat_type
                : nft?.core_statistics?.role
            }
          />
        </div>

        <hr className="custom-divider" />
        <div className="d-flex">
          <BidValue title="Category" value={nft?.core_statistics?.category} />
        </div>

        <hr className="custom-divider" />
        {/* <div className="d-flex">
          {(() => {
            if (nft.nft_type === "erc721") {
              return <BidValue title="You Own" value="1 of 1" />;
            } else {
              return (
                <BidValue
                  title="You Own"
                  value={
                    nft.total_user_buys &&
                    `${nft.total_user_buys} / ${nft.total_quantity}`
                  }
                />
              );
            }
          })()}
        </div>
        <hr className="custom-divider" /> */}
      </div>
    </>
  );
};

export default NFTLootBoughtDetails;
