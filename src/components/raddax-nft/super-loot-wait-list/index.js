import { useState } from "react";

import JoinWaitListAppLink from "./joinwaitlist-applink";
import WaitlistImage from "../../../images/drops/car-nft-images/wait-list-bg.png";
// import images from "../images.json";

import "./style.scss";

const SuperLootWaitList = () => {
  const [phoneInfo, setPhoneInfo] = useState({
    phone_no: null,
    country_code: "in",
  });

  return (
    <section
      className={"joinnow-section"}
      style={{
        backgroundImage: `url(${"https://cdn.guardianlink.io/product-hotspot/images/raddx/Raddx_Join-Waitlist_BG.webp"})`,
      }}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className={"joinnow-flex"}>
              <div className={"content-block"}>
                <h4>BE THE FIRST TO KNOW WHEN THE RACE STARTS!</h4>
                <p>Join the waitlist now</p>
              </div>
              <div className={"joinwaitlist-box"}>
                <JoinWaitListAppLink />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuperLootWaitList;
