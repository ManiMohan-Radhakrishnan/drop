import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Navbar, Nav, Dropdown, Container } from "react-bootstrap";
import { BiBell, BiHelpCircle } from "react-icons/bi";
import { useTranslation } from "react-multi-lang";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { FaDiscord } from "react-icons/fa";

import depositIcon from "../../images/deposit.svg";
import bidIcon from "../../images/bid.svg";
import buyIcon from "../../images/buy.svg";
import NFTCounter from "../nft-counter";
import outbidIcon from "../../images/outbid.svg";
import moneyWithdraw from "../../images/withdraw-money.svg";
import userImg from "../../images/user_1.png";
import {
  user_logout_thunk,
  market_live_thunk,
} from "../../redux/thunk/user_thunk";
import { accountDetail } from "../../api/actioncable-methods";
import { currencyFormat } from "../../utils/common";
import { user_wallet_update_action } from "../../redux/actions/user_action";
import { getNotificationApi } from "../../api/base-methods";
import { readNotificationApi } from "./../../api/base-methods";

import "./style.scss";

const Header = ({
  hideOptions = false,
  hideSign = false,
  started = false,
  show_ribbon = true,
}) => {
  const market_start_date = "Jan 26, 2022 03:30:00";

  const [market_time, set_market_time] = useState();

  const history = useHistory();
  const t = useTranslation();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [notiLoading, setNotiLoading] = useState(false);
  const [npage, setNPage] = useState(1);
  const [notification, setNotification] = useState();
  const [notiRead, setNotiRead] = useState(true);

  const [ribbon, setRibbon] = useState(show_ribbon);

  const { user } = state;
  const slug = user.data.user ? user.data.user.slug : null;

  const timeFunction = (check = false) => {
    var offset = new Date().getTimezoneOffset();

    var market_start_date_utc = new Date(market_start_date);
    market_start_date_utc.setMinutes(
      market_start_date_utc.getMinutes() - offset
    );

    var s_time = new Date();

    if (check) s_time.setSeconds(s_time.getSeconds() + 2);

    if (new Date(market_start_date_utc) < s_time) {
      // set_market_started(true);
      // setIsLive(true);
      dispatch(market_live_thunk());
    } else {
      set_market_time(market_start_date_utc);
    }
  };

  useEffect(() => {
    timeFunction(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheck = () => {
    timeFunction(true);
  };

  useEffect(() => {
    if (slug) {
      accountDetail(slug, (data) => {
        dispatch(user_wallet_update_action(data));
      });
      handleGetNotification(npage);
    }

    if (started) setRibbon(true);
    // if (user.login) handleGetNotification(npage);
    // handleGetNotification(npage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  // const handleChangeLang = () => {
  //   const u_lang = lang === "en" ? "hi" : "en";
  //   setLanguage(u_lang);
  //   dispatch(change_lang_action(u_lang));
  // };

  const handleGetNotification = async (input) => {
    try {
      setNotiLoading(true);
      const result = await getNotificationApi(input);
      setNotiLoading(false);
      if (input === 1) {
        setNotification(result.data.data);
        if (result.data.data.total > 0) {
          setNotiRead(result.data.data.notifications_read);
        }
      } else {
        setNotification({
          ...notification,
          notifications: [
            ...notification.notifications,
            ...result.data.data.notifications,
          ],
          next_page: result.data.data.next_page,
        });
      }
    } catch (error) {
      setNotiLoading(false);

      console.log(
        "🚀 ~ file: index.js ~ line 49 ~ handleGetNotification ~ error",
        error
      );
    }
  };

  const readNotification = async () => {
    try {
      if (!notiRead) await readNotificationApi();
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js ~ line 61 ~ readNotification ~ error",
        error
      );
    }
  };

  const DropToggle = React.forwardRef(({ onClick }, ref) => {
    return (
      <>
        <Nav.Link
          id="drop_outer"
          role={"button"}
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          Drops
        </Nav.Link>
        <Nav.Link style={{ display: "none" }}></Nav.Link>
      </>
    );
  });

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

  const NotificationToggleComponent = React.forwardRef(({ onClick }, ref) => {
    return (
      <div
        className={`${notification ? "theme-color rounded-circle" : ""}`}
        ref={ref}
        role="button"
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
          setNotiRead(true);
        }}
      >
        <BiBell size={25} color={"white"} />

        {!notiRead && (
          <>
            <span className="nofi-color"> </span>
          </>
        )}
      </div>
    );
  });

  const NotiCard = ({ data }) => {
    const handleNotiClick = () => {
      if (data.reason === "deposit") {
        window.open(
          `${process.env.REACT_APP_ACCOUNTS_URL}/accounts/wallet`,
          "_self"
        );
      }
    };

    return (
      <div className="noti-message" role="button" onClick={handleNotiClick}>
        {(() => {
          if (data.activity_type === "deposit") {
            return <img src={depositIcon} alt="notification icon" />;
          } else if (data.activity_type === "reward") {
            return <img src={buyIcon} alt="notification icon" />;
          } else if (data.activity_type === "bid") {
            if (data.reason === "bid_lock") {
              return <img src={bidIcon} alt="notification icon" />;
            } else if (
              data.reason === "bid_expired" ||
              data.reason === "bid_closed"
            ) {
              return <img src={outbidIcon} alt="notification icon" />;
            } else if (data.reason === "bid_outdated") {
              return <img src={outbidIcon} alt="notification icon" />;
            } else if (data.reason === "bid_cancelled") {
              return <img src={outbidIcon} alt="notification icon" />;
            } else if (data.reason === "bid_success") {
              return <img src={bidIcon} alt="notification icon" />;
            } else if (data.reason === "bid_received") {
              return <img src={outbidIcon} alt="notification icon" />;
            }
          } else if (data.activity_type === "buy") {
            if (data.payment_type === "debit") {
              return <img src={buyIcon} alt="notification icon" />;
            } else {
              return <img src={buyIcon} alt="notification icon" />;
            }
          } else if (data.activity_type === "withdraw") {
            if (data.reason === "withdraw_requested") {
              return <img src={moneyWithdraw} alt="notification icon" />;
            } else if (data.reason === "withdraw_cancelled") {
              return <img src={moneyWithdraw} alt="notification icon" />;
            } else if (data.reason === "withdraw_success") {
              return <img src={moneyWithdraw} alt="notification icon" />;
            }
          } else {
            return "";
          }
        })()}

        <div className="noti-message-content">
          {(() => {
            if (data.activity_type === "deposit") {
              return (
                <>
                  <div className="title">Deposit Successful</div>
                  <div className="desc text-secondary">
                    Your payment of{" "}
                    {currencyFormat(Math.round(data.amount), "USD")} was
                    successfully processed to your wallet! Happy NFT buying.
                  </div>
                  <div className="noti-time">
                    {dayjs(data.created_at).format("DD MMM YYYY hh:mma")}
                  </div>
                </>
              );
            } else if (data.activity_type === "reward") {
              return (
                <>
                  <div className="title">{data.title}</div>
                  <div className="desc text-secondary">{data.desc}</div>
                  <div className="noti-time">
                    {dayjs(data.created_at).format("DD MMM YYYY hh:mma")}
                  </div>
                </>
              );
            } else if (data.activity_type === "bid") {
              return (
                <>
                  {(() => {
                    if (data.reason === "bid_lock") {
                      return (
                        <>
                          <div className="title">Bid Locked</div>
                          <div className="desc text-secondary">
                            <>
                              Your bid of{" "}
                              <b>
                                {currencyFormat(Math.round(data.amount), "USD")}
                              </b>{" "}
                              is locked for{" "}
                              <b>
                                {data.celebrity_name}
                                's {data.nft_name}
                              </b>{" "}
                              from <b>{data.buyer_name}</b>{" "}
                            </>
                          </div>
                          <div className="noti-time">
                            {dayjs(data.created_at).format(
                              "DD MMM YYYY hh:mma"
                            )}
                          </div>
                        </>
                      );
                    } else if (
                      data.reason === "bid_expired" ||
                      data.reason === "bid_closed"
                    ) {
                      return (
                        <>
                          <div className="title">Bid Expired</div>
                          <div className="desc text-secondary">
                            <>
                              Your bid{" "}
                              <b>
                                {currencyFormat(Math.round(data.amount), "USD")}
                              </b>{" "}
                              was expired for{" "}
                              <b>
                                {data.celebrity_name}
                                's {data.nft_name}
                              </b>{" "}
                              from <b>{data.buyer_name}</b>
                            </>
                          </div>
                          <div className="noti-time">
                            {dayjs(data.created_at).format(
                              "DD MMM YYYY hh:mma"
                            )}
                          </div>
                        </>
                      );
                    } else if (data.reason === "bid_outdated") {
                      return (
                        <>
                          <div className="title">Bid Outdated</div>
                          <div className="desc text-secondary">
                            <>
                              Your bid{" "}
                              <b>
                                {currencyFormat(Math.round(data.amount), "USD")}
                              </b>{" "}
                              was outdated for{" "}
                              <b>
                                {data.celebrity_name}
                                's {data.nft_name}
                              </b>{" "}
                              from <b>{data.buyer_name}</b>
                            </>
                          </div>
                          <div className="noti-time">
                            {dayjs(data.created_at).format(
                              "DD MMM YYYY hh:mma"
                            )}
                          </div>
                        </>
                      );
                    } else if (data.reason === "bid_cancelled") {
                      return (
                        <>
                          <div className="title">Bid Cancelled</div>
                          <div className="desc text-secondary">
                            <>
                              Your bid{" "}
                              <b>
                                {currencyFormat(Math.round(data.amount), "USD")}
                              </b>{" "}
                              was cancelled for{" "}
                              <b>
                                {data.celebrity_name}
                                's {data.nft_name}
                              </b>{" "}
                              by <b>{data.seller_name}</b>
                            </>
                          </div>
                          <div className="noti-time">
                            {dayjs(data.created_at).format(
                              "DD MMM YYYY hh:mma"
                            )}
                          </div>
                        </>
                      );
                    } else if (data.reason === "bid_success") {
                      return (
                        <>
                          {data.payment_type === "debit" ? (
                            <>
                              <div className="title">Bid Successfull</div>
                              <div className="desc text-secondary">
                                <>
                                  Your bid{" "}
                                  <b>
                                    {" "}
                                    {currencyFormat(
                                      Math.round(data.amount),
                                      "USD"
                                    )}
                                  </b>{" "}
                                  was successful for{" "}
                                  <b>
                                    {" "}
                                    {data.celebrity_name}
                                    's {data.nft_name}
                                  </b>{" "}
                                  from <b>{data.buyer_name}</b>
                                </>
                              </div>
                              <div className="noti-time">
                                {dayjs(data.created_at).format(
                                  "DD MMM YYYY hh:mma"
                                )}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="title">Bid Successfull</div>
                              <div className="desc text-secondary">
                                <>
                                  Your{" "}
                                  <b>
                                    {data.celebrity_name}
                                    's {data.nft_name}
                                  </b>{" "}
                                  was sold for{" "}
                                  <b>
                                    {currencyFormat(
                                      Math.round(data.amount),
                                      "USD"
                                    )}
                                  </b>{" "}
                                  to <b>{data.buyer_name}</b>
                                </>
                              </div>
                              <div className="noti-time">
                                {dayjs(data.created_at).format(
                                  "DD MMM YYYY hh:mma"
                                )}
                              </div>
                            </>
                          )}
                        </>
                      );
                    } else if (data.reason === "bid_received") {
                      return (
                        <>
                          <div className="title">Bid Received</div>
                          <div className="desc text-secondary">
                            <>
                              You received{" "}
                              <b>
                                {" "}
                                {currencyFormat(Math.round(data.amount), "USD")}
                              </b>{" "}
                              bid for{" "}
                              <b>
                                {data.celebrity_name}
                                's {data.nft_name}
                              </b>{" "}
                              from <b>{data.buyer_name}</b>
                            </>
                          </div>
                          <div className="noti-time">
                            {dayjs(data.created_at).format(
                              "DD MMM YYYY hh:mma"
                            )}
                          </div>
                        </>
                      );
                    }
                  })()}
                </>
              );
            } else if (data.activity_type === "buy") {
              return (
                <>
                  {data.payment_type === "debit" ? (
                    <>
                      <div className="title">You Bought</div>
                      <div className="desc text-secondary">
                        <>
                          You bought{" "}
                          <b>
                            {data.celebrity_name}
                            's NFT{" "}
                          </b>
                          from <b>{data.seller_name}</b> for{" "}
                          <b>
                            {" "}
                            {currencyFormat(Math.round(data.amount), "USD")}
                          </b>
                        </>
                      </div>
                      <div className="noti-time">
                        {dayjs(data.created_at).format("DD MMM YYYY hh:mma")}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="title">You Sold</div>
                      <div className="desc text-secondary">
                        <>
                          You sold <b>{data.celebrity_name}'s NFT</b> to{" "}
                          <b>{data.buyer_name}</b> for{" "}
                          <b>
                            {" "}
                            {currencyFormat(Math.round(data.amount), "USD")}
                          </b>
                        </>
                      </div>
                      <div className="noti-time">
                        {dayjs(data.created_at).format("DD MMM YYYY hh:mma")}
                      </div>
                    </>
                  )}
                </>
              );
            } else if (data.activity_type === "withdraw") {
              return (
                <>
                  <div className="title">Withdraw</div>
                  <div className="desc text-secondary">
                    <>
                      {(() => {
                        if (data.reason === "withdraw_requested") {
                          return (
                            <>
                              {" "}
                              You <b>requested a withdraw</b> of{" "}
                              <b>
                                {currencyFormat(Math.round(data.amount), "USD")}
                              </b>{" "}
                            </>
                          );
                        } else if (data.reason === "withdraw_cancelled") {
                          return (
                            <>
                              You <b>cancelled a withdraw request</b> of{" "}
                              <b>
                                {currencyFormat(Math.round(data.amount), "USD")}
                              </b>
                            </>
                          );
                        } else if (data.reason === "withdraw_success") {
                          return (
                            <>
                              You <b>withdraw request</b> of{" "}
                              <b>
                                {currencyFormat(Math.round(data.amount), "USD")}
                              </b>{" "}
                              was <b>successful</b>
                            </>
                          );
                        }
                      })()}
                    </>
                  </div>
                  <div className="noti-time">
                    {dayjs(data.created_at).format("DD MMM YYYY hh:mma")}
                  </div>
                </>
              );
            }
          })()}
        </div>
      </div>
    );
  };

  return (
    <>
      <div style={{ display: "none" }}>
        {market_time && (
          <NFTCounter time={market_time} handleEndEvent={handleCheck} />
        )}
      </div>
      {ribbon && (
        <div className="top_bar">
          <div className="alert_box">
            <div className="alert_info">
              <p>
                <a
                  className={"start"}
                  href={
                    slug
                      ? `${process.env.REACT_APP_ACCOUNTS_URL}/accounts/wallet#web`
                      : `${
                          process.env.REACT_APP_ACCOUNTS_URL
                        }/signup?fsz=${sessionStorage.getItem("fsz")}`
                  }
                >
                  {user.marketLive ? (
                    <>
                      The BeyondLife.club marketplace is live now! Fund your
                      wallet and buy your favorite NFTs!
                    </>
                  ) : (
                    <>
                      BeyondLife.club's exclusive marketplace is all set to
                      launch! Ensure to fund your wallets and get your hands on
                      NFTs you missed!
                    </>
                  )}
                </a>
              </p>
            </div>
            <div className="alert_close">
              <span id="al_close" onClick={() => setRibbon(false)}>
                {/* <FaTimes /> */}
                <img
                  alt="times logo"
                  src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e"
                />
              </span>
            </div>
          </div>
        </div>
      )}
      <Navbar bg="dark" expand="md" variant="dark">
        <Container fluid>
          <Navbar.Brand
            onClick={() =>
              window.open(process.env.REACT_APP_WEBSITE_URL, "_self")
            }
            role="button"
            className="head-title"
          >
            BeyondLife.club
            <div
              className="sub-head-title header-powereby "
              role="button"
              onClick={() =>
                window.open(process.env.REACT_APP_GUARDIAN_URL, "_self")
              }
            >
              Powered by GuardianLink
            </div>
          </Navbar.Brand>
          {!hideOptions && (
            <>
              <Nav className="d-flex me-0 ms-auto">
                <Dropdown autoClose={["inside", "outside"]} className="me-0">
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
                      Amitabh NFTs
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Nav.Link
                  id="drop_outer"
                  href={process.env.REACT_APP_MARKETPLACE_URL}
                >
                  <span className="beta-container">
                    <span className="beta-tag">Beta</span>
                    Marketplace
                  </span>
                </Nav.Link>
                {!hideSign && (
                  <>
                    {user.login ? (
                      <>
                        <Nav.Link href="#home" className="help_ic">
                          <BiHelpCircle
                            size={25}
                            role="button"
                            onClick={() =>
                              window.open(
                                process.env.REACT_APP_HELP_URL,
                                "_blank"
                              )
                            }
                          />
                        </Nav.Link>
                        <Dropdown
                          autoClose={["inside", "outside"]}
                          onToggle={(e) => {
                            if (e) {
                              readNotification();
                              setNotiRead(false);
                            }
                          }}
                        >
                          <Dropdown.Toggle
                            align="start"
                            drop="start"
                            as={NotificationToggleComponent}
                          ></Dropdown.Toggle>

                          <Dropdown.Menu align="end" className="noti-container">
                            <div className="noti-header">
                              <BiBell size={25} color={"white"} /> Notifications
                            </div>
                            <div className="noti-content">
                              {/* <div className="sub-header">Today</div> */}

                              {notification?.notifications.length > 0 ? (
                                <>
                                  {notification?.notifications.map((o, i) => (
                                    <Dropdown.Item>
                                      <NotiCard key={`noti${i}`} data={o} />
                                    </Dropdown.Item>
                                  ))}

                                  {notiLoading && (
                                    <div className="noti-load-more text-secondary">
                                      Loading...
                                    </div>
                                  )}

                                  {notification?.next_page ? (
                                    <div
                                      className="noti-load-more text-secondary"
                                      role="button"
                                      onClick={() => {
                                        setNPage(npage + 1);
                                        handleGetNotification(npage + 1);
                                      }}
                                    >
                                      See More
                                    </div>
                                  ) : (
                                    <div className="noti-load-more text-secondary">
                                      You have reached the end
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="noti-load-more text-secondary no-notify">
                                  No notifications found
                                </div>
                              )}
                            </div>
                          </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown autoClose="outside">
                          <Dropdown.Toggle
                            align="start"
                            drop="start"
                            as={UserToggleComponent}
                          ></Dropdown.Toggle>

                          <Dropdown.Menu align="end">
                            <UserComponent user={state.user.data.user} />
                            <Dropdown.Item
                              id="drop_inner"
                              href="/"
                              target="_self"
                            >
                              Drops
                            </Dropdown.Item>
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
                            {/* <Dropdown.Item
                              as="button"
                              onClick={() => history.push("/my-treasure-box")}
                            >
                              My Treasure Box
                            </Dropdown.Item> */}
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
                      </>
                    ) : (
                      <>
                        <>
                          <Nav.Link
                            href={`${
                              process.env.REACT_APP_ACCOUNTS_URL
                            }/signin?redirect=${window.location.href.replace(
                              window.location.search,
                              ""
                            )}&fsz=${sessionStorage.getItem("fsz")}`}
                            target="_self"
                          >
                            {t("signin")}
                          </Nav.Link>
                          <Nav.Link
                            href={`${
                              process.env.REACT_APP_ACCOUNTS_URL
                            }/signup?fsz=${sessionStorage.getItem("fsz")}`}
                            target="_self"
                          >
                            {t("signup")}
                          </Nav.Link>
                        </>
                      </>
                    )}
                  </>
                )}
                <Nav.Link
                  className="discord_ic"
                  href={`https://discord.com/invite/JRWmNb38GW`}
                  target="_blank"
                >
                  <FaDiscord size={25} />
                  <span>Join Our Discord</span>
                </Nav.Link>
              </Nav>
            </>
          )}
        </Container>
      </Navbar>
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
      {currencyFormat(user?.balance, user?.currency_name)}
    </div>
  </div>
);
export default Header;