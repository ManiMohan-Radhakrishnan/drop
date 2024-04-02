import UpiImage from "../../images/upi.svg";
import cryptoImage from "../../images/usdt.svg";

export const PAYMENT_OPTS = Object.freeze({
  LIST: "LIST",
  CRYPTO: "CRYPTO",
  UPI: "UPI",
  OFFLINEUPI: "OFFLINEUPI",
});

export const PAYMENT_METHODS = {
  // UPI: {
  //   title: "UPI",
  //   image: UpiImage,
  //   min_amount: process.env.NEXT_PUBLIC_IPPO_MIN_FUND,
  //   limit_text: `You need to fund your GuardianLink wallet with a minimum of $${process.env.NEXT_PUBLIC_IPPO_MIN_FUND}.`,
  // },
  OFFLINEUPI: {
    title: "UPI",
    image: UpiImage,
    // limit_text: `You need to fund your GuardianLink wallet with a minimum of $${process.env.NEXT_PUBLIC_IPPO_MIN_FUND}.`,
  },
  CRYPTO: {
    title: "Crypto",
    image: cryptoImage,
  },
};
