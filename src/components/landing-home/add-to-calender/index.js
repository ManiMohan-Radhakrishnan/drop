import { atcb_action } from "add-to-calendar-button";
import React from "react";
import { useRef } from "react";
import { BsFillCalendarPlusFill } from "react-icons/bs";

import "./style.scss";

const AddtoCalendar = ({
  name = "RADDX PreBook",
  startDate = "2023-03-08",
  startTime = "17:00",
  endTime = "17:05",
}) => {
  const atcb_ref = useRef();
  const config = {
    name,
    description: "Don't miss out - visit https://raddx.jump.trade/",
    startDate,
    startTime,
    endTime,
    options: ["Apple", "Google", "iCal", "Outlook.com", "Yahoo"],
    timeZone: "Asia/Kolkata",
  };
  return (
    <>
      <div>
        <button
          ref={atcb_ref}
          id="atc-button"
          className="add-calendar"
          onClick={() => atcb_action(config, atcb_ref?.current)}
        >
          <BsFillCalendarPlusFill />{" "}
          <span className="mr-5">ADD TO CALENDAR</span>
        </button>
      </div>
    </>
  );
};

export default AddtoCalendar;
