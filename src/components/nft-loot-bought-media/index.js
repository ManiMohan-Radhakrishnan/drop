import React, { useEffect, useState } from "react";
import { Modal, OverlayTrigger, Popover } from "react-bootstrap";
import { prominent } from "color.js";
import {
  AiOutlineExpand,
  AiOutlineLink,
  AiFillFacebook,
  AiFillTwitterCircle,
  AiOutlineShareAlt,
  AiFillHeart,
} from "react-icons/ai";
import { GrCertificate } from "react-icons/gr";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

import lootBox from "../../images/game-cards.png";

import batsmanIcon from "../../images/cric/img/batsman_ico.png";
import bowlerIcon from "../../images/cric/img/bowler_ico.png";

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

const NFTLootBoughtMedia = ({ nft }) => {
  const [modalShow, setModalShow] = useState(false);
  const [bgColor, setBgColor] = useState();

  const static_url = [
    {
      id: "m61vPEMHWqEPRrjq",
      url: "https://cdn.beyondlife.club/media/video/2_m61vPEMHWqEPRrjq.mp4",
    },
    {
      id: "4pVrXypHaOlnbOkl",
      url: "https://cdn.beyondlife.club/media/video/1_4pVrXypHaOlnbOkl.mp4",
    },
    {
      id: "g1GlPdEH8Zyz5jK0",
      url: "https://cdn.beyondlife.club/media/video/2_g1GlPdEH8Zyz5jK0.mp4",
    },
    {
      id: "3jOEzRKHvY7n2Vxl",
      url: "https://cdn.beyondlife.club/media/video/1_3jOEzRKHvY7n2Vxl.mp4",
    },
    {
      id: "dqlYXN6HgrDXJ1gA",
      url: "https://cdn.beyondlife.club/media/video/6_dqlYXN6HgrDXJ1gA.mp4",
    },
    {
      id: "gBEWPQWHRDQnwvbV",
      url: "https://cdn.beyondlife.club/media/video/4_gBEWPQWHRDQnwvbV.mp4",
    },
    {
      id: "MQ7vPjNHvDbP08wb",
      url: "https://cdn.beyondlife.club/media/video/3_MQ7vPjNHvDbP08wb.mp4",
    },
    {
      id: "OgWRnJvHb5WnbMeG",
      url: "https://cdn.beyondlife.club/media/video/1_OgWRnJvHb5WnbMeG.mp4",
    },
    {
      id: "JA5VnblHDk6PYRNO",
      url: "https://cdn.beyondlife.club/media/video/5_JA5VnblHDk6PYRNO.mp4",
    },
    {
      id: "MNYjPOpHrw0zy79K",
      url: "https://cdn.beyondlife.club/media/video/2_MNYjPOpHrw0zy79K.mp4",
    },
    {
      id: "paGrzGVHOK0PBO5K",
      url: "https://cdn.beyondlife.club/media/video/7_paGrzGVHOK0PBO5K.mp4",
    },
    {
      id: "LRrZzl7HbqgP6xaK",
      url: "https://cdn.beyondlife.club/media/video/preview.mp4",
    },
  ];

  useEffect(() => {
    if (nft?.asset_type?.includes("image")) {
      getBgColor(nft.asset_url);
    } else {
      getBgColor(nft.cover_url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nft]);

  const getBgColor = async (input) => {
    if (input) {
      const image = nft.asset_type.includes("image")
        ? nft.asset_url
        : nft.cover_url;
      const color = await prominent(image, { amount: 1 });

      setBgColor(`rgb(${color[0]},${color[1]},${color[2]},0.3)`);
    } else {
      setBgColor(`rgb(0,0,0,0.1)`);
    }
  };

  const level = [
    {
      type: "1",
      name: "LVL 1",
      value: lvl001,
    },
    {
      type: "2",
      name: "LVL 2",
      value: lvl002,
    },
    {
      type: "3",
      name: "LVL 3",
      value: lvl003,
    },
    {
      type: "4",
      name: "LVL 4",
      value: lvl004,
    },
    {
      type: "5",
      name: "LVL 5",
      value: lvl005,
    },
    {
      type: "6",
      name: "LVL 6",
      value: lvl006,
    },
    {
      type: "7",
      name: "LVL 7",
      value: lvl007,
    },
    {
      type: "8",
      name: "LVL 8",
      value: lvl008,
    },
    {
      type: "9",
      name: "LVL 9",
      value: lvl009,
    },
    {
      type: "10",
      name: "LVL 10",
      value: lvl0010,
    },
    {
      type: "11",
      name: "LVL 11",
      value: lvl0011,
    },
    {
      type: "12",
      name: "LVL 12",
      value: lvl0012,
    },
    {
      type: "13",
      name: "LVL 13",
      value: lvl0013,
    },
    {
      type: "14",
      name: "LVL 14",
      value: lvl0014,
    },
    {
      type: "15",
      name: "LVL 15",
      value: lvl0015,
    },
  ];

  const role = [
    {
      type: "Batsman",
      name: "BATSMAN",
      value: batsmanIcon,
    },
    {
      type: "Bowler",
      name: "BOWLER",
      value: bowlerIcon,
    },
    {
      type: "Bat",
      name: "BAT",
      value: batsmanIcon,
    },
  ];

  const playerCategory = [
    {
      type: "ROOKIE",
      value: "RO",
      color: "blue_color",
    },
    {
      type: "RARE",
      value: "RA",
      color: "orange_color",
    },
    {
      type: "EPIC",
      value: "EP",
      color: "purple_color",
    },
    {
      type: "LEGEND",
      value: "LG",
      color: "multi_color",
    },
    {
      type: "SUPER RARE",
      value: "SR",
      color: "lavender_color",
    },
    {
      type: "ULTRA RARE",
      value: "UR",
      color: "lavender_color",
    },
    {
      type: "IMMORTAL",
      value: "IM",
      color: "lavender_color",
    },
  ];

  const levelData = level.find(
    (obj) => obj.type === nft?.core_statistics?.level
  );
  const roleData = role.find((obj) => obj.type === nft?.core_statistics?.role);
  const playerCatData = playerCategory.find(
    (obj) => obj.type === nft?.core_statistics?.category
  );

  const download = (dataurl, filename) => {
    const link = document.createElement("a");
    link.href = dataurl;
    link.download = filename;
    link.click();
  };

  return (
    <section className="nft-img-block">
      <div className={`nft-media media_audio ${playerCatData?.color}`}>
        {nft?.core_statistics?.role !== "Bat" && (
          <article className={`player_stats ${playerCatData?.color}`}>
            {roleData && (
              <div className="player-type">
                <h6>{roleData?.name}</h6>
                <img src={roleData?.value} />
              </div>
            )}

            {playerCatData && (
              <div className="player-range">
                <span className="band">{playerCatData?.value}</span>
                <h6>Player</h6>
              </div>
            )}
            {levelData && (
              <div className="player-level">
                <h6>{levelData?.name}</h6>
                <img src={levelData?.value} />
              </div>
            )}
          </article>
        )}
        {/* <div className="show_height"><img className="type_image typeimg_audio" src="https://wallpaperaccess.com/full/112115.jpg" />  </div> */}
        {/* <div className="show_height"><img className="type_gif" src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif" />/div> */}

        {(() => {
          if (nft?.asset_type?.includes("image")) {
            return (
              <img
                alt="media logo"
                className="type_image typeimg_audio"
                src={nft.asset_url ? nft.asset_url : lootBox}
              />
            );
          } else if (nft?.asset_type?.includes("audio")) {
            return (
              <>
                <div className="no_height align-items-center">
                  <img
                    alt="media logo"
                    className="type_image typeimg_audio"
                    src={nft.cover_url ? nft.cover_url : lootBox}
                    onClick={() => {
                      var el = document.getElementById("audio-fullscreen");
                      if (!el.paused) {
                        el.pause();
                      } else {
                        el.play();
                      }
                    }}
                  />
                </div>
                <audio
                  id="audio-fullscreen"
                  controls
                  className="shadow-sm audioOnmedia"
                  disablepictureinpicture
                  controlslist="nodownload noplaybackrate"
                >
                  <source src={nft.asset_url} type={nft.asset_type} />
                  Your browser does not support the audio element.
                </audio>
              </>
            );
          } else if (nft?.asset_type?.includes("video")) {
            return (
              <div className="video-height">
                <video
                  id="full-screenVideo"
                  controls
                  onContextMenu="return false;"
                  controlsList="nodownload"
                  playsinline
                  autoplay
                  loop
                >
                  <source
                    src={
                      static_url.find((obj) => obj.id === nft.slug)?.url
                        ? static_url.find((obj) => obj.id === nft.slug)?.url
                        : nft.asset_url
                    }
                    type="video/mp4"
                  />
                </video>
              </div>
            );
          } else {
            return (
              <img
                alt="media logo"
                className="type_image typeimg_audio"
                src={nft.asset_url ? nft.asset_url : lootBox}
              />
            );
          }
        })()}

        <Modal
          fullscreen
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={modalShow}
          onHide={() => setModalShow(false)}
        >
          <Modal.Header
            closeButton
            className="full-screen-header"
          ></Modal.Header>
          <Modal.Body className="media_audio">
            {/* <div className="show_height"><img className="type_image typeimg_audio" src="https://wallpaperaccess.com/full/112115.jpg" />  </div> */}
            {/* <div className="show_height"><img className="type_gif" src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif" />/div> */}

            {(() => {
              if (nft?.asset_type?.includes("image")) {
                return (
                  <img
                    alt="media logo"
                    className="type_image typeimg_audio"
                    src={nft.asset_url ? nft.asset_url : lootBox}
                  />
                );
              } else if (nft?.asset_type?.includes("audio")) {
                return (
                  <>
                    <div className="no_height">
                      <img
                        alt="media logo"
                        className="type_image typeimg_audio"
                        src={nft.cover_url ? nft.cover_url : lootBox}
                        onClick={() => {
                          var el = document.getElementById(
                            "audio-fullscreen-full"
                          );
                          if (!el.paused) {
                            el.pause();
                          } else {
                            el.play();
                          }
                        }}
                      />
                    </div>
                    <audio
                      id="audio-fullscreen-full"
                      controls
                      className="shadow-sm audioOnmedia"
                      disablepictureinpicture
                      controlslist="nodownload noplaybackrate"
                    >
                      <source src={nft.asset_url} type={nft.asset_type} />
                      Your browser does not support the audio element.
                    </audio>
                  </>
                );
              } else if (nft?.asset_type?.includes("video")) {
                return (
                  <video
                    controls
                    onContextMenu="return false;"
                    controlsList="nodownload"
                    autoplay
                    playsinline
                  >
                    <source
                      src={
                        static_url.find((obj) => obj.id === nft.slug)?.url
                          ? static_url.find((obj) => obj.id === nft.slug)?.url
                          : nft.asset_url
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
                    src={nft.asset_url ? nft.asset_url : lootBox}
                  />
                );
              }
            })()}
          </Modal.Body>
        </Modal>
      </div>
      <div className={`media-lsf ${playerCatData?.color}`}>
        <SharePopover
          icon={
            <div>
              {/* <AiOutlineShareAlt className="svg_size" size={25} /> */}
              <div className="svg_size share_icon"></div>
            </div>
          }
          placement="top"
          title="Jump.trade Loot Box!"
        />

        <CustomPopover
          icon={
            <div onClick={() => setModalShow(true)}>
              {/* <AiOutlineExpand className="svg_size" size={25} /> */}
              <div className="svg_size extend_icon"></div>
            </div>
          }
          placement="top"
          text="Fullscreen"
        />
        {nft?.certificate_file_url.length > 0 &&
          nft?.certificate_file_url.map((url, i) => (
            <CustomPopover
              key={`pdf-${i}`}
              icon={
                <div onClick={() => download(url, `${nft.name}-${i + 1}`)}>
                  <div className="svg_size certificate_icon"></div>
                </div>
              }
              placement="top"
              text={
                nft?.certificate_file_url.length > 1
                  ? `Download Certificate-${i + 1}`
                  : "Download Certificate"
              }
            />
          ))}
      </div>
    </section>
  );
};

const CustomPopover = ({ icon, placement, text }) => {
  return (
    <OverlayTrigger
      trigger={["hover", "focus"]}
      rootClose
      key={placement}
      placement={placement}
      overlay={
        <Popover className="mb-2">
          <Popover.Body className="p-2 custom-pop">{text}</Popover.Body>
        </Popover>
      }
    >
      {icon}
    </OverlayTrigger>
  );
};

const SharePopover = ({ icon, placement, title }) => {
  const url = window.location.href;
  const hashtags = "";
  const via = "";

  const detectWhatsapp = (uri) => {
    const onIE = () => {
      return new Promise((resolve) => {
        window.navigator.msLaunchUri(
          uri,
          () => resolve(true),
          () => resolve(false)
        );
      });
    };

    const notOnIE = () => {
      return new Promise((resolve) => {
        const a =
          document.getElementById("wapp-launcher") ||
          document.createElement("a");
        a.id = "wapp-launcher";
        a.href = uri;
        a.style.display = "none";
        document.body.appendChild(a);

        const start = Date.now();
        const timeoutToken = setTimeout(() => {
          if (Date.now() - start > 1250) {
            resolve(true);
          } else {
            resolve(false);
          }
        }, 1000);

        const handleBlur = () => {
          clearTimeout(timeoutToken);
          resolve(true);
        };
        window.addEventListener("blur", handleBlur);

        a.click();
      });
    };

    return window.navigator.msLaunchUri ? onIE() : notOnIE();
  };

  return (
    <>
      <OverlayTrigger
        trigger="click"
        rootClose
        key={placement}
        placement={placement}
        overlay={
          <Popover className="mb-2">
            <Popover.Body className="p-1 custom-pop">
              <CopyToClipboard
                text={url}
                onCopy={() => {
                  toast.success("Copied to Clipboard");
                }}
              >
                <AiOutlineLink size={35} />
              </CopyToClipboard>
              <AiFillFacebook
                size={35}
                style={{ color: "#4267B2" }}
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`
                  )
                }
              />
              <AiFillTwitterCircle
                size={35}
                style={{ color: "#1DA1F2" }}
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?url=${url}&text=${title}&hashtags=${hashtags}&via=${via}`
                  )
                }
              />
              <FaTelegramPlane
                size={35}
                style={{ color: "#0088cc" }}
                onClick={() =>
                  window.open(
                    `https://telegram.me/share/?url=${url}&title=${title}`
                  )
                }
              />

              <FaWhatsapp
                size={35}
                style={{ color: "#25D366" }}
                onClick={() => {
                  detectWhatsapp(
                    `whatsapp://send?text=Hey ! I found an awesome NFT here%0a%0a${title}%0a%0aCheck it out in below link%0a%0a${url}`
                  ).then((hasWhatsapp) => {
                    if (!hasWhatsapp) {
                      alert(
                        "You don't have WhatsApp, kindly install it and try again"
                      );
                    }
                  });
                }}
              />
            </Popover.Body>
          </Popover>
        }
      >
        <span>{icon}</span>
      </OverlayTrigger>
    </>
  );
};

export default NFTLootBoughtMedia;
