import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { nftActiveOrders } from "../api/methods";

import Details from "./details";
import { Redirect } from "react-router";
import DetailsLoader from "../utils/detailsLoader";

const NftDetails = ({ hideMenus = false }) => {
  const { slug } = useParams();
  const [loader, setLoader] = useState(true);

  return (
    <>
      {!loader ? (
        <DetailsLoader />
      ) : (
        (() => {
          if (slug) {
            return <Details slug={slug} hideMenus={hideMenus} />;
          } else {
            return <Redirect to="/"></Redirect>;
          }
        })()
      )}
    </>
  );
};

export default NftDetails;
