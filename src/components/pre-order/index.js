import React, { useState, useEffect } from "react";
import { Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { BiX } from "react-icons/bi";
import { preOrder, preOrderQuantity } from "../../api/base-methods";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  validateQuantity,
  validateNameReplace,
  currencyFormat,
} from "../../utils/common";
import preorderImage from "../../images/cric/img/ck-1.png";

import "./style.scss";

const PreOrder = () => {
  const { user } = useSelector((state) => state.user.data);
  const [loading, setLoading] = useState(false);
  const [viewDetailsModalShow, setViewDetailsModalShow] = useState(false);
  const [viewDetailsList, setviewDetailsList] = useState([]);
  const [availabl_qty, setAvailable] = useState();
  const [total_qty, setTotalQty] = useState("");
  const [profile, setProfile] = useState({
    quantity: "",
  });
  const [validation, setValidation] = useState({
    quantity: false,
  });

  const handleChangeEvent = (e) => {
    if (e.target.value) {
      if (e.target.name === "quantity") {
        if (
          validateQuantity(e.target.value) &&
          parseInt(e.target.value) < parseInt(viewDetailsList.qty_per_user)
        ) {
          setProfile({
            ...profile,
            [e.target.name]: validateNameReplace(e.target.value),
          });
          setValidation({ ...validation, [e.target.name]: false });
          setTotalQty(
            parseFloat(e.target.value) * parseFloat(viewDetailsList.buy_amount)
          );
        }
      } else {
        setProfile({ ...profile, [e.target.name]: e.target.value });
        setValidation({ ...validation, [e.target.name]: false });
      }
    } else {
      setProfile({ ...profile, [e.target.name]: e.target.value });
      setValidation({ ...validation, [e.target.name]: true });
    }
  };
  const checkValidation = () => {
    let c_validation = { ...validation };
    if (!profile.quantity) {
      c_validation = { ...c_validation, quantity: true };
    } else {
      if (validateQuantity(profile.quantity)) {
        c_validation = { ...c_validation, valid_quantity: false };
      } else {
        c_validation = { ...c_validation, valid_quantity: true };
      }
    }

    setValidation(c_validation);
    if (!c_validation.quantity && !c_validation.valid_quantity) {
      return true;
    } else {
      return false;
    }
  };
  const handlePreOrder = async () => {
    if (
      parseFloat(user?.balance) >= parseFloat(process.env.REACT_APP_NFT_PRICE)
    ) {
      if (user?.slug) {
        setLoading(true);
        try {
          setViewDetailsModalShow(true);

          setLoading(true);
          const result = await preOrder("pPOGYQ3GI0QjDo4l");

          setviewDetailsList(result.data.data.user);
          const available_qty =
            parseFloat(result.data.data.user.qty_per_user) -
            parseFloat(result.data.data.user.reserved_qty);
          setAvailable(available_qty);
          setLoading(false);
        } catch (error) {
        } finally {
          setLoading(false);
        }
        // };
      } else {
        window.open(
          `${
            process.env.REACT_APP_ACCOUNTS_URL
          }/signin?redirect=${window.location.href.replace(
            window.location.search,
            ""
          )}&fsz=${sessionStorage.getItem("fsz")}`,
          "_self"
        );
      }
    } else {
      window.open(
        `${process.env.REACT_APP_ACCOUNTS_URL}/accounts/wallet`,
        "_self"
      );
    }
  };

  const handleSubmit = async (input) => {
    if (checkValidation()) {
      try {
        setLoading(true);
        const result = await preOrderQuantity(input, profile.quantity);
        if (result.data.success) {
          toast.success("Reserved Nfts Successfully");
        }
        setProfile({ quantity: "" });
        setViewDetailsModalShow(false);

        setLoading(false);
      } catch (error) {
        setLoading(false);

        const message = error?.response?.data?.message;
        if (message === "Reserve start time Reserve time not yet started") {
          toast.error("Reserve time not yet started");
        }

        if (
          message === "Reserve end time Sorry reserve time competed already"
        ) {
          toast.error("Reserve time already ended");
        }

        if (
          message ===
          "Quantity Could not able to reserve nft, Please make sure you have sufficient account balance."
        ) {
          toast.error("Low Balance");
        }

        if (message === "Quantity User can not reserve more than 100") {
          toast.error("User buy quantity exceeded");
        }
      }
    } else {
      toast.error("Please Enter Quantity ");
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn waitlist preorder-btn"
        onClick={handlePreOrder}
      >
        {(() => {
          if (user?.slug) {
            if (
              parseFloat(user?.balance) >=
              parseFloat(process.env.REACT_APP_NFT_PRICE)
            ) {
              return "Pre Order";
            } else {
              return "Recharge your wallet to Pre Order";
            }
          } else {
            return "Sign in to Pre Order";
          }
        })()}
      </button>

      <Modal
        className="pre-order-popup"
        show={viewDetailsModalShow}
        size="md"
        onHide={() => {
          setViewDetailsModalShow(false);
        }}
        backdrop={"static"}
      >
        <Modal.Header closeButton>
          <Modal.Title>One Step Closer To Your NFTs</Modal.Title>
        </Modal.Header>
        <Modal.Body className="card-modal">
          <div className="treasure-move">
            {/* <ul>
              <li>
                <span className="key">Current Balance</span>{" "}
                <span className="value">
                  {" "}
                  {currencyFormat(user?.balance, "USD")}{" "}
                </span>
              </li>
              <li>
                <span className="key">Name</span>{" "}
                <span className="value"> {viewDetailsList.name} </span>
              </li>
              <li>
                <span className="key">Amount</span>{" "}
                <span className="value"> {viewDetailsList.buy_amount} </span>
              </li>
              <li>
                <span className="key">Qty Limit Per User</span>{" "}
                <span className="value"> {viewDetailsList.qty_per_user} </span>
              </li>
              <li>
                <span className="key">Reserved Qty </span>{" "}
                <span className="value"> {viewDetailsList.reserved_qty} </span>
              </li>
              <li>
                <span className="key">Available Qty </span>{" "}
                <span className="value"> {availabl_qty} </span>
              </li>
            </ul> */}

            <article className="preorder-card preorder-form ">
              <Form
                id="nft_form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                  return false;
                }}
              >
                <div className="img-content-block">
                  <div className="img-block">
                    <img src={preorderImage} />
                  </div>
                  <div className="base-detail">
                    <h5>
                      {viewDetailsList.name} <span>April 22, 2022</span>
                    </h5>
                    <h6 className="min-font">
                      ${viewDetailsList.buy_amount}/NFT
                    </h6>
                  </div>
                </div>

                <div className="preorder-info-block">
                  <div className="preorder-price-info">
                    <h6>Pre-Book Qty</h6>
                    <Form.Group className="formGroup mb-3">
                      <Form.Control
                        className="nft_form_quantity"
                        type="quantity"
                        disabled={loading}
                        name="quantity"
                        value={profile.quantity}
                        required={validation.quantity}
                        onChange={handleChangeEvent}
                      />
                    </Form.Group>
                  </div>
                  {/* <div className="preorder-price-info">
                    <h6 className="min-font">
                      Total Pre Order Ampont:
                      <span>${viewDetailsList.buy_amount}</span>
                    </h6>
                  </div> */}
                  <div className="preorder-price-info">
                    <h6 className="min-font">
                      Total Pre Order Amount:
                      <span>
                        {currencyFormat(total_qty ? total_qty : "0", "USD")}
                      </span>
                    </h6>
                  </div>
                </div>
                <div className="auction-flex">
                  <span class="btn-grp">
                    <button
                      disabled={loading}
                      type="button"
                      onClick={() => handleSubmit(viewDetailsList.slug)}
                    >
                      {loading ? "Loading..." : "Confirm Pre Order"}
                    </button>
                  </span>

                  <p className="terms">
                    By clicking Confirm Order, you agree to all{" "}
                    <a href="javascript:void(0);">Terms &amp; Conditions</a>
                  </p>
                </div>
              </Form>
            </article>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PreOrder;
