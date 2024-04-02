import useWindowUtils from "../../../hook/useWindowUtils";
import images from "../../../utils/images.json";

import "./style.scss";

const ReferWin = () => {
  const tab = useWindowUtils();
  const { width: innerWidth } = tab;
  return (
    <>
      <section className={"refer-treasurebox-section"}>
        <div className={"refer-heading"}>
          <h4>REFER AND WIN A TREASURE BOX</h4>
          <p>
            Share your referral code and invite friends to receive Treasure
            Boxes (filled with exciting prizes as shown below) when they make a
            successful purchase during the drop.
          </p>
        </div>

        <img
          src={
            innerWidth > 767
              ? images?.raddx_refer
              : images?.referral_mobile_view
          }
          alt="TreasureBox"
          className={"refer-treasurebox-images"}
        />
        <button
          className={"refer-treasurebox-button"}
          onClick={() => {
            window.open(
              `${process.env.REACT_APP_MARKETPLACE_URL}/referral-program`,
              "_self"
            );
          }}
        >
          REFER NOW{" "}
        </button>
      </section>
    </>
  );
};

export default ReferWin;
