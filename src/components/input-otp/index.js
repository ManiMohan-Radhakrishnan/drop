import React, { useState } from "react";
import OtpInput from "react-otp-input";

const InputOTP = ({ onChange = {}, numInputs = 6, value, title }) => {
  return (
    <div className="otp-input">
      {title ? <label>{title}</label> : ""}

      <OtpInput
        value={value}
        onChange={onChange}
        numInputs={numInputs}
        isInputNum={true}
        separator={"-"}
      />
    </div>
  );
};

export default InputOTP;
