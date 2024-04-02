import { Modal } from "react-bootstrap";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import {
  validateEmail,
  validateName,
  validateNameReplace,
} from "../../../utils/common";
import { userEnquiry } from "../../../api/base-methods";

import RangeSlider from "../../range-slider";
import InputText from "../../input-text";

import "./style.scss";
import "toolcool-range-slider/dist/plugins/tcrs-marks.min.js";
import "toolcool-range-slider";

const BrandEnquiryForm = () => {
  const [isShow, setInvokeModal] = useState(false);

  const [userEnquiryDetail, setUserEnquiryDetail] = useState({
    name: "",
    brand: "",
    designation: "",
    email: "",
    comments: "",
  });

  const [landCount, setLandCount] = useState(0);
  const [landCountValid, setLandCountValid] = useState(false);

  const [userEnquiryValidation, setUserEnquiryValidation] = useState({
    name: false,
    brand: false,
    designation: false,
    land_count: false,
    email: false,
    validEmail: false,
  });

  const handleChangeEvent = (e) => {
    if (e.target.value) {
      if (e.target.name === "name" || e.target.name === "designation") {
        if (validateName(e.target.value)) {
          setUserEnquiryDetail({
            ...userEnquiryDetail,
            [e.target.name]: validateNameReplace(e.target.value),
          });
          setUserEnquiryValidation({
            ...userEnquiryValidation,
            [e.target.name]: false,
          });
        }
      } else {
        setUserEnquiryDetail({
          ...userEnquiryDetail,
          [e.target.name]: e.target.value,
        });
        setUserEnquiryValidation({
          ...userEnquiryValidation,
          [e.target.name]: false,
        });
      }
    } else {
      setUserEnquiryDetail({
        ...userEnquiryDetail,
        [e.target.name]: e.target.value,
      });
      setUserEnquiryValidation({
        ...userEnquiryValidation,
        [e.target.name]: true,
      });
    }
  };

  const handleSlideDetails = (e) => {
    setLandCount(e.detail.value);
    setLandCountValid(false);
  };
  const checkFormValidation = () => {
    let formValidation = { ...userEnquiryValidation };
    let landValidation;
    if (!userEnquiryDetail.name) {
      formValidation = { ...formValidation, name: true };
    } else {
      formValidation = { ...formValidation, name: false };
    }
    if (!userEnquiryDetail.brand) {
      formValidation = { ...formValidation, brand: true };
    } else {
      formValidation = { ...formValidation, brand: false };
    }
    if (!userEnquiryDetail.designation) {
      formValidation = { ...formValidation, designation: true };
    } else {
      formValidation = { ...formValidation, designation: false };
    }

    if (!landCount) {
      landValidation = true;
    } else {
      if (landCount === "0") landValidation = true;
      else landValidation = false;
    }
    if (!userEnquiryDetail.email) {
      formValidation = { ...formValidation, email: true };
      formValidation = { ...formValidation, validEmail: false };
    } else {
      if (validateEmail(userEnquiryDetail.email)) {
        formValidation = { ...formValidation, validEmail: false };
      } else {
        formValidation = { ...formValidation, validEmail: true };
      }
    }

    setUserEnquiryValidation(formValidation);
    setLandCountValid(landValidation);
    if (
      !formValidation.brand &&
      !formValidation.name &&
      !formValidation.designation &&
      !formValidation.land_count &&
      !formValidation.email &&
      !formValidation.validEmail &&
      !landValidation
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmitForm = async () => {
    if (checkFormValidation()) {
      try {
        let user_enquiry = {
          user_enquiry: { ...userEnquiryDetail, land_count: landCount },
        };

        const result = await userEnquiry(user_enquiry);
        if (result.status === 200) {
          setInvokeModal(!isShow);
        }
      } catch (error) {
        toast.error("Something went wrong, please try again.");
      }
    }
  };

  return (
    <>
      <section className="brand-enquiry-section">
        <div className="bgImageSet"></div>
        <div className="brand-enquiry-form-block">
          <article className="brand-enquiry-form">
            <div className="brand-enquiry-form-header">
              <h5>BRAND DETAILS</h5>
            </div>
            <div className="brand-enquiry-form-body">
              <div className="brand-enquiry-input-block">
                <div className="input-block">
                  <InputText
                    onChange={handleChangeEvent}
                    required={userEnquiryValidation.brand}
                    value={userEnquiryDetail.brand}
                    title="Brand Name"
                    type="text"
                    name="brand"
                  />
                </div>
                <div className="input-block">
                  <InputText
                    onChange={handleChangeEvent}
                    required={userEnquiryValidation.name}
                    value={userEnquiryDetail.name}
                    title="Your Name"
                    type="text"
                    name="name"
                  />
                </div>

                <div className="input-block">
                  <InputText
                    onChange={handleChangeEvent}
                    required={userEnquiryValidation.designation}
                    value={userEnquiryDetail.designation}
                    title="Your Designation"
                    type="text"
                    name="designation"
                  />
                </div>
                <div className="input-block">
                  <InputText
                    onChange={handleChangeEvent}
                    required={userEnquiryValidation.email}
                    value={userEnquiryDetail.email}
                    title="Your email id"
                    type="email"
                    name="email"
                  />
                  {userEnquiryValidation.validEmail && (
                    <span className="err-text">Please enter a valid email</span>
                  )}
                </div>

                <div className="input-block">
                  <label>
                    No of land parcels the brand would like to book&nbsp;
                    {landCountValid && (
                      <small className="text-danger font-10">(Required)</small>
                    )}
                  </label>

                  <RangeSlider
                    className="range-slider-block"
                    markCount="11"
                    markValuesCount="11"
                    minValue="0"
                    maxValue="50"
                    round="0"
                    onChange={handleSlideDetails}
                    name="land_count"
                    marks
                    width="600px"
                    labels
                    mouseWheel
                    data="0, 5, 10, 15, 20, 25, 30, 35,40,45,50+"
                    markValue="5"
                  />
                </div>
                <div className="input-block">
                  <InputText
                    onChange={handleChangeEvent}
                    value={userEnquiryDetail.comments}
                    title="Comments (optional)"
                    type="text"
                    name="comments"
                  />
                </div>
                <div className="button-block">
                  <button
                    type="button"
                    className="brand-enquiry-btn"
                    onClick={handleSubmitForm}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <Modal
        size="md"
        show={isShow}
        contentClassName="brand-enquiry-thanks-modal"
        centered
      >
        <Modal.Header className="brand-enquiry-thanks-modal-header">
          <Modal.Title>DETAILS SUBMITTED</Modal.Title>
        </Modal.Header>
        <Modal.Body className="brand-enquiry-thanks-modal-body">
          <div className="content-top">
            <IoIosCheckmarkCircleOutline />

            <h4>THANKS FOR THE INFORMATION</h4>
          </div>
          <div className="content-bottom">
            <h6>FOR MORE DETAILS</h6>
            <a
              className="schedule-btn"
              onClick={() => {
                setInvokeModal(!isShow);
                setUserEnquiryDetail({
                  name: "",
                  brand: "",
                  designation: "",
                  land_count: "",
                  email: "",
                  comments: "",
                });
                window.open("https://calendly.com/raddxteam/30min", "_blank");
                setTimeout(window.location.reload(), 3000);
              }}
            >
              SCHEDULE A CALL
            </a>
            <span
              className="cancel-btn"
              onClick={() => {
                setInvokeModal(!isShow);
                setUserEnquiryDetail({
                  name: "",
                  brand: "",
                  designation: "",
                  land_count: "",
                  email: "",
                  comments: "",
                });

                window.location.reload();
              }}
            >
              Close
            </span>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BrandEnquiryForm;
