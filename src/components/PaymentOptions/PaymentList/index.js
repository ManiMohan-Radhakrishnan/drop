import { useState } from "react";
import { Modal } from "react-bootstrap";
import { BiCheck } from "react-icons/bi";

import { currencyFormat } from "../../../utils/common";
import { PAYMENT_METHODS, PAYMENT_OPTS } from "../config";

import "./style.scss";

const PaymentList = ({
  className = "",
  amount = 0,
  userBalance = 0,
  defaultPaymentMethod = null,
  onHide = () => {},
  openPaymentGateway = () => {},
  onPaymentSuccess = () => {},
  popUpOpen = () => {},
  ...props
}) => {
  const [paymentMethod, setPaymentMethod] = useState(
    defaultPaymentMethod || "OFFLINEUPI"
  );
  let curr_payment_info = PAYMENT_METHODS[paymentMethod] || {};
  let { min_amount = 0, limit_text = null } = curr_payment_info;

  const handlePaymentSelect = (payment_method = "") => {
    setPaymentMethod(
      paymentMethod !== PAYMENT_OPTS[payment_method]
        ? PAYMENT_OPTS[payment_method]
        : ""
    );
  };

  const handlePay = () => {
    openPaymentGateway(paymentMethod);
    popUpOpen();
  };

  return (
    <div className={`"payment-list" ${className ? className : ""}`.trim()}>
      <div className={"prefered-block"}>
        <h4 className={"block-title"}>Choose a Payment Method</h4>
        {Object.entries(PAYMENT_METHODS).map(([payment_method, payment]) => (
          <div
            key={`method-${payment_method}`}
            onClick={() => handlePaymentSelect(payment_method)}
            className={`${"payment-option"} ${
              paymentMethod === PAYMENT_OPTS[payment_method] ? "active" : ""
            }`.trim()}
          >
            <div className={`${"checkbox"}`}>
              <input
                name="checkbox-group"
                checked={paymentMethod === PAYMENT_OPTS[payment_method]}
                type="checkbox"
              />
              <span className={"checkbox__mark"}>
                <BiCheck />
              </span>
            </div>
            <h6 className="m-0 currency-title">{payment?.title}</h6>
            <img
              src={payment?.image}
              alt="Payment Icon"
              width={62}
              height={30}
            />
          </div>
        ))}
      </div>
      {limit_text ? <p className={"limit-text"}>{limit_text}</p> : <></>}
      {amount > 0 && (
        <div className={"button-block"}>
          <div className={`${"current-balance-block"}`}>
            <h5>Balance</h5>
            <p>${userBalance <= 0 ? 0 : userBalance}</p>
          </div>
          <button
            className={`btn btn-dark text-center btn-lg w-75 rounded-pill pay-btn ${"pay-btn"}`}
            onClick={handlePay}
            disabled={!paymentMethod}
          >
            {`Pay ${currencyFormat(
              amount > min_amount ? amount : min_amount,
              "USD"
            )}`}
          </button>
        </div>
      )}
    </div>
  );
};

export const PaymentListModal = ({
  show,
  amount = 0,
  onHide = () => {},
  openPaymentGateway = () => {},
  onPaymentSuccess = () => {},
  ...props
}) => {
  return (
    <Modal
      show={show === PAYMENT_OPTS.LIST}
      animation={false}
      contentClassName={`${"payment-modal"}`}
      backdrop="static"
      centered
    >
      <Modal.Header
        className={"payment-modal-header"}
        onHide={onHide}
        closeVariant="white"
        closeButton
      >
        <span className="fs-6">Payment Options</span>
      </Modal.Header>
      <Modal.Body className={"payment-modal-body"}>
        <PaymentList
          show={show}
          amount={amount}
          openPaymentGateway={openPaymentGateway}
          onPaymentSuccess={onPaymentSuccess}
          {...props}
        />
      </Modal.Body>
    </Modal>
  );
};

export default PaymentList;
