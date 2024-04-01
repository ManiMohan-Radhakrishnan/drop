import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";

import { getCookies } from "../../utils/cookies";
import {
  user_login_thunk,
  user_logout_thunk,
} from "../../redux/thunk/user_thunk";
import { loginReset } from "../../redux/reducers/user_reducer";
import { validateEmail } from "../../utils/common";
import { LoginErrorInfo, LoginOptionTabs, MODAL_TYPES } from "./common";
import InputText from "../input-text";

import "./style.scss";
import GoogleLogin from "../social-login/google-login";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginWithPassword = ({
  show = false,
  toggleModal = () => {},
  modalState = {},
}) => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const loginStatus = user?.login;
  const loading = useSelector((state) => state?.loading);
  const [loginInfo, setLoginInfo] = useState({
    email: modalState?.email || "",
    password: "",
  });
  const [captcha, setCaptcha] = useState(false);
  // const [key, setKey] = useState(false);
  const [validation, setValidation] = useState({
    email: false,
    email_empty: false,
    password: false,
    password_empty: false,
    captcha: false,
  });
  const [loginError, setLoginError] = useState(null);
  const [password, setPassword] = useState(true);

  const validateInputs = () => {
    let validatedInputs = { ...validation };
    if (!captcha && process.env.REACT_APP_ENVIRONMENT !== "local")
      validatedInputs = { ...validatedInputs, captcha: true };
    if (!validateEmail(loginInfo?.email))
      validatedInputs = {
        ...validatedInputs,
        email: true && !!loginInfo?.email,
        email_empty: !loginInfo?.email,
      };
    if (loginInfo?.password?.length < 6)
      validatedInputs = {
        ...validatedInputs,
        password: true && !!loginInfo?.password,
        password_empty: !loginInfo?.password,
      };
    setValidation(validatedInputs);

    if (
      !validatedInputs.email &&
      !validatedInputs.email_empty &&
      !validatedInputs.password &&
      !validatedInputs.password_empty &&
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
    setLoginInfo({ ...loginInfo, [stateKey]: e?.target?.value });
    setValidation({
      ...validation,
      [stateKey]: false,
      [`${stateKey}_empty`]: !e?.target?.value,
    });
  };

  const handleLogin = () => {
    if (validateInputs()) {
      dispatch(
        user_login_thunk({ data: loginInfo, callback: dispatchCallback })
      );
    }
  };

  const dispatchCallback = (result) => {
    let modalType = result?.googleOtp
      ? MODAL_TYPES.VERIFY_GOOGLE_OTP
      : result.otp
      ? MODAL_TYPES.VERIFY_OTP
      : null;
    result?.message && setLoginError(result?.message);

    // result?.key && setKey(result?.key);
    if (result?.status === 200) {
      modalType
        ? toggleModal(modalType, { email: loginInfo?.email, key: result?.key })
        : toggleModal();
    } else if (result?.status === 422 && modalType) {
      toggleModal(modalType, { email: loginInfo?.email, key: result?.key });
    }
  };

  useEffect(() => {
    if (!(loginStatus && getCookies())) {
      //dispatch(loginReset());
      dispatch(user_logout_thunk());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      show={show}
      animation={false}
      contentClassName="login-modal login-modal"
      className="login-modal-main"
      centered
    >
      <Modal.Header
        className="login-modal-header"
        onHide={toggleModal}
        closeButton
        closeVariant="white"
      >
        <span className="fs-6">Sign In</span>
      </Modal.Header>
      <Modal.Body className="login-modal-body">
        <LoginOptionTabs
          activeTab={MODAL_TYPES.LOGIN_WITH_PASSWORD}
          onClick={toggleModal}
        />
        <div className="input-block">
          <InputText
            title="Email Address"
            type="email"
            value={loginInfo.email}
            onChange={(e) => handleChange(e, "email")}
            error={validation?.email}
            errorMessage={"Please enter a valid email address"}
            required={validation.email_empty}
          />
          {validation?.email && (
            <p className="text-danger">Please enter a valid email address</p>
          )}
        </div>

        <div className="input-block">
          <div className="password-input">
            <InputText
              title="Password"
              type={password ? "password" : "text"}
              value={loginInfo.password}
              onChange={(e) => handleChange(e, "password")}
              error={validation?.password}
              errorMessage={"Password not long enough"}
              required={validation.password_empty}
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
            <p className="text-danger">Password not long enough</p>
          )}
          <p
            className="link link-blue forgot-password"
            onClick={() => toggleModal(MODAL_TYPES.FORGOT_PASSWORD)}
          >
            Forgot Password
          </p>
        </div>
        <div className="input-block">
          <ReCAPTCHA
            className="recaptcha_box"
            sitekey={process.env.REACT_APP_CAPTCHA_KEY}
            onChange={(e) => handleChange(e, "captcha")}
          />
          {validation?.captcha && (
            <p className="text-danger">Please verify the CAPTCHA to proceed</p>
          )}
        </div>
        <div className="input-block">
          <p className="text-dark text-center agree-hint">
            {`By Proceeding Further & Clicking on 'Sign In' You Agree to
            Jump.trade's`}{" "}
            <a
              target="_blank"
              onClick={() =>
                window.open(
                  `${process.env.REACT_APP_MARKETPLACE_URL}/terms-and-conditions`
                )
              }
              className="link link-blue"
            >{`Terms & Conditions.`}</a>
          </p>
        </div>
        <div className="button-block">
          <button
            type="button"
            className="login-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </div>
        {loginError && <LoginErrorInfo error={loginError} />}

        <div className="social-login-block">
          <h5 className="social_OR">or</h5>
          <p className="login-with-heading">Sign In with</p>
          <div className="social-login-btn-block">
            <GoogleLogin closePopUP={toggleModal} />
            {/* <FacebookLogin /> */}
          </div>
        </div>
        <p className="text-center agree-hint">
          <span className="text-dark">{`Don't have an account ?`}</span>
          <span
            className="link link-blue"
            onClick={() => toggleModal(MODAL_TYPES.REGISTER)}
          >
            &nbsp;Sign Up
          </span>
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default LoginWithPassword;
