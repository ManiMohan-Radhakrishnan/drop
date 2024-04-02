import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import NFTLootBaseDetails from "../components/nft-loot-basic-details";
import NFTLootMedia from "../components/nft-loot-media";
import Header from "../components/landing-home/header";
import { NFTLoader } from "../components/nft-basic-details/content-loader";
import { nftCategoryDetailApi } from "../api/methods";
import { lootDetail } from "../api/actioncable-methods";

const Loot = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState({});
  const [auctionEndTime, setAuctionEndTime] = useState("");
  const [isAuctionStarted, setIsAuctionStarted] = useState(false);
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);
  const [soldOut, setSoldOut] = useState(false);
  const [loader, setLoader] = useState(true);
  const [lootBuyPop, setLootBuyPop] = useState(false);
  const [availableQty, setAvailableQty] = useState(null);
  const [canBuy, setCanBuy] = useState(false);
  const [allocatingNFT, setAllocatingNFT] = useState(false);
  let quantity = null;

  useEffect(() => {
    nftCategoryDetail(slug);
  }, [slug]);

  useEffect(() => {
    lootDetail(slug, (data) => {
      if (quantity && quantity != null) {
        if (data.quantity < quantity) {
          setAvailableQty(data.quantity);
          quantity = data.quantity;
        }
      } else {
        setAvailableQty(data.quantity);
        quantity = data.quantity;
      }
      if (data.quantity === 0) {
        setSoldOut(true);
      }

      if (data?.initial_error === 714) {
        setAllocatingNFT(true);
      } else {
        setAllocatingNFT(false);
      }

      if (data?.initial_error === 0) {
        setCanBuy(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nftCategoryDetail = async (slug) => {
    try {
      setLoader(true);
      let response = await nftCategoryDetailApi({ slug: slug });
      setCategory(response.data.data.category);
      const loot = response.data.data.category.category_detail;
      if (loot.quantity === 0) {
        setSoldOut(true);
      }
      setAuctionEndTime(loot.auction_end_time);
      setIsAuctionStarted(
        new Date().getTime() >= new Date(loot.auction_start_time).getTime()
      );
      setIsAuctionEnded(
        new Date().getTime() > new Date(loot.auction_end_time).getTime()
      );

      if (loot?.initial_error === 0) {
        setCanBuy(true);
      } else {
        setCanBuy(false);
      }

      if (loot?.initial_error === 714) {
        setAllocatingNFT(true);
      } else {
        setAllocatingNFT(false);
      }

      setLoader(false);
    } catch (err) {
      // setLoader(false);
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const handleAuctionStartTimer = () => {
    setIsAuctionStarted(true);
  };
  const handleAuctionEndTimer = () => {
    setIsAuctionEnded(true);
  };

  return (
    <>
      <Header />
      {loader ? (
        <NFTLoader />
      ) : (
        <section className="detail-page-content">
          <div className="bid_section_wrapper">
            <div className="container-fluid">
              <div className="row fit-to-height">
                <div className="col-12 col-lg-7">
                  <NFTLootMedia category={category} />
                </div>
                <div className="col-12 col-lg-5">
                  <NFTLootBaseDetails
                    category={category}
                    lootBuyPop={lootBuyPop}
                    setLootBuyPop={setLootBuyPop}
                    availableQty={availableQty}
                    isAuctionStarted={isAuctionStarted}
                    isAuctionEnded={isAuctionEnded}
                    auctionEndTime={auctionEndTime}
                    soldOut={soldOut}
                    handleAuctionStartTimer={handleAuctionStartTimer}
                    handleAuctionEndTimer={handleAuctionEndTimer}
                    canBuy={canBuy}
                    allocatingNFT={allocatingNFT}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Loot;
