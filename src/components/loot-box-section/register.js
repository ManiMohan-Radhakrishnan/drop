import { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

//import { isUserLoggedIn } from "../../redux/reducers/user_reducer";
import {
  validateEmail,
  validateName,
  validatePassword,
  validInternationalPhone,
} from "../../utils/common";
import { getCookies, getSourceCookies } from "../../utils/cookies";
import { MODAL_TYPES } from "./common";
import { registerApi } from "../../api/base-methods";
import InputText from "../input-text";
import InputPhone from "../input-phone";
import "./style.scss";
import useQuery from "../../hook/useQuery";
import GoogleLogin from "../social-login/google-login";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = ({
  show = false,
  toggleModal = () => {},
  modalState = {},
}) => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const query = useQuery();
  const router = useHistory();
  //const referralCodeId = useId();
  const fsz = query?.get("fsz");
  const loginStatus = user?.login;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [country, setCountry] = useState("");
  const [captcha, setCaptcha] = useState(false);
  const [password, setPassword] = useState(true);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  // const [referralError, setReferralError] = useState("");
  const [registerInfo, setRegisterInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_no: "",
    phone_code: "",
    accepted_terms_and_condition: true,
    // coupon: "",
    // invite_code: "",
  });
  const common_source = "raddx";

  useEffect(() => {
    // getLocationDetails();
    // const ReactPixel = import("react-facebook-pixel");
    // if (process.env.NEXimport useQuery from '../../hook/useQuery';
    // T_PUBLIC_MARKETING_SCRIPT === "enabled") {
    //   ReactPixel.init(process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID);
    //   ReactPixel.pageView();
    //   ReactPixel.track("Lead");
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (getCookiesByName("referralcode")) {
  //     setChecked(true);
  //     setRegisterInfo({
  //       ...registerInfo,
  //       invite_code: getCookiesByName("referralcode"),
  //     });
  //   }
  // }, []);

  const [validation, setValidation] = useState({
    first_name: false,
    valid_first_name: false,
    last_name: false,
    valid_last_name: false,
    email: false,
    valid_email: false,
    password: false,
    valid_password: false,
    phone_no: false,
    valid_phone_no: false,
    captcha: false,
    accepted_terms_and_condition: false,
    // coupon: false,
    // valid_coupon: false,
    // invite_code: false,
    // valid_invite_code: false,
  });

  const validateInputs = () => {
    let validatedInputs = { ...validation };

    validatedInputs = {
      ...validatedInputs,
      first_name:
        !validateName(registerInfo.first_name) && !!registerInfo?.first_name,
      valid_first_name: !registerInfo?.first_name,
      last_name:
        !validateName(registerInfo.last_name) && !!registerInfo?.last_name,
      valid_last_name: !registerInfo?.last_name,
      email: !validateEmail(registerInfo.email) && !!registerInfo?.email,
      valid_email: !registerInfo?.email,
      password:
        !validatePassword(registerInfo.password) && !!registerInfo?.password,
      valid_password: !registerInfo?.password,
      phone_no:
        !validInternationalPhone(
          registerInfo.phone_no,
          registerInfo.phone_code
        ) && !!registerInfo?.phone_no,
      valid_phone_no: !registerInfo?.phone_no,
      accepted_terms_and_condition: !registerInfo.accepted_terms_and_condition,
      captcha: process.env.REACT_APP_ENVIRONMENT === "local" ? false : !captcha,
    };

    setValidation(validatedInputs);

    if (
      !validatedInputs.first_name &&
      !validatedInputs.valid_first_name &&
      !validatedInputs.last_name &&
      !validatedInputs.valid_last_name &&
      !validatedInputs.email &&
      !validatedInputs.valid_email &&
      !validatedInputs.password &&
      !validatedInputs.valid_password &&
      !validatedInputs.phone_no &&
      !validatedInputs.valid_phone_no &&
      !validatedInputs.accepted_terms_and_condition &&
      !validatedInputs.captcha
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleChange = (e, stateKey) => {
    if (stateKey === "captcha") {
      setCaptcha(e);
      setValidation({
        ...validation,
        [stateKey]: false,
      });
      return;
    }
    setRegisterInfo({ ...registerInfo, [stateKey]: e?.target?.value });
    setValidation({
      ...validation,
      [stateKey]: false,
      [`valid_${stateKey}`]: !e?.target?.value,
    });
  };

  const handleSignUp = async () => {
    if (validateInputs()) {
      try {
        setLoading(true);
        let apiInput = { ...registerInfo };
        // if (!checked) apiInput = { ...registerInfo, invite_code: null };
        if (fsz) apiInput = { ...registerInfo, fsz, source: common_source };
        else {
          const c_source = getSourceCookies();
          if (c_source && c_source !== undefined && c_source !== "undefined") {
            apiInput = {
              ...registerInfo,
              fsz: c_source,
              source: common_source,
            };
          } else {
            apiInput = { ...registerInfo, fsz: null, source: common_source };
          }
        }
        const result = await registerApi(apiInput);

        if (result.status === 201) {
          setRegisterSuccess(true);

          // setCookiesInviteCode(apiInput.invite_code);
          // XENA Marketing Registration Endpoint
          // if (getCookies("aid")) {
          //   const response = await xena({
          //     code: 10033,
          //     uid: result?.data?.data?.user_id,
          //     aid: getCookies("aid"),
          //     campaign: getCookies("campaign"),
          //     source: getCookies("source"),
          //     vid: getCookies("vid"),
          //     click_id: getCookies("click_id"),
          //     event_name: "registration",
          //   });

          //   response.status === 200 && setRegisterSuccess(true);
          // } else {
          //   setRegisterSuccess(true);
          // }
        }
      } catch (err) {
        setLoading(false);
        console.log("errrrr", err?.response);
        if (err?.response.status === 422) {
          if (err?.response.data?.error_code === 0) {
            // if (registerInfo.email) {
            //   toggleModal(MODAL_TYPES.LOGIN_WITH_PASSWORD, {
            //     email: registerInfo.email,
            //   });
            // } else {
            setError(
              "This Email is already associated with a GuardianLink ID. Please Login or use a different email to Register."
            );
          }
          // if (err?.response?.data?.error_code === 2) {
          //   setReferralError("You have entered an invaild invite code");
          // }
          if (err?.response?.data?.error_code === 3)
            setPhoneNumberError("Phone number has already been taken");
        } else {
          toast.error("An unexpected error occured. Please try again ");
          console.log(
            "🚀 ~ file: index.js ~ line 106 ~ handleSignUp ~ err",
            err
          );
        }
      }

      setLoading(false);
    }
  };

  // const getLocationDetails = async () => {
  //   try {
  //     const result = await trackIP();
  //     const ip_code = result.data?.country_code;
  //     if (ip_code) setCountry(ip_code.toLowerCase());
  //   } catch (error) {
  //     console.log(
  //       "🚀 ~ file: index.js ~ line 70 ~ getLocationDetails ~ error",
  //       error
  //     );
  //   }
  // };

  return (
    <Modal
      show={show}
      animation={false}
      contentClassName="register-modal"
      className="register-modal-main"
      centered
    >
      <Modal.Header
        className="
        register-modal-header"
        onHide={toggleModal}
        closeButton
        closeVariant="white"
      >
        <span className="fs-6">Sign Up</span>
      </Modal.Header>
      <Modal.Body className="register-modal-body">
        {registerSuccess ? (
          <div className="form-cntnt-box text-dark">
            <h4>Welcome to Jump.trade! </h4>
            <p>
              {`You're just a step away from accessing a world of unique NFTs!`}
            </p>

            {/* <p className="mb-4">
              Please{" "}
              <a
                href="#"
                className="link link-blue"
                onClick={() =>
                  toggleModal(MODAL_TYPES.LOGIN_WITH_PASSWORD, {
                    email: registerInfo.email,
                  })
                }
              >
                {" "}
                login{" "}
              </a>{" "}
              to continue{" "}
            </p> */}
          </div>
        ) : (
          <>
            <h6 className="text-dark text-center register-title">
              You are one step away from Joining our Meta world!
            </h6>
            <div className="input-block">
              <InputText
                title={"First Name"}
                name="first_name"
                value={registerInfo.first_name}
                onChange={(e) => handleChange(e, "first_name")}
                // error={validation.first_name}
                // errorMessage={"Please enter a valid first name"}
                required={validation.valid_first_name}
              />
              {validation?.first_name && (
                <p className="text-danger">Please enter a valid first name</p>
              )}
            </div>
            <div className="input-block">
              <InputText
                title={"Last Name"}
                name="last_name"
                value={registerInfo.last_name}
                onChange={(e) => handleChange(e, "last_name")}
                // error={validation.last_name}
                // errorMessage={"Please enter a valid last name"}
                required={validation.valid_last_name}
              />
              {validation?.last_name && (
                <p className="text-danger">Please enter a valid last name</p>
              )}
            </div>
            <div className="input-block">
              <InputText
                title="Email Address"
                type="email"
                value={registerInfo.email}
                onChange={(e) => handleChange(e, "email")}
                error={validation?.email}
                errorMessage={"Please enter a valid email address"}
                required={validation.valid_email}
              />
              {validation?.email && (
                <p className="text-danger">
                  Please enter a valid email address
                </p>
              )}
            </div>
            <div className="input-block">
              <div className="password-input">
                <InputText
                  title="Password"
                  type={password ? "password" : "text"}
                  value={registerInfo.password}
                  onChange={(e) => handleChange(e, "password")}
                  error={validation?.password}
                  errorMessage={
                    "Your password does not comply with our password policy."
                  }
                  required={validation.valid_password}
                  isPop
                  popText="Your password should have a minimum of 6 characters, and should
              include an uppercase letter and a number."
                />
                {!password ? (
                  <FaEyeSlash
                    role="button"
                    onClick={() => setPassword(!password)}
                    className="eye"
                  />
                ) : (
                  <FaEye
                    className="eye"
                    role="button"
                    onClick={() => setPassword(!password)}
                  />
                )}
              </div>
              {validation?.password && (
                <p className="text-danger">
                  {" "}
                  Your password does not comply with our password policy.
                </p>
              )}
            </div>
            <div className="input-block">
              <InputPhone
                title={"Mobile"}
                defaultCountry={country || "in"}
                value={registerInfo.phone_no}
                required={validation.valid_phone_no}
                onEnterKeyPress={handleSignUp}
                onChange={(e, c_code) => {
                  setRegisterInfo({
                    ...registerInfo,
                    phone_no: e,
                    phone_code: c_code?.countryCode?.toUpperCase(),
                  });
                  setPhoneNumberError("");
                  setValidation({ ...validation, phone_no: !e });
                }}
              />
              {validation.phone_no && (
                <p className="error-text">Please enter a valid mobile number</p>
              )}
              {phoneNumberError && (
                <p className="error-text">{phoneNumberError}</p>
              )}
            </div>
            {/* <div className="input-block-row">
              <input
                id={referralCodeId}
                type="checkbox"
                role={"button"}
                checked={checked}
                onChange={() => setChecked(!checked)}
              />{" "}
              <label className="input-title" htmlFor={referralCodeId}>
                I have a Referral Code{" "}
              </label>
            </div> */}
            {/* {checked && (
              <div className="input-block">
                <InputText
                  title={"Referral Code"}
                  type="text"
                  value={registerInfo?.invite_code}
                  required={validation.invite_code}
                  onChange={(e) => {
                    setRegisterInfo({
                      ...registerInfo,
                      invite_code: e.target.value,
                    });
                    if (e) {
                      setValidation({ ...validation, invite_code: false });
                    } else {
                      setValidation({ ...validation, invite_code: true });
                    }
                  }}
                />
                {validation.valid_invite_code && (
                  <p className="error-text">
                    Please enter a valid Referral Code
                  </p>
                )}
                {referralError && (
                  <p className="error-text">{referralError}</p>
                )}
              </div>
            )} */}
            <div className="input-block">
              <ReCAPTCHA
                className="recaptcha_box"
                sitekey={process.env.REACT_APP_CAPTCHA_KEY}
                onChange={(value) => handleChange(value, "captcha")}
              />
              {validation.captcha && (
                <p className="error-text">
                  Please verify the CAPTCHA to proceed
                </p>
              )}
            </div>
            <p className="my-2 agree-hint">
              <span className="text-dark">
                {`By Proceeding Further & Clicking on 'Submit' You Agree to
                    Jump.trade's `}
                <a
                  className="link link-blue forgot-password"
                  target="_blank"
                  href={`${process.env.REACT_APP_MARKETPLACE_URL}/terms-and-conditions`}
                  rel="noreferrer"
                >
                  Terms & Conditions.
                </a>
              </span>
            </p>
            {error && (
              <div className="input-block">
                <p className="error-text  mt-2">{error}</p>
              </div>
            )}
            <div className="button-block">
              <button
                disabled={loading}
                type="button"
                className="bl_btn"
                onClick={handleSignUp}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>

            <div className="social-login-block">
              <h5 className="social_OR">or</h5>
              <p className="login-with-heading">Sign In with</p>
              <div className="social-login-btn-block">
                <GoogleLogin closePopUP={toggleModal} />
                {/* <FacebookLogin /> */}
              </div>
            </div>
            {/* <p className="text-dark text-center agree-hint">
              <span>Already have a GuardianLink ID ? </span>
              <a
                className="link link-blue"
                onClick={() => toggleModal(MODAL_TYPES.LOGIN_WITH_PASSWORD)}
              >
                Sign In
              </a>
            </p> */}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default Register;
