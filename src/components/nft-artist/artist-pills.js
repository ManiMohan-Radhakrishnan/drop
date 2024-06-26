import React from "react";

import "./style.scss";

const AritstPills = ({ title, value }) => {
  return (
    <div className="artist-pill">
      {/* <img src={guardianImg} alt="artist logo" /> */}
      <div>
        <div className="pill-title text-secondary">{title}</div>
        <div className="pill-value">{value}</div>
      </div>
    </div>
  );
};

export default AritstPills;
