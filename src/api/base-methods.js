import baseAxios from "./axios-base-utils";

import axios from "axios";

export const registerApi = (props) =>
  baseAxios.post("/register", { user: { ...props } });

export const signOutApi = () => baseAxios.delete("/logout");

export const userApi = (token) =>
  baseAxios.get("/users/me", { headers: { Authorization: token } });

export const signInApi = (props) =>
  baseAxios.post("/login", { ...props, source: "web" });

export const getNotificationApi = (page) =>
  baseAxios.get(`/users/notifications?page=${page}`);

export const readNotificationApi = () =>
  baseAxios.post("/users/notification_read");

export const getServerTimeApi = () =>
  axios.get(
    `${process.env.REACT_APP_BASE_SERVER_URL.replace(
      "api/v1",
      ""
    )}/time?timestamp=${new Date().getTime()}`
  );

// export const subscribeApi = (email, source,) =>
//   baseAxios.post("/subscribe_emails", { subscribe_emails: { email, source } });

export const subscribeApi = (
  email,
  accepted_terms_and_condition = false,
  source,
  fsz
) =>
  baseAxios.post("/subscribe_emails", {
    subscribe_emails: { email, accepted_terms_and_condition, source, fsz },
  });

export const treasureList = (slug) =>
  baseAxios.get(`/treasures/${slug}/user_treasures`);

export const treasureClaim = (slug, claim_slug) =>
  baseAxios.put(`treasures/${claim_slug}/user_treasures/${slug}`);

export const SendEmailOtp = (props) =>
  baseAxios.post("/send_email_otp", { ...props, source: "web" });

export const verifyGoogleOtpApi = (props) =>
  baseAxios.post("/verify_google_otp", { ...props });

export const LoginWithOtp = (props) =>
  baseAxios.post("/login_with_otp", { ...props, source: "web" });

export const resendOtpApi = (email, login_with_otp = false) =>
  baseAxios.post("/resend_email_otp", {
    email,
    login_with_otp,
    source: "web",
  });

export const forgotPasswordApi = (email) =>
  baseAxios.post(`/forgot_password`, { email });

export const fetchAllowedAssets = () => baseAxios.get(`/asserts/buy_allowed`);

export const fireBlockFetchAddress = () =>
  baseAxios.post("/payments/fireblock/fetch_address");

export const fireBlockRefresh = () =>
  baseAxios.post("/payments/fireblock/refresh");

export const ippoCreateOrder = (amount) =>
  baseAxios.post("/payments/ippopay/create_order", { amount });

export const ippoUpdateOrder = (order_id) =>
  baseAxios.put("/payments/ippopay/order_status", { order_id });

export const offlinePaymentsDetails = () =>
  baseAxios.get("/payments/offline_payments/details");

export const offlinePaymentsConvert = (amount) =>
  baseAxios.get(`/payments/offline_payments/approx_usd?amount=${amount}`);

export const offlinePaymentsSubmit = (props) =>
  baseAxios.post("/payments/offline_payments", { ...props });

export const offlinePaymentsCancel = (deposit_slug) =>
  baseAxios.post(
    `/payments/offline_payments/cancel?deposit_slug=${deposit_slug}`
  );
export const userEnquiry = (userBrandDetail) =>
  baseAxios.post(`/user_enquiry`, userBrandDetail);

export const socialLogin = ({ provider, token, email }) =>
  baseAxios.post(
    "/social_login",
    { provider, source: "web", email },
    { headers: { Authorization: token } }
  );
export const artistApi = (slug) => baseAxios.get(`/celebrities/${slug}`);

// export const treasureClaim = (txid) => baseAxios.put(`/treasures/${txid}`);
