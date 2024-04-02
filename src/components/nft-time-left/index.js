import React from "react";
import NFTCounter from "../nft-counter";
import dayjs from "dayjs";
import { BsFillQuestionCircleFill } from "react-icons/bs";

import ToolTip from "../tooltip";

import "./style.scss";

const NFTTimeLeft = ({
  title,
  tooltipText,
  isEnded = false,
  time,
  cTime,
  handleTimer = () => {},
  handleBeforeEndTimer = () => {},
}) => {
  return (
    <div className="current-bid nft-time-left">
      <div className="title">
        {title}
        <ToolTip
          content={tooltipText}
          icon={
            <BsFillQuestionCircleFill
              size={16}
              className="ms-2 question-icon"
            />
          }
          placement="top"
        />
      </div>
      {isEnded ? (
        <div className="end-date">{dayjs(time).format("DD. MM. YYYY")}</div>
      ) : (
        <NFTCounter
          time={time}
          cTime={cTime}
          timeclassName="counter-time"
          handleEndEvent={handleTimer}
          handleBeforeEndEvent={handleBeforeEndTimer}
        />
      )}
    </div>
  );
};

export default NFTTimeLeft;
