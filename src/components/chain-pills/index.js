import React from "react";

import "./style.scss";

const ChainPills = ({ first, second, pdf = false }) => {
  return (
    <div
      className={`chain-pills rounded-pill border border-dark ${
        !second && "one-pill"
      }`}
    >
      <div className="first">
        {second && (
          <div className="second rounded-pill border border-dark">{second}</div>
        )}
        {(() => {
          if (pdf) {
            return (
              <a href={first} role={"button"} target="_blank" download>
                PDF
              </a>
            );
          } else {
            return first;
          }
        })()}
      </div>
    </div>
  );
};

export default ChainPills;
