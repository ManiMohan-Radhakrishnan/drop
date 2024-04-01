import React from "react";
import ReadMoreReact from "read-more-react";
// import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

import AritstPills from "./artist-pills";
import artistImg from "../../images/glory.jpg";
import artistGuardianImg from "../../images/GL_Logo.png";

import "./style.scss";

const NFTArtist = ({ artistId }) => {
  return (
    <div className="nft-artist">
      <div className="row mt-4 artist-content">
        <div className="col-12 col-md-5">
          <img
            className="artist-img"
            src={artistId === 1 ? artistImg : artistGuardianImg}
            alt="artist logo"
          />
        </div>
        <div className="col-12 col-md-7 mt-4 mt-md-0 artist-details-content">
          <div className="artist-name">
            {artistId === 1 ? "Blazed In Glory International" : "GuardianLink"}
          </div>
          {/* <div className="at-name">Blazed In Glory International</div> */}
          <div className="artist-desc mt-5">
            <ReadMoreReact
              min={300}
              ideal={300}
              max={700}
              text={
                artistId === 1
                  ? `Blazed in Glory's mission is to deliver to the world the most creative, unique, high quality, and authentic range of signed Sports Memorabilia.`
                  : `GuardianLink is the creator of Meta Cricket League - the World’s First P2E Cricket NFT Game. GuardianLink is also the parent brand of Jump.trade, an NFT marketplace for gaming and international brands.`
              }
            />
          </div>
          {/* <div className="artist-pill-container mt-4">
            <AritstPills title="Managed By" value="Jump.trade" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default NFTArtist;
