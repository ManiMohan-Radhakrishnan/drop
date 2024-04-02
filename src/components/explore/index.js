/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router";
import ContentLoader from "react-content-loader";

import ExploreCard from "./explore-card";
import ExploreTitle from "./explore-title";

import "./style.scss";

const Explore = ({
  list = [],
  handleClick,
  hasNext,
  loading,
  loadingMore,
  nftSocketData,
}) => {
  const history = useHistory();
  const { name } = useParams();
  const [explore, setExplore] = useState({
    title: "",
    description: "",
    class: "",
  });
  const categorySection = useRef(null);

  useEffect(() => {
    if (name.includes("cat-chakra-artpunks")) {
      setExplore({
        title: "Chakra Artpunks",
        description: `The Chakra comic collections feature a vast spectrum of characters, each with their own signature attributes. Orange Comet has brought these characters into the NFT world as a part of the 'Chakraverse' with our Chakra Artpunks still collection!`,
      });
    } else if (name.includes("cat-animated-living-comic-book-cover")) {
      setExplore({
        title: "Animated Living Comic Book Cover",
        description: `Chakra the Invincible - the first Indian superhero co-created by Stan Lee - has seen various avatars as an animated movie and also as comic book. With these original designs, Orange Comet's animated comic book cover NFTs bring the experience of Chakra to a new lively dimension while retaining the essence of the comic character!`,
      });
    } else if (name.includes("cat-seven-chakra-powers")) {
      setExplore({
        title: "Seven Chakra’s Powers Video",
        description: `Chakra the Invincible is all about powers activated by the 7 chakras. In fact, it is these 7 'chakras' that make Chakra invincible. Orange Comet's distinctive NFT collection brings you unique 3D animations of Chakra showing the 7 powers!`,
      });
    } else if (name.includes("cat-stanlee-bday-special")) {
      setExplore({
        title: "Stan Lee B'day Special",
        description: `Being a legend is one… and being the creator of legends is another! As a tribute to Stan Lee, we present you exclusive and special birthday NFTs`,
      });
    } else if (
      name.includes("cat-chakra-artpunks-loot-box") ||
      name.includes("cat-jumbo-juke-box")
    ) {
      history.push("/");
    }
    categorySection.current.scrollIntoView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <>
      <section className="explore-drops" ref={categorySection}>
        <div className="container-fluid">
          <div className="row mt-5 explore-title">
            <ExploreTitle
              title={explore.title}
              description={explore.description}
            />
          </div>
          <div className="row">
            <div className="about-user mt-5">
              <div className="row">
                <div className="col-md-12 ">
                  <div className="about-heading mb-4">
                    <div>
                      <h3 className="about-title">Showing ({list.length})</h3>
                    </div>
                    <div>
                      <ul className="nav user-nav">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            aria-current="page"
                            href="#"
                          >
                            {/* Filter By */}
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            {/* Sort By */}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row gutters-20">
                {loading ? (
                  <ActivityList />
                ) : (
                  <>
                    {list.map((nft) => {
                      let label = "",
                        time,
                        isEnded = false,
                        isStarted = false,
                        bidBuyValue = 0;

                      if (
                        new Date(nft.auction_start_time) > new Date(nft.time)
                      ) {
                        label = "Starting in";
                        time = nft.auction_start_time;
                      } else if (
                        new Date(nft.auction_end_time) > new Date(nft.time)
                      ) {
                        label = "Ends in";
                        isStarted = true;

                        if (nft.slug === nftSocketData.nft_slug) {
                          time = nftSocketData.auction_end_time
                            ? nftSocketData.auction_end_time
                            : nft.auction_end_time;
                        } else {
                          time = nft.auction_end_time;
                        }
                      } else {
                        time = nft.auction_end_time;
                        label = "Ended at";
                        isEnded = true;
                      }

                      if (nft.nft_type === "erc721") {
                        if (nft.slug === nftSocketData.nft_slug) {
                          bidBuyValue = nftSocketData.minimum_bid
                            ? nftSocketData.minimum_bid
                            : nft.minimum_bid;
                        } else {
                          bidBuyValue = nft.minimum_bid;
                        }
                      } else {
                        bidBuyValue = nft.buy_amount;
                      }

                      return (
                        <ExploreCard
                          key={nft.slug}
                          punkClass={explore.class}
                          slug={nft.slug}
                          nft={nft}
                          isStarted={isStarted}
                          isEnded={isEnded}
                          time={time}
                          label={label}
                          title={nft.name}
                          bidPrice={bidBuyValue}
                          desc={nft.description}
                          nftType={nft.nft_type}
                        />
                      );
                    })}
                  </>
                )}
              </div>
              {hasNext && (
                <div className="row mb-5">
                  <div className="col-md-12 text-center">
                    <button
                      className="load_more"
                      disabled={loadingMore}
                      onClick={handleClick}
                    >
                      {loadingMore ? "Loading..." : "Load More"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const ActivityList = (props) => (
  <ContentLoader
    viewBox="0 0 900 400"
    width={"100%"}
    height={"100%"}
    backgroundColor="#f5f5f5"
    foregroundColor="#dbdbdb"
    className="mt-3"
    {...props}
  >
    <rect x="12" y="5" rx="2" ry="2" width="280" height="300" />
    <rect x="308" y="5" rx="2" ry="2" width="280" height="300" />
    <rect x="600" y="5" rx="2" ry="2" width="280" height="300" />
  </ContentLoader>
);

export default Explore;
