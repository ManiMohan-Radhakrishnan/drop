import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import { user_load_by_token_thunk } from "../../redux/thunk/user_thunk";
import { LoginOptionTabs, MODAL_TYPES } from "./common";
import InputOTP from "../input-otp";

import "./style.scss";
import { LoginWithOtp, resendOtpApi } from "../../api/base-methods";
import { setCookies } from "../../utils/cookies";
import { useHistory } from "react-router-dom";
import useQuery from "../../hook/useQuery";

const VerifyOtp = ({
  show = false,
  toggleModal = () => {},
  modalState = {},
}) => {
  const dispatch = useDispatch();
  const router = useHistory();
  const [otpValue, setOtpValue] = useState("");
  const [error, setError] = useState(null);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [navigate, setNavigate] = useState(false);
  const [resendOTP, setResendOTP] = useState(false);
  const [reLoading, setReLoading] = useState(false);
  const [countDown, setCountDown] = useState(60);
  const [runTimer, setRunTimer] = useState(true);
  const query = useQuery();
  const withOtp = query?.get("with");

  let seconds = countDown ? String(countDown % 60).padStart(2, 0) : null;
  let minutes = countDown
    ? String(Math.floor(countDown / 60)).padStart(2, 0)
    : null;

  const handleChangeEmail = () => {
    toggleModal(MODAL_TYPES.LOGIN_WITH_OTP);
  };

  const handleVerifyOTP = async () => {
    ///console.log(otpValue, "otpValue");
    setError(null);
    if (otpValue.length === 6) {
      try {
        setVerifyLoading(true);
        const result = await LoginWithOtp({
          email: modalState?.email,
          otp: otpValue,
        });
        setVerifyLoading(false);
        handleLogin(result);
      } catch (error) {
        setVerifyLoading(false);
        setError(
          "It seems you have entered the wrong code. Please check the number(s) you have entered."
        );
      }
    } else {
      setError("Please enter the full OTP received through your email.");
    }
  };

  const handleResendOTP = async () => {
    if (modalState?.email) {
      try {
        setReLoading(true);
        await resendOtpApi(modalState?.email, true);
        setReLoading(false);
        toast.success(
          "Your confirmation email has been sent to your registered email address"
        );
        setResendOTP(false);
        setRunTimer(true);
      } catch (error) {
        setReLoading(false);
        if (error?.data?.message === "email otp locked") {
          toast.error(
            "Account locked for security reasons, please login again after 10 mins"
          );
          setOtpValue("");
          setError(null);
          toggleModal("", {});
        } else {
          toast.error(error?.data?.message);
        }
      }
    }
  };

  const handleLogin = (result) => {
    result?.message && setError(result?.message);
    if (result?.data?.status === 200) {
      if (result?.data?.data?.gauth) {
        toggleModal(MODAL_TYPES.VERIFY_GOOGLE_OTP, {
          type: "OTP",
          email: modalState?.email,
          key: result?.data?.data?.secret_key,
        });
      } else {
        setCookies(result?.data?.data?.token);
        setNavigate(true);
        dispatch(user_load_by_token_thunk(result.data.data.token));
        toggleModal();
      }
    }
  };

  useEffect(() => {
    let timerId;
    if (runTimer) {
      setCountDown(60 * 1);

      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
      setResendOTP(true);
    }

    return () => clearInterval(timerId);
  }, [runTimer]);

  useEffect(() => {
    if (countDown < 0 && runTimer) {
      setRunTimer(false);
      setCountDown(0);
    }
  }, [countDown, runTimer]);

  return (
    <Modal
      show={show}
      animation={false}
      contentClassName="verify-otp-modal"
      centered
    >
      <Modal.Header
        className="verify-otp-modal-header"
        onHide={toggleModal}
        closeButton
        closeVariant="white"
      >
        <span className="fs-6">Verify OTP</span>
      </Modal.Header>
      <Modal.Body className="verify-otp-modal-body">
        <LoginOptionTabs
          activeTab={modalState?.modalType || MODAL_TYPES.LOGIN_WITH_PASSWORD}
          onClick={!withOtp && toggleModal}
        />
        {modalState?.email && (
          <div className="input-block-row">
            <div className="input-block">
              <p className="mb-0 text-dark">{`Please enter the OTP sent to`}</p>
              <h5 className="text-dark">{modalState?.email}</h5>
            </div>
            {!withOtp && (
              <a
                className="link link-blue ms-auto"
                onClick={() => handleChangeEmail()}
              >
                Change
              </a>
            )}
          </div>
        )}
        <div className="input-block">
          <InputOTP
            onChange={(e) => {
              setOtpValue(e);
            }}
            value={otpValue}
          />
        </div>
        <div className="input-block">
          <p className="text-dark mt-2 agree-hint">
            {`By Proceeding Further & Clicking on 'Continue' You Agree to
            Jump.trade's`}{" "}
            <a
              target="_blank"
              onClick={() =>
                window.open(
                  `${process.env.REACT_APP_MARKETPLACE_URL}/terms-and-conditions`
                )
              }
              className="link link-blue"
            >{`Terms & Conditions`}</a>
          </p>
        </div>
        <div className="button-block">
          <button
            type="button"
            className="bl_btn"
            onClick={handleVerifyOTP}
            disabled={verifyLoading || navigate}
          >
            {navigate ? (
              "Verified Successfully, please wait..."
            ) : (
              <>{verifyLoading ? "Verifying..." : "Continue"}</>
            )}
          </button>
        </div>
        {error && <p className="text-danger text-center">{error}</p>}
        <p className="text-center text-dark agree-hint">
          {resendOTP ? "" : "Please wait  "}
          {resendOTP ? (
            reLoading ? (
              "Sending email..."
            ) : (
              <>
                {" "}
                {`Didn't receive ?`}{" "}
                <span className="link link-blue" onClick={handleResendOTP}>
                  Resend OTP
                </span>{" "}
              </>
            )
          ) : (
            <>
              {minutes && seconds && (
                <>
                  {" "}
                  {minutes}:{seconds}
                </>
              )}
            </>
          )}
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default VerifyOtp;
