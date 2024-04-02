import React from "react";
import NFTPropPills from "../nft-prop-pills";

import "./style.scss";

const NFTProperties = ({ properties }) => {
  return (
    <div className="chain-attributes">
      <div className="chain-att-title">Properties</div>
      <div className="chain-att-content mt-2">
        {(() => {
          if (properties) {
            if (properties && typeof properties === "string") {
              let propertiesData = JSON.parse(properties);

              return Object.keys(propertiesData)?.map((property) => {
                return (
                  <NFTPropPills
                    property={propertiesData[property]}
                    propertyType={property}
                  />
                );
              });
            } else {
              // let propertiesData = JSON.parse(properties);

              return properties.map((property, i) => {
                return (
                  <NFTPropPills
                    key={`property-${i}`}
                    title={Object.keys(property)}
                    property={property[Object.keys(property)]}
                  />
                );
              });
            }
          }
        })()}
      </div>
    </div>
  );
};

export default NFTProperties;
