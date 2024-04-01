import {
  signInApi,
  signOutApi,
  SendEmailOtp,
  userApi,
} from "../../api/base-methods";
import { removeCookies, getCookies, setCookies } from "../../utils/cookies";
// import { userApi, SendEmailOtp } from "../../api/base-methods";

import { toast } from "react-toastify";
import {
  user_login_action_success,
  user_login_action_request,
  user_logout_action,
  market_live,
  user_login_with_google_otp,
  user_login_with_otp,
  user_login_action_fauilure,
  loot_details,
  auction_details,
} from "../actions/user_action";
import {
  carBiddingDetailsApi,
  GetLootDetails,
  lootBoxBuyApi,
  lootBoxPrebookApi,
  nftActiveOrders,
  nftDetailApi,
} from "../../api/methods";
import { request } from "websocket";

export const user_login_thunk = ({ data = {}, callback = () => {} } = {}) => {
  return async (dispatch) => {
    let response = {};
    try {
      dispatch(user_login_action_request());
      const result = await signInApi(data);
      response.status = result?.status;
      if (result?.status === 200) {
        if (result?.data?.data?.gauth) {
          response.key = result?.data?.data?.secret_key;
          response.googleOtp = true;
          dispatch(user_login_with_google_otp());
        } else if (result.data.message === "verification required") {
          response.otp = true;
          dispatch(user_login_with_otp());
        } else {
          setCookies(result.data.data.token);
          try {
            const user = await userApi(result.data.data.token);
            //dispatch(loginSuccess(user.data.data));
            dispatch(user_login_action_success(user.data.data));
          } catch (u_err) {
            if (u_err?.status === 401) {
              response.message = "Invalid credential(s)";
            } else {
              toast.error(
                "An unexpected error occured. Please try again later"
              );
            }
            dispatch(user_login_action_fauilure(u_err));
          }
        }
      }
      callback(response);
    } catch (err) {
      response.status = err?.status;
      if (err?.response?.data?.status === 422) {
        if (err?.response?.data?.message === "email otp locked") {
          response.message =
            "Account lock for security reasons, please login again after 10 mins";
        } else if (
          err?.response?.data?.message === "OTP has already been sent"
        ) {
          response.message = "Redirecting you to OTP screen...";
          response.otp = true;
          dispatch(user_login_with_otp());
        } else {
          response.message =
            err?.response?.data?.message || "Invalid credential(s)";
        }
      } else if (err?.response?.data?.status === 406) {
        response.message = "Invalid credential(s)";
        if (err?.response?.data.message === "login locked")
          response.message = "login-locked";
        else response.message = "confirm-email";
      } else {
        toast.error("An unexpected error occured. Please try again  later");
      }
      dispatch(user_login_action_fauilure(err));
      callback(response);
    }
  };
};

export const user_login_with_email_thunk = ({
  data = {},
  callback = () => {},
} = {}) => {
  return async (dispatch) => {
    let response = {};
    try {
      dispatch(user_login_action_request());
      const result = await SendEmailOtp(data);
      response.status = result?.data?.status;
      if (result?.data?.status === 200) {
        response.otp = true;
        dispatch(user_login_with_otp());
      }
      callback(response);
    } catch (err) {
      //console.log(err?.response?.data, "errrr");
      response.status = err?.status;
      if (err?.response?.data?.status === 422) {
        if (err?.response?.data?.message === "email otp locked") {
          response.message =
            "Account lock for security reasons, please login again after 10 mins";
        } else if (err?.response?.data?.error_code == 1001) {
          response.message =
            "Your email id does not exists, please signup and try again.";
        } else if (err?.response?.data?.error_code == 1002) {
          response.otp = true;
        }
      } else if (err?.response?.data?.status === 406) {
        if (err?.response?.data?.message === "login locked")
          response.message = "login-locked";
        else response.message = "confirm-email";
      } else {
        toast.error("An unexpected error occured. Please try again  later");
      }
      dispatch(user_login_action_fauilure(err));
      callback(response);
    }
  };
};

export const user_logout_thunk = () => {
  return async (dispatch) => {
    try {
      const token = getCookies();
      if (token) await signOutApi();
    } catch (err) {
      console.log("🚀 ~ file: user_thunk.js ~ line 58 ~ return ~ err", err);
    }
    removeCookies();
    dispatch(user_logout_action());
  };
};

export const user_load_by_token_thunk = (token) => {
  return async (dispatch) => {
    try {
      const user = await userApi(token);

      dispatch(user_login_action_success(user.data.data));
    } catch (err) {
      console.log("🚀 ~ file: user_thunk.js ~ line 58 ~ return ~ err", err);
    }
  };
};

export const market_live_thunk = () => {
  return async (dispatch) => {
    dispatch(market_live());
  };
};

export const loot_details_thunk = (request = {}, thunkAPI) => {
  return async (dispatch) => {
    // debugger;
    let { data, callback = null } = request;
    try {
      let { slug = "" } = data;
      const result = await GetLootDetails(slug);
      callback(result);

      dispatch(loot_details(result));
    } catch (err) {
      callback(err);
      console.log("🚀 ~ file: user_thunk.js ~ line 58 ~ return ~ err", err);
    }
  };
};

export const loot_prebook_thunk = ({ data = {}, callback = () => {} } = {}) => {
  return async (dispatch) => {
    try {
      let { slug = "", ...rest } = data;
      const response = await lootBoxPrebookApi(slug, rest);
      const token = getCookies();
      if (response?.status === 200) dispatch(user_load_by_token_thunk(token));
      callback && callback(response);
    } catch (error) {
      console.log("Error in loot/pre-book", error);
      callback && callback(error?.response);
    }
  };
};

export const loot_buy_thunk = ({ data = {}, callback = () => {} } = {}) => {
  return async (dispatch) => {
    try {
      let { slug = "", ...rest } = data;
      console.log("slug", data);
      const response = await lootBoxBuyApi(slug, rest);
      const token = getCookies();
      if (response?.status === 200) dispatch(user_load_by_token_thunk(token));
      callback && callback(response);
    } catch (error) {
      console.log("Error in loot/buy", error);
      callback && callback(error?.response);
    }
  };
};

export const auction_details_thunk = (request = {}, thunkAPI) => {
  return async (dispatch) => {
    // debugger;
    let { data, callback = null } = request;
    try {
      let { slug = "" } = data;
      // let result = await nftActiveOrders({ nft_slug: slug });
      // result = await nftDetailApi({
      //   nft_slug: slug,
      //   order_slug: result?.data?.data?.orders[0],
      // });
      let result = await carBiddingDetailsApi(slug);
      callback(result);

      dispatch(auction_details(result));
    } catch (err) {
      callback(err);
      console.log("🚀 ~ file: user_thunk.js ~ line 58 ~ return ~ err", err);
    }
  };
};
