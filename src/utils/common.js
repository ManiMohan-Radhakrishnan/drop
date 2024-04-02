import dayjs from "dayjs";

import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  validatePhoneNumberLength,
} from "libphonenumber-js";

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
  return re.test(String(email).toLowerCase());
};

export const validateUpi = (upi) => {
  const re = /^[\w\.\-_]{3,}@[a-zA-Z]{3,}/;
  return re.test(upi);
};

export const validateNumber = (value) => {
  const re = /^[1-9][0-9]*$/;
  return re.test(value);
};

export const validatePhone = (mobile) => {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im; // eslint-disable-line
  return re.test(mobile);
};

export const passwordLength = 6;

export const currencyFormat = (value, type) => {
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: type,
  });
  return formatter.format(parseFloat(value));
};

export const validateCurrencyUpiPayment = (value) => {
  // const re = /^(\d*)\.?(\d){0,10}$/;
  // const re = /^\d*\.?\d{0,2}$/;
  const re = /^[1-9][0-9]*$/;
  return re.test(value);
};

// export const abbreviateNumber = (value) => {
//   let newValue = value;
//   if (value >= 1000) {
//     const suffixes = ["", "K", "M", "B", "T"];
//     let suffixNum = Math.floor(("" + value).length / 3);
//     let shortValue = "";
//     for (let precision = 2; precision >= 1; precision--) {
//       shortValue = (
//         suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value
//       ).toPrecision(precision);
//       let dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "");
//       if (dotLessShortValue.length <= 2) {
//         break;
//       }
//     }
//     console.log(shortValue);
//     if (shortValue % 1 !== 0) shortValue = parseFloat(shortValue).toFixed(1);
//     newValue = shortValue + suffixes[suffixNum];
//   }
//   return newValue;
// };

const intlFormat = (num) => {
  return new Intl.NumberFormat().format(Math.round(num * 10) / 10);
};
export const abbreviateNumber = (num) => {
  if (num >= 1000000000) return intlFormat(num / 1000000000) + "B";
  if (num >= 1000000) return intlFormat(num / 1000000) + "M";
  if (num >= 1000) return intlFormat(num / 1000) + "K";
  return intlFormat(num);
};

export const percDiff = (basePrice, newPrice) => {
  return (((newPrice - basePrice) / basePrice) * 100).toFixed(2);
};

export const validateCurrency = (value) => {
  // const re = /^(\d*)\.?(\d){0,10}$/;
  // const re = /^\d*\.?\d{0,2}$/;
  const re = /^[1-9][0-9]*$/;
  return re.test(value);
};

export const validateQuantity = (value) => {
  const re = /^[1-9][0-9]*$/;
  return re.test(value);
};

export const bidBuyError = (code) => {
  // const OK = 200;
  const ERROR = 500;
  const UNAUTHORIZED = 401;
  const AUCTION_UNBEGUN = 701;
  const AUCTION_ENDED = 702;
  const INVALID_QUANTITY = 703;
  const SOLD = 704;
  const OUT_OF_STOCK = 705;
  const LIMITED_OUT = 706;
  const INSUFFICIENT_BALANCE = 707;
  const INVALID_BID = 708;
  const LOW_BID = 709;
  const INVALID_NFT = 710;
  const INVALID_CATEGORY = 711;
  const LOOT_DELAY = 712;

  switch (code) {
    case ERROR:
      return { title: "Error", description: "Something went wrong!" };
    case UNAUTHORIZED:
      return { title: "Error", description: "Unauthorized" };
    case AUCTION_UNBEGUN:
      return { title: "Error", description: "Auction not yet begun" };
    case AUCTION_ENDED:
      return { title: "Error", description: "Auction ended" };
    case INVALID_QUANTITY:
      return { title: "Error", description: "Invalid Quantity" };
    case SOLD:
      return { title: "Error", description: "Sold out" };
    case OUT_OF_STOCK:
      return { title: "Error", description: "Out of stock" };
    case LIMITED_OUT:
      return { title: "Error", description: "Limited out" };
    case INSUFFICIENT_BALANCE:
      return { title: "Error", description: "Insufficient Balance" };
    case INVALID_BID:
      return { title: "Error", description: "Invalid Bid" };
    case LOW_BID:
      return { title: "Error", description: "Low Bid" };
    case INVALID_NFT:
      return { title: "Error", description: "Invalid NFT" };
    case INVALID_CATEGORY:
      return { title: "Error", description: "Invalid Category" };
    case LOOT_DELAY:
      return { title: "Error", description: "Wait 5 sec for next buy" };
    default:
      return { title: "Error", description: "Something went wrong!" };
  }
};

export const roundDown = (number, decimals = 2) => {
  number = parseFloat(number);
  return Number(number.toString().match(/^\d+(?:\.\d{0,2})?/));
};

export const validInternationalPhone = (input, country) => {
  return (
    isPossiblePhoneNumber(input, country) === true &&
    isValidPhoneNumber(input, country) === true &&
    validatePhoneNumberLength(input, country) === undefined
  );
};

export const validateName = (name) => {
  const re =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  return re.test(name);
};

export const validateNameReplace = (input) =>
  input
    .replace("  ", " ")
    .replace("--", "-")
    .replace(",,", ",")
    .replace("..", ".")
    .replace("''", "'")
    .replace("-,", "-")
    .replace("-.", "-")
    .replace("-'", "-")
    .replace(",-", ",")
    .replace(",.", ",")
    .replace(",'", ",")
    .replace(".-", ".")
    .replace(".,", ".")
    .replace(".'", ".")
    .replace("'-", "'")
    .replace("',", "'")
    .replace("'.", "'");

export const validatePassword = (password) => {
  const re = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  const sp_re = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return re.test(password) || sp_re.test(password);
};

export const decodeURIComponentSafe = (s) => {
  if (!s) {
    return s;
  }
  return decodeURIComponent(s.replace(/%(?![0-9][0-9a-fA-F]+)/g, "%25"));
};

export const dateFormat = (date = null, format = "YYYY-MM-DD HH:mm:ss") => {
  if (!date) return null;
  var input_date = new Date(date);
  return dayjs(input_date).format(format);
};

export const buyButtonDisableStatus = true;
