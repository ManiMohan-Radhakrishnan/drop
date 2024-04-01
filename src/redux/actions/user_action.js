export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";
export const USER_WALLET_UPDATE = "USER_WALLET_UPDATE";

export const USER_LOGOUT = "USER_LOGOUT";
export const MARKET_LIVE = "MARKET_LIVE";

export const USER_LOGIN_RESET = "USER_LOGIN_RESET";
export const USER_LOGIN_WITH_OTP = "USER_LOGIN_WITH_OTP";
export const USER_LOGIN_WITH_GOOGLE_OTP = "USER_LOGIN_WITH_GOOGLE_OTP";

export const LOOT_DETAILS = "LOOT_DETAILS";

export const AUCTION_DETAILS = "AUCTION_DETAILS";

export const user_login_action_request = () => {
  return {
    type: USER_LOGIN_REQUEST,
  };
};

export const user_login_action_success = (input) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: input,
  };
};

export const user_login_action_fauilure = (input) => {
  return {
    type: USER_LOGIN_FAILURE,
    payload: input,
  };
};

export const user_logout_action = () => {
  return {
    type: USER_LOGOUT,
  };
};

export const user_wallet_update_action = (input) => {
  return {
    type: USER_WALLET_UPDATE,
    payload: input,
  };
};

export const market_live = () => {
  return {
    type: MARKET_LIVE,
  };
};

export const loot_details = (input) => {
  return {
    type: LOOT_DETAILS,
    payload: input,
  };
};

export const user_login_reset = () => {
  return {
    type: USER_LOGIN_RESET,
  };
};

export const user_login_with_otp = () => {
  return {
    type: USER_LOGIN_WITH_OTP,
  };
};

export const user_login_with_google_otp = () => {
  return {
    type: USER_LOGIN_WITH_GOOGLE_OTP,
  };
};

export const auction_details = (input) => {
  return {
    type: AUCTION_DETAILS,
    payload: input,
  };
};
