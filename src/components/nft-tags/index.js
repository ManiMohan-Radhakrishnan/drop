import React from "react";
import Tag from "./tag";

import lvl001 from "../../images/cric/img/player_levels/1.png";
import lvl002 from "../../images/cric/img/player_levels/2.png";
import lvl003 from "../../images/cric/img/player_levels/3.png";
import lvl004 from "../../images/cric/img/player_levels/4.png";
import lvl005 from "../../images/cric/img/player_levels/5.png";
import lvl006 from "../../images/cric/img/player_levels/6.png";
import lvl007 from "../../images/cric/img/player_levels/7.png";
import lvl008 from "../../images/cric/img/player_levels/8.png";
import lvl009 from "../../images/cric/img/player_levels/9.png";
import lvl0010 from "../../images/cric/img/player_levels/10.png";
import lvl0011 from "../../images/cric/img/player_levels/11.png";
import lvl0012 from "../../images/cric/img/player_levels/12.png";
import lvl0013 from "../../images/cric/img/player_levels/13.png";
import lvl0014 from "../../images/cric/img/player_levels/14.png";
import lvl0015 from "../../images/cric/img/player_levels/15.png";

import "./style.scss";

const NFTTags = ({ tags }) => {
  return (
    <div className="nft-tags">
      <div className="nft-tag-title">
        Tags
        {tags && <span className="title-count">({tags.length})</span>}
      </div>
      <div className="nft-tag-content mt-2">
        {tags && tags.map((tag, i) => <Tag key={`tag${i}`} text={tag} />)}
      </div>
    </div>
    // <section className="player-stats">
    //   <div className="heading-block">
    //     <h3>Player stats</h3>
    //     <div className="player-level">
    //       <h6>Lv 2</h6>
    //       <img src={lvl002} />
    //     </div>
    //   </div>
    // </section>
  );
};

export default NFTTags;
