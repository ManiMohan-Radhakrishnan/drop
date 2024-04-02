import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Header from "../components/header";
// import Landing from "../components/landing";
import LandingHome from "../components/landing-home";
// import NewDropsTemp2 from "../components/new-drops-temp2";
import toaster from "../utils/toaster";
import { nftCategoriesApi } from "../api/methods";

import { setCookiesByName, removeCookiesByName } from "../utils/cookies";
import useQuery from "../hook/useQuery";

const NewHome = () => {
  let query = useQuery();

  const fsz = query.get("fsz");

  const [categories, setCategories] = useState([]);
  const [isLive, setIsLive] = useState(false);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    // nftCategories(1);

    if (fsz) {
      sessionStorage.setItem("fsz", fsz);
      setCookiesByName("source", fsz);
    } else {
      removeCookiesByName("source");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <>
      {/* <Header started={isLive} /> */}
      {/* <NewDropsTemp2
        categories={categories}
        trigger={trigger}
        setIsLive={setIsLive}
        setTrigger={setTrigger}
      /> */}
      <LandingHome />
    </>
  );
};

export default NewHome;
