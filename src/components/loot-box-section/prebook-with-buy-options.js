import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, OverlayTrigger, Popover } from "react-bootstrap";
import { toast } from "react-toastify";
import { MdCheckCircle } from "react-icons/md";
import {
  BsFillInfoCircleFill,
  BsFillQuestionCircleFill,
  BsInfoCircle,
} from "react-icons/bs";
import Lottie from "lottie-react";
import successAnim from "../../images/raddx-nft/lottie/Tick.json";
import { getUser, isLoading } from "../../redux/reducers/user_reducer";
import { getCookies } from "../../utils/cookies";

import { currencyFormat, roundDown } from "../../utils/common";

import { LOOT_STATUS } from "./common";
import ToolTip from "../tooltip";

import "./style.scss";
import {
  loot_buy_thunk,
  loot_prebook_thunk,
  user_load_by_token_thunk,
} from "../../redux/thunk/user_thunk";
import { fetchAllowedAssets } from "../../api/base-methods";
import { getDropPriceBreakup, getPrebookPriceBreakup } from "../../api/methods";
import PaymentList from "../PaymentOptions/PaymentList";
import PaymentOptions from "../PaymentOptions";
import { PAYMENT_OPTS } from "../PaymentOptions/config";
import useDebounce from "../../hook/useDebounce";
import { change_lang_action } from "../../redux/actions/lang_action";
import { HiInformationCircle } from "react-icons/hi";
import { user_login_action_request } from "../../redux/actions/user_action";

const Prebook = ({
  name = "",
  show = false,
  toggleModal = () => {},
  modalState = {},
  onHide = () => {},
  onReload = () => {},
  numberOfQuantity = 1,
  slug = "",
}) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const loading = useSelector(isLoading);
  const effectInit = useRef(true);

  const [nftQuantity, setNftQuantity] = useState(numberOfQuantity);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isJTEnabled, enableJT] = useState(false);
  const [isRewardsEnabled, enableRewards] = useState(false);
  const [nftPriceBreakUp, setNftPriceBreakUp] = useState({});
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [allowedAssets, setAllowedAssets] = useState({});
  const [priceLoading, setPriceLoading] = useState(false);
  const [open, setOpen] = useState(false);
  useDebounce(() => fetchPaymentSplits(), 500, nftQuantity);

  useEffect(() => {
    if (effectInit.current) {
      getAllowedAssets();
      effectInit.current = false;
    }
  }, []);

  const user_balance = user?.balance;

  useEffect(() => {
    fetchPaymentSplits();
  }, [isRewardsEnabled, isJTEnabled, user_balance]);

  const jump_point_balance = user?.assert_balances?.jump_point || 0;

  const isMinJTAvailable = parseFloat(jump_point_balance / 10000) >= 0.01;

  const reward_point_balance = user?.assert_balances?.reward_point || 0;

  const isMinRewardAvailable = parseFloat(reward_point_balance) >= 0.01;

  const insufficient_balance =
    (nftPriceBreakUp?.usd?.value ? nftPriceBreakUp?.usd?.value : 0) >
    user_balance;
  const amount_to_be_added = insufficient_balance
    ? parseFloat(
        roundDown(nftPriceBreakUp?.usd?.value) - roundDown(user_balance)
      )
    : 0;
  const { loot = {} } = modalState;
  const nft_price = nftQuantity * parseFloat(loot?.buy_amount);
  const used_reward_points = nftPriceBreakUp?.reward_point?.value || 0;
  const used_reward_points_in_usd =
    nftPriceBreakUp?.reward_point?.value_in_usd || 0;
  const used_jt_points = nftPriceBreakUp?.jump_point?.value || 0;
  const used_jt_points_in_usd = nftPriceBreakUp?.jump_point?.value_in_usd || 0;

  const handlePurchase = () => {
    let payment_include = [];
    isRewardsEnabled && payment_include.push("reward_point");
    isJTEnabled && payment_include.push("jump_point");
    if (modalState?.loot_status === LOOT_STATUS.PRE_BOOK)
      dispatch(
        loot_prebook_thunk({
          data: {
            slug: modalState?.loot?.slug,
            preorder_users: { quantity: nftQuantity, payment_include },
          },
          callback: dispatchCallback,
        })
      );
    if (modalState?.loot_status === LOOT_STATUS.DROP)
      dispatch(
        loot_buy_thunk({
          data: {
            slug: modalState?.loot?.slug,
            loot: { quantity: nftQuantity, payment_include },
          },
          callback: dispatchCallback,
        })
      );
  };

  const dispatchCallback = (response) => {
    if (response?.data?.status !== 200) {
      toast.error(
        response?.data?.message ||
          "Something went wrong. Please try again later."
      );
      toggleModal();
    }
    setIsPurchased(response?.status === 200);
  };

  const refreshBalance = () => {
    if (loading) return;
    dispatch(user_login_action_request());
    let token = getCookies("token");
    dispatch(user_load_by_token_thunk(token));
  };

  const getAllowedAssets = async () => {
    const response = await fetchAllowedAssets();
    let allowed_assets = response?.data?.data || [];
    setAllowedAssets(allowed_assets);
  };

  const convertPointsToUSD = (points, point_type = "jump_point") => {
    if (allowedAssets && allowedAssets[point_type]) {
      let usd_per_qty = parseFloat(allowedAssets[point_type]?.usd_per_qty);
      let usd_value = parseFloat(points) * usd_per_qty;
      return roundDown(parseFloat(usd_value), 2);
    } else return 0;
  };

  const handleAssetSelect = (e) => {
    let current_value = e.target.checked;
    let current_asset = e.target.name || "";

    let reward_point_balance_in_usd = convertPointsToUSD(
      reward_point_balance,
      "reward_point"
    );

    let has_surplus_reward_points =
      reward_point_balance_in_usd >= nftPriceBreakUp?.total;

    if (current_asset === "reward_point") {
      enableRewards(current_value);
      if (current_value && has_surplus_reward_points) enableJT(false);
    }
    if (current_asset === "jump_point") {
      enableJT(current_value);
      if (current_value && has_surplus_reward_points) enableRewards(false);
    }

    console.table({
      reward_point_balance,
      reward_point_balance_in_usd,
      has_surplus_reward_points,
      total: nftPriceBreakUp?.total,
    });
  };

  const fetchPaymentSplits = async () => {
    let payment_include = [];
    if (isRewardsEnabled) payment_include.push("reward_point");
    if (isJTEnabled) payment_include.push("jump_point");
    try {
      let result = {};
      setPriceLoading(true);

      if (modalState?.loot_status === LOOT_STATUS.PRE_BOOK)
        result = await getPrebookPriceBreakup({
          slug,
          request: { quantity: nftQuantity, payment_include },
        });
      if (modalState?.loot_status === LOOT_STATUS.DROP)
        result = await getDropPriceBreakup({
          slug,
          request: { quantity: nftQuantity, payment_include },
        });

      let resultData = result?.data?.data || {};
      let { splitup = [], ...rest } = resultData;
      if (Array.isArray(result?.data?.data?.splitup)) {
        setNftPriceBreakUp(Object.assign({}, ...splitup, { ...rest }));
      } else setNftPriceBreakUp(result?.data?.data);
    } catch (error) {
      console.log("Error in fetch payment split", error);
    } finally {
      setPriceLoading(false);
    }
  };

  const openPaymentGateway = (paymentGateway) => {
    setPaymentMethod(paymentGateway);
  };

  const handlePaymentSuccess = () => {
    console.log("Payment Success");
    refreshBalance();
    openPaymentGateway(null);
  };

  const handlePaymentFailure = () => {
    console.log("Payment Failure");
    setPaymentMethod(null);
  };

  const totalPreorders =
    modalState?.loot_status !== LOOT_STATUS.DROP &&
    modalState?.loot?.qty_per_user - modalState?.loot?.preorder_reserved_qty;

  const SharePopover = ({ icon, placement }) => {
    return (
      <>
        <OverlayTrigger
          trigger="hover"
          rootClose
          key={placement}
          placement={placement}
          overlay={
            <Popover className="mb-2 aloowed-qty-details">
              <Popover.Body className="p-1 custom-pop">
                <div>
                  <p>
                    Max Qty allowed per user: {modalState?.loot?.qty_per_user}
                  </p>
                  <p>
                    Pre-Booked already:{" "}
                    {modalState?.loot?.preorder_reserved_qty}
                  </p>
                  <p>Remaining: {totalPreorders}</p>
                </div>
              </Popover.Body>
            </Popover>
          }
        >
          <span style={{ paddingLeft: "0.2rem" }}>{icon}</span>
        </OverlayTrigger>
      </>
    );
  };

  return (
    <Modal
      show={show}
      animation={false}
      contentClassName={`prebook-modal ${open && "opacity-0"}`}
      centered
    >
      <Modal.Header
        className={"prebook-modal-header"}
        onHide={() => {
          isPurchased && onReload();
          onHide();
          toggleModal();
        }}
        closeButton
        closeVariant={"white"}
      >
        <span className="fs-6">{`${
          modalState?.loot_status === LOOT_STATUS.DROP ? "BUY" : "PRE-BOOK"
        }  ${name}`}</span>
      </Modal.Header>
      <Modal.Body className="prebook-modal-body">
        {isPurchased ? (
          <div className="purchase-success">
            {/* <MdCheckCircle
              fill="green"
              style={{ width: "4rem", height: "4rem", fill: "#00A506" }}
            /> */}
            <Lottie
              animationData={successAnim}
              loop={false}
              className="lotti-icon"
            />
            <p className="text-dark fs-6 text-center">{`${
              modalState?.loot_status === LOOT_STATUS.DROP
                ? "Purchase"
                : "Pre-Book"
            } Successful!`}</p>
            <button
              className={`theme-btn mb-2 mt-1 w-100`}
              onClick={() => {
                let url =
                  modalState?.loot_status === LOOT_STATUS.DROP
                    ? "/accounts/mynft?game_name=raddx"
                    : "/accounts/pre-orders";
                window.open(
                  `${process.env.REACT_APP_ACCOUNTS_URL}${url}`,
                  "_self"
                );
                onReload();
                toggleModal();
              }}
            >
              {modalState?.loot_status === LOOT_STATUS.DROP
                ? "View My NFTs"
                : "View Order Summary"}
            </button>
          </div>
        ) : (
          <>
            <div className="d-flex flex-column text-dark preorder-popup-top">
              <div className={`input-block-row valign-top`}>
                <div className="input-block">
                  <h6 className="m-0">Current GL Balance</h6>
                  <a
                    onClick={refreshBalance}
                    className={`link link-blue ${
                      loading ? "link-disabled" : ""
                    }`.trim()}
                  >
                    {!loading ? "Refresh Bal." : "Refreshing..."}
                  </a>
                </div>
                <p className="m-0 fw-bold">
                  {currencyFormat(roundDown(user_balance) || 0, "USD")}
                </p>
              </div>
              {allowedAssets?.reward_point && (
                <div className="input-block-row">
                  <div className={`input-block-row mb-0`}>
                    <input
                      id="reward_point_checkbox"
                      type="checkbox"
                      name="reward_point"
                      disabled={!isMinRewardAvailable}
                      checked={isRewardsEnabled}
                      onChange={handleAssetSelect}
                    ></input>{" "}
                    &nbsp;
                    <label
                      className={`asset-label m-0`}
                      htmlFor="reward_point_checkbox"
                    >
                      {allowedAssets?.reward_point?.display_name}
                    </label>
                  </div>
                  <p>
                    ${convertPointsToUSD(reward_point_balance, "reward_point")}
                  </p>
                </div>
              )}
              {allowedAssets?.jump_point && (
                <div className="input-block-row">
                  <div className={`input-block-row mb-0`}>
                    <input
                      id="jump_point_checkbox"
                      type="checkbox"
                      name="jump_point"
                      disabled={!isMinJTAvailable}
                      checked={isJTEnabled}
                      onChange={handleAssetSelect}
                    ></input>{" "}
                    &nbsp;
                    <label
                      className={`asset-label m-0`}
                      htmlFor="jump_point_checkbox"
                    >
                      {allowedAssets?.jump_point?.display_name} (
                      {`${jump_point_balance} JT`})
                    </label>
                  </div>
                  <p>${convertPointsToUSD(jump_point_balance)}</p>
                </div>
              )}
              <hr />
              <div className="input-block-row">
                <h6>
                  Quantity
                  {/* <ToolTip
                    icon={
                      <BsFillInfoCircleFill
                        color={"#ea337f"}
                        size={14}
                        className="mb-1 mx-1 check-icon"
                      />
                    }
                    content={`Max Qty allowed per order: ${modalState?.loot?.qty_per_order}`}
                    placement="right"
                  /> */}
                  {/* <SharePopover
                    icon={
                      <BsFillQuestionCircleFill size={14} color={"#ea337f"} />
                    }
                    placement="top"
                    // title="Jump.trade Loot Box!"
                  /> */}
                </h6>
                {parseInt(
                  modalState?.loot?.qty_per_user -
                    modalState?.loot?.purchased_qty
                ) === 1 ? (
                  "1"
                ) : (
                  <input
                    className="quantity-counter"
                    value={nftQuantity}
                    onChange={(e) => {
                      let quantity = parseInt(
                        e?.target?.value ? e?.target?.value : 0
                      );
                      if (
                        !isNaN(quantity) &&
                        quantity <=
                          modalState?.loot?.qty_per_user -
                            modalState?.loot?.purchased_qty
                        // quantity <= modalState?.loot?.qty_per_order
                      )
                        setNftQuantity(quantity);
                      // else setNftQuantity(quantity);
                    }}
                  ></input>
                )}
              </div>
              <div className="input-block-row">
                <span>
                  (
                  {`Eligible: ${modalState?.loot?.qty_per_user}, Purchased: ${modalState?.loot?.purchased_qty}`}
                  )
                </span>
              </div>
              {nftQuantity !== 0 ? (
                <>
                  <div
                    className={`input-block-row ${
                      priceLoading ? "blur-loaderr" : ""
                    }`.trim()}
                  >
                    <h6>
                      {" "}
                      Sub Total
                      <ToolTip
                        icon={
                          <BsFillQuestionCircleFill
                            color={"#ea337f"}
                            size={14}
                            className="mb-1 mx-1 check-icon"
                          />
                        }
                        content={"Includes TDS and Service fee."}
                        placement="right"
                      />
                    </h6>
                    {nftPriceBreakUp?.total ? (
                      <p
                        className={`${priceLoading ? "blur-loader" : ""}`}
                      >{`$${
                        nftPriceBreakUp?.total +
                        (nftPriceBreakUp?.discount
                          ? nftPriceBreakUp?.discount
                          : 0)
                      }`}</p>
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              ) : (
                <></>
              )}
              {nftPriceBreakUp?.discount &&
              parseInt(nftPriceBreakUp?.discount) !== 0 ? (
                <>
                  <div
                    className={`input-block-row ${
                      priceLoading ? "blur-loaderr" : ""
                    }`.trim()}
                  >
                    <h6>
                      Discount
                      <ToolTip
                        icon={
                          <BsFillQuestionCircleFill
                            color={"#ea337f"}
                            size={14}
                            className="mb-1 mx-1 check-icon"
                          />
                        }
                        content={"$5 discount for every 5 Loot Box."}
                        placement="right"
                      />
                    </h6>
                    <p className={`${priceLoading ? "blur-loader" : ""}`}>
                      - ${parseInt(nftPriceBreakUp?.discount)}
                    </p>
                  </div>
                  {/* <div className="input-block-row">
                    <h6>Sub Total</h6>
                    <p>- ${parseInt(nftPriceBreakUp?.total)}</p>
                  </div> */}
                </>
              ) : (
                <></>
              )}

              {isRewardsEnabled && nftQuantity !== 0 && (
                <>
                  {/* <hr /> */}
                  <div
                    className={`input-block-row ${
                      priceLoading ? "blur-loaderr" : ""
                    }`.trim()}
                  >
                    <h6>
                      {`Used ${allowedAssets?.reward_point?.display_name} ${
                        parseFloat(used_reward_points) > 0.0
                          ? `(${used_reward_points})`
                          : ""
                      }`}{" "}
                    </h6>
                    {parseFloat(used_reward_points_in_usd) > 0.0 && (
                      <p
                        className={`${
                          priceLoading ? "blur-loaderr" : ""
                        }`.trim()}
                      >{`- $${used_reward_points_in_usd}`}</p>
                    )}
                  </div>
                </>
              )}
              {isJTEnabled && nftQuantity !== 0 && (
                <>
                  <div
                    className={`input-block-row ${
                      priceLoading ? "blur-loaderr" : ""
                    }`.trim()}
                  >
                    <h6>
                      {`Used ${allowedAssets?.jump_point?.display_name} (${
                        parseFloat(used_jt_points) > 0.0 ? used_jt_points : ""
                      })`}{" "}
                    </h6>
                    {parseFloat(used_jt_points_in_usd) > 0.0 && (
                      <p
                        className={`${
                          priceLoading ? "blur-loaderr" : ""
                        }`.trim()}
                      >{`- $${used_jt_points_in_usd}`}</p>
                    )}
                  </div>
                </>
              )}
              {!insufficient_balance && nftQuantity !== 0 && (
                <>
                  <hr />
                  <div
                    className={`input-block-row ${
                      priceLoading ? "blur-loaderr" : ""
                    }`.trim()}
                  >
                    <h6 className="m-0 fw-bold">Total Amount</h6>
                    <p
                      className={`m-0 fw-bold ${
                        priceLoading ? "blur-loader" : ""
                      }`}
                    >{`$${nftPriceBreakUp?.usd?.value || 0}`}</p>
                  </div>
                </>
              )}
              {insufficient_balance ? (
                <>
                  <div className={`input-block-row dashed-top-border`}>
                    <h6 className="m-0 fw-bold">
                      {`${
                        modalState?.loot_status === LOOT_STATUS.DROP
                          ? "Buy"
                          : "Pre-book"
                      } your NFT by adding`}
                      <br />
                      {amount_to_be_added < 1 ? (
                        <span className="text-danger">
                          (Add min. funds of $1)
                        </span>
                      ) : (
                        <></>
                      )}
                    </h6>
                    <p
                      className={`m-0 fw-bold ${
                        priceLoading ? "blur-loader" : ""
                      }`}
                    >
                      {currencyFormat(
                        amount_to_be_added >= 1 ? amount_to_be_added : 1,
                        "USD"
                      )}
                    </p>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="preorder-popup-bottom">
              {insufficient_balance ? (
                <div className={`input-block-row d-flex flex-column w-100 `}>
                  {/* <PaymentMethod
                    defaultAmount={
                      parseFloat(amount_to_be_added) >= 1
                        ? amount_to_be_added
                        : 1
                    }
                  /> */}
                  <PaymentList
                    className="drop-payment-list"
                    userBalance={user_balance}
                    amount={
                      parseFloat(amount_to_be_added) < 1.0
                        ? 1
                        : amount_to_be_added
                    }
                    defaultPaymentMethod={paymentMethod}
                    onHide={() => setPaymentMethod(null)}
                    openPaymentGateway={openPaymentGateway}
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentFailure={handlePaymentFailure}
                    popUpOpen={() => setOpen(true)}
                  ></PaymentList>
                  <PaymentOptions
                    show={paymentMethod}
                    amount={
                      parseFloat(amount_to_be_added) < 1.0
                        ? 1
                        : amount_to_be_added
                    }
                    // amount={10}
                    onHide={() => {
                      setPaymentMethod(null);
                      setOpen(false);
                    }}
                    openPaymentGateway={openPaymentGateway}
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentFailure={handlePaymentFailure}
                  />
                </div>
              ) : (
                <>
                  <div className={`button-block`}>
                    <button
                      onClick={handlePurchase}
                      disabled={
                        nftQuantity === 0 ||
                        totalPreorders === 0 ||
                        priceLoading
                      }
                      className="theme-btn"
                    >
                      {modalState?.loot_status === LOOT_STATUS.DROP
                        ? "BUY"
                        : "PRE-BOOK"}
                    </button>
                  </div>
                  {totalPreorders === 0 ? (
                    <p className="text-center">
                      Pre-Book limit reached. Only{" "}
                      {modalState?.loot?.qty_per_user} allowed per user.
                    </p>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default Prebook;
