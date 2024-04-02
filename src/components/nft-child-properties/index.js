import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import sample from "../../images/sampleNFT.jpg";
import NFTPropPills from "../nft-prop-pills";
import images from "../../utils/images.json";

import "./style.scss";

const NFTChildProperties = ({ child }) => {
  return (
    <div className="chain-attributes bundle-attributes">
      <div className="chain-att-title mb-4">NFT Details</div>

      <Tabs
        defaultActiveKey="nft-001"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        {child[0] && (
          <Tab
            eventKey="nft-001"
            title={
              <div className="nft-attibutes-tab-block">
                <div className="nft-attibutes-tab">
                  <div className="nft-image-box tab-box1">
                    {(() => {
                      if (child[0]?.asset_type?.includes("image")) {
                        return (
                          <img
                            alt="media logo"
                            className="type_image typeimg_audio"
                            src={
                              child[0]?.asset_url
                                ? child[0]?.asset_url
                                : images?.sample_gif
                            }
                          />
                        );
                      } else if (child[0]?.asset_type?.includes("video")) {
                        return (
                          // <video
                          //   id="full-screenVideo"
                          //   loop
                          //   muted
                          //   autoPlay
                          //   playsInline
                          //   onContextMenu="return false;"
                          //   controlsList="nodownload"
                          // >
                          //   <source
                          //     src={
                          //       child[0]?.cover_url
                          //         ? child[0]?.cover_url
                          //         : sample
                          //     }

                          //     type="video/mp4"
                          //   />
                          // </video>
                          <img
                            alt="media logo"
                            className="type_image typeimg_audio"
                            src={
                              child[0]?.cover_url
                                ? child[0]?.cover_url
                                : images?.sample_gif
                            }
                          />
                        );
                      } else {
                        return (
                          <img
                            alt="media logo"
                            className="type_image typeimg_audio"
                            src={
                              child[0]?.asset_url
                                ? child[0]?.asset_url
                                : images?.sample_gif
                            }
                          />
                        );
                      }
                    })()}
                  </div>
                </div>
              </div>
            }
          >
            <div className="chain-att-content mt-2">
              <div className="nft-src-block">
                <div className="nft-info-box">
                  <h3>{child[0]?.name}</h3>
                  <h5>{child[0]?.nft_type}</h5>
                </div>
              </div>
              <h6 className="prop-title">properties</h6>
              <div className="nft-pill-block">
                {(() => {
                  if (child[0]?.properties) {
                    if (
                      child[0]?.properties &&
                      typeof child[0]?.properties === "string"
                    ) {
                      let propertiesData = JSON.parse(child[0]?.properties);

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

                      return child[0]?.properties.map((property, i) => {
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
          </Tab>
        )}
        {child[1] && (
          <Tab
            eventKey="nft-002"
            title={
              <div className="nft-attibutes-tab-block">
                <div className="nft-attibutes-tab">
                  <div className="nft-image-box tab-box2">
                    {(() => {
                      if (child[1]?.asset_type?.includes("image")) {
                        return (
                          <img
                            alt="media logo"
                            className="type_image typeimg_audio"
                            src={
                              child[1]?.asset_url
                                ? child[1]?.asset_url
                                : images?.sample_gif
                            }
                          />
                        );
                      } else if (child[1]?.asset_type?.includes("video")) {
                        return (
                          // <video
                          //   id="full-screenVideo"
                          //   loop
                          //   muted
                          //   autoPlay
                          //   playsInline
                          //   onContextMenu="return false;"
                          //   controlsList="nodownload"
                          // >
                          //   <source
                          //     // src={
                          //     //   static_url.find((obj) => obj.id === slug)?.url
                          //     //     ? static_url.find((obj) => obj.id === slug)?.url
                          //     //     : nft.asset_url
                          //     // }
                          //     src={
                          //       child[1]?.asset_url
                          //         ? child[1]?.asset_url
                          //         : images?.sample_gif
                          //     }
                          //     type="video/mp4"
                          //   />
                          // </video>
                          <img
                            alt="media logo"
                            className="type_image typeimg_audio"
                            src={
                              child[1]?.cover_url
                                ? child[1]?.cover_url
                                : images?.sample_gif
                            }
                          />
                        );
                      } else {
                        return (
                          <img
                            alt="media logo"
                            className="type_image typeimg_audio"
                            src={
                              child[1]?.asset_url
                                ? child[1]?.asset_url
                                : images?.sample_gif
                            }
                          />
                        );
                      }
                    })()}
                  </div>
                </div>
              </div>
            }
          >
            <div className="chain-att-content mt-2">
              <div className="nft-src-block">
                <div className="nft-info-box">
                  <h3>{child[1]?.name}</h3>
                  <h5>{child[1]?.nft_type}</h5>
                </div>
              </div>
              <h6 className="prop-title">properties</h6>
              <div className="nft-pill-block">
                {(() => {
                  if (child[1]?.properties) {
                    if (
                      child[1]?.properties &&
                      typeof child[1]?.properties === "string"
                    ) {
                      let propertiesData = JSON.parse(child[1]?.properties);

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

                      return child[1]?.properties.map((property, i) => {
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
          </Tab>
        )}
        {child[2] && (
          <Tab
            eventKey="nft-003"
            title={
              <div className="nft-attibutes-tab-block">
                <div className="nft-attibutes-tab">
                  <div className="nft-image-box tab-box3">
                    {(() => {
                      if (child[2]?.asset_type?.includes("image")) {
                        return (
                          <img
                            alt="media logo"
                            className="type_image typeimg_audio"
                            src={
                              child[2]?.asset_url
                                ? child[2]?.asset_url
                                : images?.sample_gif
                            }
                          />
                        );
                      } else if (child[2]?.asset_type?.includes("video")) {
                        return (
                          // <video
                          //   id="full-screenVideo"
                          //   loop
                          //   muted
                          //   autoPlay
                          //   playsInline
                          //   onContextMenu="return false;"
                          //   controlsList="nodownload"
                          // >
                          //   <source
                          //     // src={
                          //     //   static_url.find((obj) => obj.id === slug)?.url
                          //     //     ? static_url.find((obj) => obj.id === slug)?.url
                          //     //     : nft.asset_url
                          //     // }
                          //     src={
                          //       child[2]?.asset_url
                          //         ? child[2]?.asset_url
                          //         : images?.sample_gif
                          //     }
                          //     type="video/mp4"
                          //   />
                          // </video>
                          <img
                            alt="media logo"
                            className="type_image typeimg_audio"
                            src={
                              child[2]?.cover_url
                                ? child[2]?.cover_url
                                : images?.sample_gif
                            }
                          />
                        );
                      } else {
                        return (
                          <img
                            alt="media logo"
                            className="type_image typeimg_audio"
                            src={
                              child[2]?.asset_url
                                ? child[2]?.asset_url
                                : images?.sample_gif
                            }
                          />
                        );
                      }
                    })()}
                  </div>
                </div>
              </div>
            }
          >
            <div className="chain-att-content mt-2">
              <div className="nft-src-block">
                <div className="nft-info-box">
                  <h3>{child[2]?.name}</h3>
                  <h5>{child[2]?.nft_type}</h5>
                </div>
              </div>
              <h6 className="prop-title">properties</h6>
              <div className="nft-pill-block">
                {(() => {
                  if (child[2]?.properties) {
                    if (
                      child[2]?.properties &&
                      typeof child[2]?.properties === "string"
                    ) {
                      let propertiesData = JSON.parse(child[2]?.properties);

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

                      return child[2]?.properties.map((property, i) => {
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
          </Tab>
        )}
      </Tabs>
      {/* <div className="nft-attibutes-tab-block">
        <div className="nft-attibutes-tab">
        <div className="nft-image-box tab-box3">
            {(() => {
              if (child[2]?.asset_type?.includes("image")) {
                return (
                  <img
                    alt="media logo"
                    className="type_image typeimg_audio"
                    src={
                      child[2]?.asset_url ? child[2]?.asset_url : sample
                    }
                  />
                );
              } else if (child[2]?.asset_type?.includes("video")) {
                return (
                  <video
                    id="full-screenVideo"
                    loop
                    muted
                    autoPlay
                    playsInline
                    onContextMenu="return false;"
                    controlsList="nodownload"
                  >
                    <source
                      // src={
                      //   static_url.find((obj) => obj.id === slug)?.url
                      //     ? static_url.find((obj) => obj.id === slug)?.url
                      //     : nft.asset_url
                      // }
                      src={
                        child[2]?.cover_url ? child[2]?.cover_url : sample
                      }
                      type="video/mp4"
                    />
                  </video>
                );
              } else {
                return (
                  <img
                    alt="media logo"
                    className="type_image typeimg_audio"
                    src={
                      child[2]?.asset_url ? child[2]?.asset_url : sample
                    }
                  />
                );
              }
            })()}
          </div>
        </div>
      </div> */}

      {/* <div className="nft-attibutes-tab-block">
        <div className="nft-attibutes-tab">
          <div className="nft-image-box tab-box1">
            {(() => {
              if (child[0]?.asset_type?.includes("image")) {
                return (
                  <img
                    alt="media logo"
                    className="type_image typeimg_audio"
                    src={
                      child[0]?.asset_url ? child[0]?.asset_url : sample
                    }
                  />
                );
              } else if (child[0]?.asset_type?.includes("video")) {
                return (
                  <video
                    id="full-screenVideo"
                    loop
                    muted
                    autoPlay
                    playsInline
                    onContextMenu="return false;"
                    controlsList="nodownload"
                  >
                    <source
                      src={
                        child[0]?.asset_url ? child[0]?.asset_url : sample
                      }
                      type="video/mp4"
                    />
                  </video>
                );
              } else {
                return (
                  <img
                    alt="media logo"
                    className="type_image typeimg_audio"
                    src={
                      child[0]?.asset_url ? child[0]?.asset_url : sample
                    }
                  />
                );
              }
            })()}
          </div>
          <div className="nft-image-box tab-box2">
            {(() => {
              if (child[1]?.asset_type?.includes("image")) {
                return (
                  <img
                    alt="media logo"
                    className="type_image typeimg_audio"
                    src={
                      child[1]?.asset_url ? child[1]?.asset_url : sample
                    }
                  />
                );
              } else if (child[1]?.asset_type?.includes("video")) {
                return (
                  <video
                    id="full-screenVideo"
                    loop
                    muted
                    autoPlay
                    playsInline
                    onContextMenu="return false;"
                    controlsList="nodownload"
                  >
                    <source
                      // src={
                      //   static_url.find((obj) => obj.id === slug)?.url
                      //     ? static_url.find((obj) => obj.id === slug)?.url
                      //     : nft.asset_url
                      // }
                      src={
                        child[1]?.cover_url ? child[1]?.cover_url : sample
                      }
                      type="video/mp4"
                    />
                  </video>
                );
              } else {
                return (
                  <img
                    alt="media logo"
                    className="type_image typeimg_audio"
                    src={
                      child[1]?.asset_url ? child[1]?.asset_url : sample
                    }
                  />
                );
              }
            })()}
          </div>
          <div className="nft-image-box tab-box3">
            {(() => {
              if (child[2]?.asset_type?.includes("image")) {
                return (
                  <img
                    alt="media logo"
                    className="type_image typeimg_audio"
                    src={
                      child[2]?.asset_url ? child[2]?.asset_url : sample
                    }
                  />
                );
              } else if (child[2]?.asset_type?.includes("video")) {
                return (
                  <video
                    id="full-screenVideo"
                    loop
                    muted
                    autoPlay
                    playsInline
                    onContextMenu="return false;"
                    controlsList="nodownload"
                  >
                    <source
                      // src={
                      //   static_url.find((obj) => obj.id === slug)?.url
                      //     ? static_url.find((obj) => obj.id === slug)?.url
                      //     : nft.asset_url
                      // }
                      src={
                        child[2]?.cover_url ? child[2]?.cover_url : sample
                      }
                      type="video/mp4"
                    />
                  </video>
                );
              } else {
                return (
                  <img
                    alt="media logo"
                    className="type_image typeimg_audio"
                    src={
                      child[2]?.asset_url ? child[2]?.asset_url : sample
                    }
                  />
                );
              }
            })()}
          </div>
        </div>
      </div> */}

      {/* <div className="chain-att-content mt-2">
        <div className="nft-src-block">
          <div className="nft-image-box">
            {(() => {
              if (child[0]?.asset_type?.includes("image")) {
                return (
                  <img
                    alt="media logo"
                    className="type_image typeimg_audio"
                    src={
                      child[0]?.asset_url ? child[0]?.asset_url : sample
                    }
                  />
                );
              } else if (child[0]?.asset_type?.includes("video")) {
                return (
                  <video
                    id="full-screenVideo"
                    loop
                    muted
                    autoPlay
                    playsInline
                    onContextMenu="return false;"
                    controlsList="nodownload"
                  >
                    <source
                      // src={
                      //   static_url.find((obj) => obj.id === slug)?.url
                      //     ? static_url.find((obj) => obj.id === slug)?.url
                      //     : nft.asset_url
                      // }
                      src={
                        child[0]?.asset_url ? child[0]?.asset_url : sample
                      }
                      type="video/mp4"
                    />
                  </video>
                );
              } else {
                return (
                  <img
                    alt="media logo"
                    className="type_image typeimg_audio"
                    src={
                      child[0]?.asset_url ? child[0]?.asset_url : sample
                    }
                  />
                );
              }
            })()}
          </div>
          <div className="nft-info-box">
            <h3>{child[0]?.name}</h3>
            <h5>{child[0]?.nft_type}</h5>
          </div>
        </div>
        <div className="nft-pill-block">
          {(() => {
            if (child[0]?.properties) {
              if (
                child[0]?.properties &&
                typeof child[0]?.properties === "string"
              ) {
                let propertiesData = JSON.parse(child[0]?.properties);

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

                return child[0]?.properties.map((property, i) => {
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
      <div className="chain-att-content mt-2">
        <div className="nft-src-block">
          <div className="nft-image-box">
            {(() => {
              if (child[1]?.asset_type?.includes("image")) {
                return (
                  <img
                    alt="media logo"
                    className="type_image typeimg_audio"
                    src={
                      child[1]?.asset_url ? child[1]?.asset_url : sample
                    }
                  />
                );
              } else if (child[1]?.asset_type?.includes("video")) {
                return (
                  <video
                    id="full-screenVideo"
                    loop
                    muted
                    autoPlay
                    playsInline
                    onContextMenu="return false;"
                    controlsList="nodownload"
                  >
                    <source
                      // src={
                      //   static_url.find((obj) => obj.id === slug)?.url
                      //     ? static_url.find((obj) => obj.id === slug)?.url
                      //     : nft.asset_url
                      // }
                      src={
                        child[1]?.cover_url ? child[1]?.cover_url : sample
                      }
                      type="video/mp4"
                    />
                  </video>
                );
              } else {
                return (
                  <img
                    alt="media logo"
                    className="type_image typeimg_audio"
                    src={
                      child[1]?.asset_url ? child[1]?.asset_url : sample
                    }
                  />
                );
              }
            })()}
          </div>
          <div className="nft-info-box">
            <h3>{child[1]?.name}</h3>
            <h5>{child[1]?.nft_type}</h5>
          </div>
        </div>
        <div className="nft-pill-block">
          {(() => {
            if (child[1]?.properties) {
              if (
                child[1]?.properties &&
                typeof child[1]?.properties === "string"
              ) {
                let propertiesData = JSON.parse(child[1]?.properties);

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

                return child[1]?.properties.map((property, i) => {
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
      <div className="chain-att-content mt-2">
        <div className="nft-src-block">
          <div className="nft-image-box">
            {(() => {
              if (child[2]?.asset_type?.includes("image")) {
                return (
                  <img
                    alt="media logo"
                    className="type_image typeimg_audio"
                    src={
                      child[2]?.asset_url ? child[2]?.asset_url : sample
                    }
                  />
                );
              } else if (child[2]?.asset_type?.includes("video")) {
                return (
                  <video
                    id="full-screenVideo"
                    loop
                    muted
                    autoPlay
                    playsInline
                    onContextMenu="return false;"
                    controlsList="nodownload"
                  >
                    <source
                      // src={
                      //   static_url.find((obj) => obj.id === slug)?.url
                      //     ? static_url.find((obj) => obj.id === slug)?.url
                      //     : nft.asset_url
                      // }
                      src={
                        child[2]?.cover_url ? child[2]?.cover_url : sample
                      }
                      type="video/mp4"
                    />
                  </video>
                );
              } else {
                return (
                  <img
                    alt="media logo"
                    className="type_image typeimg_audio"
                    src={
                      child[2]?.asset_url ? child[2]?.asset_url : sample
                    }
                  />
                );
              }
            })()}
          </div>
          <div className="nft-info-box">
            <h3>{child[2]?.name}</h3>
            <h5>{child[2]?.nft_type}</h5>
          </div>
        </div>
        <div className="nft-pill-block">
          {(() => {
            if (child[2]?.properties) {
              if (
                child[2]?.properties &&
                typeof child[2]?.properties === "string"
              ) {
                let propertiesData = JSON.parse(child[2]?.properties);

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

                return child[2]?.properties.map((property, i) => {
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
      </div> */}
    </div>
  );
};

export default NFTChildProperties;
