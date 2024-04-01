import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_WALLET_UPDATE,
  USER_LOGOUT,
  MARKET_LIVE,
  LOOT_DETAILS,
  USER_LOGIN_RESET,
  USER_LOGIN_WITH_OTP,
  USER_LOGIN_WITH_GOOGLE_OTP,
  AUCTION_DETAILS,
} from "./../actions/user_action";

const initState = {
  data: {},
  login: false,
  loading: false,
  error: false,
  errorData: {},
  marketLive: false,
  mfaEnabled: false,
  loot_details: {},
  auction_details: {},
};

const user_reducer = (state = initState, { payload, type }) => {
  if (type === USER_LOGIN_REQUEST) {
    state = { ...state, loading: true };
  }

  if (type === USER_LOGIN_SUCCESS) {
    state = { ...state, loading: false, login: true, data: payload };
  }

  if (type === USER_LOGIN_FAILURE) {
    state = { ...state, loading: false, error: true, errorData: payload };
  }

  if (type === USER_LOGOUT) {
    state = {
      ...state,
      data: {},
      login: false,
      loading: false,
      error: false,
      errorData: {},
    };
  }

  if (type === MARKET_LIVE) {
    state = { ...state, marketLive: true };
  }

  if (type === USER_WALLET_UPDATE) {
    state = {
      ...state,
      data: {
        user: {
          ...state.data.user,
          balance: payload.balance,
          locked: payload.locked,
        },
      },
    };
  }

  if (type === USER_LOGIN_RESET) {
    state = {
      ...state,
      loading: false,
      login: false,
    };
  }
  if (type == USER_LOGIN_WITH_OTP) {
    state = { ...state, loading: false, login: false };
  }

  if (type == USER_LOGIN_WITH_GOOGLE_OTP) {
    state = { ...state, loading: false, login: false, mfaEnabled: true };
  }

  if (type === USER_LOGIN_SUCCESS) {
    state = { ...state, loading: false, login: true, data: payload };
  }

  if (type === LOOT_DETAILS) {
    state = { ...state, loot_details: payload };
  }

  if (type === AUCTION_DETAILS) {
    state = { ...state, auction_details: payload };
  }

  return state;
};
export const getUser = (state) => state.user.data?.user;
export const getMarketLive = (state) => state.user.marketLive;
export const isUserLoggedIn = (state) => state.user?.login;
export const isLoading = (state) => state.user?.loading;

export default user_reducer;
