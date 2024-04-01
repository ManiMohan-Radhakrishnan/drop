import React from "react";

import { BsExclamationCircle } from "react-icons/bs";

const NotFound = () => {
  return (
    <>
      <div className="container">
        <div
          className="row align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >
          <div className="col">
            <div className="w-25 m-auto">
              <div className="form-group text-center">
                <div style={{ color: "#ea337f" }}>
                  <BsExclamationCircle size={50}></BsExclamationCircle>
                </div>

                <div className="mt-2" style={{ color: "#ea337f" }}>
                  404 - Not Found
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
