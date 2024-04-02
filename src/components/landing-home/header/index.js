import React, { useEffect, useState } from "react";

import { useHistory } from "react-router";
import logo from "../../../images/cric/img/logo.svg";
import { Navbar, Nav, Dropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiBell, BiHelpCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import "./style.scss";
import userImg from "../../../images/user_1.png";
import dc from "../../../images/cric/img/dc.svg";
import ig from "../../../images/cric/img/ig.svg";
import tw from "../../../images/cric/img/tw.svg";
import { currencyFormat, roundDown } from "../../../utils/common";

import { user_logout_thunk } from "../../../redux/thunk/user_thunk";
import { accountDetail } from "../../../api/actioncable-methods";
import { user_wallet_update_action } from "../../../redux/actions/user_action";
import { FaDiscord } from "react-icons/fa";

const Header = ({ hideSign = false, sticky }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const { user } = state;
  const slug = user.data.user ? user.data.user.slug : null;
  const UserToggleComponent = React.forwardRef(({ onClick }, ref) => (
    <UserComponent
      user={state.user.data.user}
      sref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  ));

  useEffect(() => {
    if (slug) {
      accountDetail(slug, (data) => {
        dispatch(user_wallet_update_action(data));
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const DropToggle = React.forwardRef(({ onClick }, ref) => {
    return (
      <>
        <Link
          className="drop-dropdown"
          role={"button"}
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          Drops
        </Link>
      </>
    );
  });

  return (
    <>
      {/* <!--Header Start--> */}
      <header
        id="cricket-header"
        className={`cricket-header-section transparent-header ${
          sticky ? "header-background" : ""
        }`}
      >
        <div className="menu-area menu-sticky">
          <div className="container-fluid">
            <div className="heaader-inner-area d-flex justify-content-between align-items-center">
              <div className="gamfi-logo-area d-flex justify-content-between align-items-center">
                <div className="logo">
                  <a href="https://jump.trade/">
                    <img
                      src={
                        "https://cdn.guardianlink.io/product-hotspot/images/jump/jump-trade-logo.svg"
                      }
                      alt="logo"
                    />
                    {/* <a
                      className="guardian-link-brand"
                      href="https://www.guardianlink.io/"
                      target={"_blank"}>
                      <span>|</span> A GuardianLink Brand
                    </a> */}
                  </a>
                </div>
              </div>
              <div className="dflex-box">
                <div className="header-menu">
                  <ul className="nav-menu">
                    {/* <li>
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          window.open(
                            `${process.env.REACT_APP_JUMB_TRADE_URL}`,
                            "_blank"
                          )
                        }
                      >
                        Drop
                      </a>{" "}
                    </li> */}
                    <div className="dropdown beta-container">
                      <li>
                        <a className="pre-btn" style={{ cursor: "pointer" }}>
                          Drops
                          {/* <span className="beta-tag">New</span> */}
                        </a>{" "}
                      </li>
                      <div className="dropdown-content dropdown-menu">
                        <a
                          className="beta-container dropdown-item pre-btn"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            window.open(
                              `${process.env.REACT_APP_BALL_NFT_URL}`,
                              "_blank"
                            )
                          }
                        >
                          MCL Ball NFTs<span className="new-badge">new</span>
                        </a>
                        <a
                          className="beta-container dropdown-item pre-btn"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            window.open(
                              `${process.env.REACT_APP_MARKETPLACE_URL}/drop/free-mcl-mega-pass`,
                              "_blank"
                            )
                          }
                        >
                          MCL Mega Pass<span className="new-badge">new</span>
                        </a>

                        <a
                          className="beta-container dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            window.open(
                              `${process.env.REACT_APP_HURLEY_URL}`,
                              "_blank"
                            )
                          }
                        >
                          HURLEY NFTs
                        </a>
                        <a
                          className="beta-container dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            window.open(
                              `${process.env.REACT_APP_MARKETPLACE_URL}/drop/mcl-founder-pass`,
                              "_blank"
                            )
                          }
                        >
                          MCL Founder Pass
                        </a>
                        <a
                          className="beta-container dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            window.open(
                              `${process.env.REACT_APP_MARKETPLACE_URL}/drop/mcl-fusor-nfts`,
                              "_blank"
                            )
                          }
                        >
                          MCL Fusor NFTs
                        </a>
                        <a
                          className="beta-container dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            window.open(
                              `${process.env.REACT_APP_PUBLIC_URL}`,
                              "_self"
                            )
                          }
                        >
                          RADDX Metaverse NFTs
                        </a>
                        {/* <a
                          className="beta-container dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            window.open(
                              `${process.env.REACT_APP_MARKETPLACE_URL}/drop/free-mcl-pass`,
                              "_blank"
                            )
                          }
                        >
                          MCL Play Pass
                        </a> */}
                        <a
                          className="beta-container dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            window.open(
                              `${process.env.REACT_APP_MARKETPLACE_URL}/drop/mcl-shot-nfts`,
                              "_blank"
                            )
                          }
                        >
                          MCL Signature Shots
                        </a>
                        <a
                          className="beta-container dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            window.open(
                              `${process.env.REACT_APP_MARKETPLACE_URL}/drop/crypto-bat-nfts`,
                              "_blank"
                            )
                          }
                        >
                          Crypto Bat NFTs
                        </a>
                      </div>
                    </div>
                    {/* <Dropdown
                      autoClose={["inside", "outside"]}
                      className="me-0"
                    >
                      <Dropdown.Toggle
                        align="start"
                        drop="start"
                        as={DropToggle}
                      ></Dropdown.Toggle>

                      <Dropdown.Menu align="end">
                        <Dropdown.Item
                          as="button"
                          onClick={() =>
                            window.open(
                              `${process.env.REACT_APP_CHAKRA_URL}`,
                              "_blank"
                            )
                          }
                        >
                          Chakra The Invincible NFTs
                        </Dropdown.Item>
                        <Dropdown.Item
                          as="button"
                          onClick={() =>
                            window.open(
                              `${process.env.REACT_APP_AMITABH_URL}`,
                              "_blank"
                            )
                          }
                        >
                          BigB Punks NFTs
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown> */}

                    <li>
                      <a
                        className="pre-btn"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          window.open(
                            `${process.env.REACT_APP_MARKETPLACE_URL}/tournaments`,
                            "_blank"
                          )
                        }
                      >
                        Tournaments
                        <span className="new-badge">New</span>
                      </a>{" "}
                    </li>

                    <li>
                      <a
                        className="beta-container"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          window.open(
                            `${process.env.REACT_APP_MARKETPLACE_URL}/referral-program`,
                            "_blank"
                          )
                        }
                      >
                        Refer & Earn
                      </a>{" "}
                    </li>
                    {/* 
                    <div className="dropdown ">
                      <li>
                        <a
                          // className="pre-btn"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            window.open(
                              `${process.env.REACT_APP_MARKETPLACE_URL}/nft-marketplace/spin-contest`,
                              "_blank"
                            )
                          }
                          className="pre-btn"
                        >
                          Spin & Win
                        </a>{" "}
                      </li>
                      <div className="dropdown-content dropdown-menu">
                        <a
                          className="beta-container dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            window.open(
                              `${process.env.REACT_APP_MARKETPLACE_URL}/referral-program`,
                              "_blank"
                            )
                          }
                        >
                          Refer & Earn
                        </a>
                      </div>
                    </div> */}

                    <li>
                      <a
                        id="drop_outer"
                        className="beta-container theme-btn"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          window.open(
                            `${process.env.REACT_APP_MARKETPLACE_URL}/nft-marketplace`,
                            "_blank"
                          )
                        }
                      >
                        Explore Market
                      </a>{" "}
                    </li>
                    {/* <li>
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() => history.push("/#roadmap")}>
                        ROADMAP
                      </a>{" "}
                    </li>
                    <li>
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() => history.push("/#ourteam")}>
                        Team
                      </a>{" "}
                    </li> */}
                  </ul>
                </div>

                {!hideSign && (
                  <>
                    {user.login ? (
                      <>
                        <div className="cricket-btn-area">
                          <ul>
                            {/* <Nav.Link></Nav.Link> */}
                            <li className="buy-token">
                              <a
                                className="readon no-border"
                                target="_blank"
                                role="button"
                                onClick={() =>
                                  window.open(
                                    process.env.REACT_APP_HELP_URL,
                                    "_blank"
                                  )
                                }
                              >
                                <BiHelpCircle size={25} />
                              </a>
                            </li>
                            <Dropdown autoClose="outside">
                              <Dropdown.Toggle
                                align="start"
                                drop="start"
                                as={UserToggleComponent}
                              ></Dropdown.Toggle>

                              <Dropdown.Menu align="end">
                                <UserComponent user={state.user.data.user} />
                                {/* <Dropdown.Item
                              id="drop_inner"
                              href="/"
                              target="_self"
                            >
                              Meta Cricket League NFTs
                            </Dropdown.Item>
                            <Dropdown.Item
                              id="drop_inner"
                              href={process.env.REACT_APP_CHELSEA_URL}
                              target="_blank"
                            >
                              Football Memorabilia NFTs
                            </Dropdown.Item> */}
                                <Dropdown.Item
                                  as="button"
                                  onClick={() =>
                                    window.open(
                                      `${process.env.REACT_APP_ACCOUNTS_URL}/accounts/profile`,
                                      "_self"
                                    )
                                  }
                                >
                                  My Profile
                                </Dropdown.Item>
                                <Dropdown.Item
                                  as="button"
                                  onClick={() =>
                                    window.open(
                                      `${process.env.REACT_APP_ACCOUNTS_URL}/accounts/mynft`,
                                      "_self"
                                    )
                                  }
                                >
                                  My NFTs
                                </Dropdown.Item>
                                <Dropdown.Item
                                  as="button"
                                  onClick={() =>
                                    window.open(
                                      `${process.env.REACT_APP_ACCOUNTS_URL}/accounts/wallet`,
                                      "_self"
                                    )
                                  }
                                >
                                  My GuardianLink Wallet
                                </Dropdown.Item>
                                {/* <Dropdown.Item
                                  as="button"
                                  onClick={() =>
                                    history.push("/my-treasure-box")
                                  }>
                                  My Treasure Box
                                </Dropdown.Item> */}
                                <Dropdown.Item
                                  as="button"
                                  onClick={() =>
                                    window.open(
                                      `${process.env.REACT_APP_ACCOUNTS_URL}/accounts/my-orders`,
                                      "_self"
                                    )
                                  }
                                >
                                  My Orders
                                </Dropdown.Item>
                                <Dropdown.Item
                                  as="button"
                                  onClick={() =>
                                    window.open(
                                      `${process.env.REACT_APP_ACCOUNTS_URL}/accounts/pre-orders`,
                                      "_self"
                                    )
                                  }
                                >
                                  Pre Book
                                </Dropdown.Item>
                                <Dropdown.Item
                                  as="button"
                                  onClick={() =>
                                    window.open(
                                      `${process.env.REACT_APP_ACCOUNTS_URL}/accounts/bid-activity`,
                                      "_self"
                                    )
                                  }
                                >
                                  My Bids
                                </Dropdown.Item>
                                {/* <Dropdown.Item
                                  as="button"
                                  onClick={() =>
                                    window.open(
                                      `${process.env.REACT_APP_ACCOUNTS_URL}/accounts/wallet`,
                                      "_self"
                                    )
                                  }
                                >
                                  My Activity
                                </Dropdown.Item>{" "} */}
                                <Dropdown.Item
                                  as="button"
                                  onClick={() =>
                                    window.open(
                                      `${process.env.REACT_APP_ACCOUNTS_URL}/accounts/settings`,
                                      "_self"
                                    )
                                  }
                                >
                                  Settings
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item
                                  as="button"
                                  onClick={() =>
                                    window.open(
                                      process.env.REACT_APP_HELP_URL,
                                      "_blank"
                                    )
                                  }
                                >
                                  Help Center
                                </Dropdown.Item>
                                {/* <Dropdown.Divider />
                        <Dropdown.Item as="button">
                          <div className="d-flex justify-content-between">
                            <div>Moon Mode</div>

                            <div>
                              <ToggleButton
                                value={value || false}
                                onToggle={(value) => {
                                  setValue(!value);
                                }}
                              />
                            </div>
                          </div>
                        </Dropdown.Item> */}
                                <Dropdown.Divider />
                                <Dropdown.Item
                                  as="button"
                                  onClick={() => {
                                    dispatch(user_logout_thunk());
                                  }}
                                >
                                  Sign Out
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>{" "}
                            <li className="buy-token">
                              <a
                                className="readon filled-btn dc-btn"
                                href="https://discord.gg/guardianlink"
                                target="_blank"
                              >
                                {" "}
                                <FaDiscord size={25} />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="cricket-btn-area">
                          <ul>
                            {!user?.login && (
                              <>
                                <li className="buy-token">
                                  <a
                                    className="readon black-shape rounded-bordered"
                                    href={
                                      sessionStorage.getItem("fsz") !== null
                                        ? `${
                                            process.env.REACT_APP_ACCOUNTS_URL
                                          }/signin?redirect=${window.location.href.replace(
                                            window.location.search,
                                            ""
                                          )}&fsz=${sessionStorage.getItem(
                                            "fsz"
                                          )}`
                                        : `${
                                            process.env.REACT_APP_ACCOUNTS_URL
                                          }/signin?redirect=${window.location.href.replace(
                                            window.location.search,
                                            ""
                                          )}`
                                    }
                                    target="_self"
                                  >
                                    {" "}
                                    <span className="btn-text">
                                      Sign In{" "}
                                    </span>{" "}
                                  </a>
                                </li>
                                <li className="buy-token">
                                  <a
                                    className="readon white-btn hover-shape"
                                    href={
                                      sessionStorage.getItem("fsz") !== null
                                        ? `${
                                            process.env.REACT_APP_ACCOUNTS_URL
                                          }/signup?fsz=${sessionStorage.getItem(
                                            "fsz"
                                          )}`
                                        : `${process.env.REACT_APP_ACCOUNTS_URL}/signup?fsz=raddx`
                                    }
                                    target="_self"
                                  >
                                    {" "}
                                    <span className="btn-text">
                                      Sign Up{" "}
                                    </span>{" "}
                                  </a>
                                </li>
                              </>
                            )}
                            <li className="buy-token">
                              <a
                                className="readon filled-btn dc-btn"
                                href="https://discord.com/invite/JRWmNb38GW"
                                target="_blank"
                              >
                                {" "}
                                <FaDiscord size={25} />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </>
                    )}
                  </>
                )}
                <div className="cricket-btn-area">
                  <ul>
                    {!user?.login && (
                      <>
                        {" "}
                        <li className="social_nav_header">
                          <a
                            className="readon black-shape rounded-bordered signin-button"
                            href={
                              sessionStorage.getItem("fsz") !== null
                                ? `${
                                    process.env.REACT_APP_ACCOUNTS_URL
                                  }/signin?redirect=${window.location.href.replace(
                                    window.location.search,
                                    ""
                                  )}&fsz=${sessionStorage.getItem("fsz")}`
                                : `${
                                    process.env.REACT_APP_ACCOUNTS_URL
                                  }/signin?redirect=${window.location.href.replace(
                                    window.location.search,
                                    ""
                                  )}`
                            }
                            target="_self"
                          >
                            {" "}
                            <span className="btn-text">Sign In </span>{" "}
                          </a>
                        </li>
                        <li className="social_nav_header">
                          <a
                            className="readon white-btn hover-shape"
                            href={
                              sessionStorage.getItem("fsz") !== null
                                ? `${
                                    process.env.REACT_APP_ACCOUNTS_URL
                                  }/signup?fsz=${sessionStorage.getItem("fsz")}`
                                : `${process.env.REACT_APP_ACCOUNTS_URL}/signup?fsz=raddx`
                            }
                            target="_self"
                          >
                            {" "}
                            <span className="btn-text">Sign Up </span>{" "}
                          </a>
                        </li>
                      </>
                    )}
                    <li className="social_nav_header">
                      <a
                        href="https://discord.com/invite/JRWmNb38GW"
                        target={"_blank"}
                        className="social_link readon  dc-btn"
                        rel="nofollow noopener"
                      >
                        <FaDiscord size={25} />
                      </a>
                    </li>
                    <li>
                      <a
                        id="nav-expander"
                        className="nav-expander bar"
                        href="#"
                        onClick={() => setOpen(true)}
                      >
                        <div className="bar">
                          {" "}
                          <span className="dot1"></span>{" "}
                          <span className="dot2"></span>{" "}
                          <span className="dot3"></span>{" "}
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Canvas Mobile Menu start --> */}
        <nav
          className={`right_menu_togle mobile-navbar-menu ${
            open ? "open" : ""
          }`}
          id="mobile-navbar-menu"
        >
          <div className="close-btn">
            <a
              id="nav-close2"
              className="nav-close"
              onClick={() => setOpen(false)}
            >
              <div className="line">
                {" "}
                <span className="line1"></span> <span className="line2"></span>{" "}
              </div>
            </a>
          </div>
          {/* <div className="sidebar-logo mb-30">
            <a href="/">
              <img
                src={
                  "https://cdn.guardianlink.io/product-hotspot/images/jump/jump-trade-logo.svg"
                }
                alt="logo"
              />
            </a>
          </div> */}
          <ul className="nav-menu">
            <li className="current-menu-item">
              <a
                className="pre-btn"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  window.open(`${process.env.REACT_APP_BALL_NFT_URL}`, "_blank")
                }
              >
                MCL Ball NFTs <span className="new-badge">new</span>
              </a>{" "}
            </li>
            <li className="current-menu-item">
              <a
                className="pre-btn"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  window.open(
                    `${process.env.REACT_APP_MARKETPLACE_URL}/drop/free-mcl-mega-pass`,
                    "_blank"
                  )
                }
              >
                MCL Mega Pass <span className="new-badge">new</span>
              </a>{" "}
            </li>

            <li className="current-menu-item">
              <a
                style={{ cursor: "pointer" }}
                onClick={() =>
                  window.open(`${process.env.REACT_APP_HURLEY_URL}`, "_blank")
                }
              >
                HURLEY NFTs
              </a>{" "}
            </li>
            <li className="current-menu-item">
              <a
                style={{ cursor: "pointer" }}
                onClick={() =>
                  window.open(
                    `${process.env.REACT_APP_MARKETPLACE_URL}/drop/mcl-founder-pass`,
                    "_blank"
                  )
                }
              >
                MCL Founder Pass
              </a>{" "}
            </li>
            <li className="current-menu-item">
              <a
                style={{ cursor: "pointer" }}
                onClick={() =>
                  window.open(
                    `${process.env.REACT_APP_MARKETPLACE_URL}/drop/mcl-fusor-nfts`,
                    "_blank"
                  )
                }
              >
                MCL Fusor NFTs
              </a>{" "}
            </li>
            <li className="current-menu-item">
              <a
                style={{ cursor: "pointer" }}
                onClick={() =>
                  window.open(`${process.env.REACT_APP_PUBLIC_URL}`, "_self")
                }
              >
                RADDX Metaverse NFTs Drop
              </a>{" "}
            </li>
            {/* <li className="current-menu-item">
              <a
                style={{ cursor: "pointer" }}
                onClick={() =>
                  window.open(
                    `${process.env.REACT_APP_MARKETPLACE_URL}/drop/free-mcl-pass`,
                    "_blank"
                  )
                }
              >
                MCL Play Pass Drop
              </a>{" "}
            </li> */}
            <li className="current-menu-item">
              <a
                style={{ cursor: "pointer" }}
                onClick={() =>
                  window.open(
                    `${process.env.REACT_APP_MARKETPLACE_URL}/drop/mcl-shot-nfts`,
                    "_blank"
                  )
                }
              >
                MCL Signature Shots Drop
              </a>{" "}
            </li>
            <li className="current-menu-item">
              <a
                style={{ cursor: "pointer" }}
                onClick={() =>
                  window.open(
                    `${process.env.REACT_APP_MARKETPLACE_URL}/drop/crypto-bat-nfts`,
                    "_blank"
                  )
                }
              >
                Crypto Bat NFTs Drop
              </a>{" "}
            </li>
            <li className="current-menu-item ">
              <a
                style={{ cursor: "pointer" }}
                onClick={() =>
                  window.open(
                    `${process.env.REACT_APP_MARKETPLACE_URL}/tournaments`,
                    "_blank"
                  )
                }
                className="pre-btn"
              >
                Tournaments
                <span className="new-badge">New</span>
              </a>{" "}
            </li>

            {/* <li className="current-menu-item">
              <a
                className="pre-btn"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  window.open(
                    `${process.env.REACT_APP_MARKETPLACE_URL}/nft-marketplace/spin-contest`,
                    "_blank"
                  )
                }
              >
                Spin & Win
              </a>{" "}
            </li> */}
            <li className="current-menu-item">
              <a
                style={{ cursor: "pointer" }}
                onClick={() =>
                  window.open(
                    `${process.env.REACT_APP_MARKETPLACE_URL}/referral-program`,
                    "_blank"
                  )
                }
              >
                Refer & Earn
              </a>{" "}
            </li>
            <li>
              <a
                id="drop_outer"
                className="beta-container theme-btn"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  window.open(
                    `${process.env.REACT_APP_MARKETPLACE_URL}/nft-marketplace`,
                    "_blank"
                  )
                }
              >
                Explore Market
              </a>{" "}
            </li>
            <li>
              <a
                className="mobile-beta-container"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  window.open(process.env.REACT_APP_HELP_URL, "_blank")
                }
              >
                Need Help ?
              </a>{" "}
            </li>
            {/* <li>
              <a
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push("/#roadmap");
                  setOpen(false);
                }}
              >
                Roadmap
              </a>{" "}
            </li>
            <li>
              <a
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push("/#ourteam");
                  setOpen(false);
                }}
              >
                Team
              </a>{" "}
            </li> */}

            {/* {!user.login && (
              <>
                <li className="menu-item-has-children">
                  {" "}
                  <a
                    href={`${
                      process.env.REACT_APP_ACCOUNTS_URL
                    }/signin?redirect=${window.location.href.replace(
                      window.location.search,
                      ""
                    )}&fsz=${sessionStorage.getItem("fsz")}`}
                    target="_self">
                    Sign In
                  </a>{" "}
                </li>
                <li className="menu-item-has-children">
                  {" "}
                  <a
                    href={`${
                      process.env.REACT_APP_ACCOUNTS_URL
                    }/signup?redirect=${window.location.href.replace(
                      window.location.search,
                      ""
                    )}&fsz=${sessionStorage.getItem("fsz")}`}
                    target="_self">
                    Sign Up
                  </a>{" "}
                </li>
              </>
            )} */}
            {/* <li>
              <button
                type="button"
                className="readon black-shape-big connectWalletBtnforMobile"
              >
                {" "}
                <span className="btn-text">Sign Up </span>{" "}
              </button>
            </li> */}

            {/* <li>
              <div className="social_nav_header_sidemenu">
                <a
                  href="https://discord.com/invite/JRWmNb38GW"
                  target={"_blank"}
                  className="social_link"
                  rel="nofollow noopener">
                  <img src={dc} className="change-my-color" />
                </a>
                <a
                  href="https://www.instagram.com/jumptradenft/"
                  target={"_blank"}
                  className="social_link"
                  rel="nofollow noopener">
                  <img src={ig} className="change-my-color" />
                </a>
                <a
                  href="https://twitter.com/Jumptradenft"
                  target={"_blank"}
                  className="social_link"
                  rel="nofollow noopener">
                  <img src={tw} className="change-my-color" />
                </a>
              </div> 
          </li>*/}
          </ul>
        </nav>
        {/* <!-- Canvas Menu end --> */}
      </header>
    </>
  );
};
const UserComponent = ({ sref, user, onClick = () => {} }) => (
  <div
    className={`header-user-details ${user?.og_user === true ? "og-user" : ""}`}
    onClick={onClick}
    ref={sref}
  >
    <div className="user-image-block">
      <img
        className="user-image"
        src={user.avatar_url ? user.avatar_url : userImg}
        alt="user-icon"
      />
    </div>
    <div className="user-name">
      {currencyFormat(roundDown(user?.balance), user?.currency_name)}
    </div>
  </div>
);
export default Header;
