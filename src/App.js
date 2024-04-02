import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import dayjs from "dayjs";
import { useSelector, connect, useDispatch } from "react-redux";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import { change_lang_action } from "./redux/actions/lang_action";
import { setLanguage } from "react-multi-lang";
import { getCookies, setCookies } from "./utils/cookies";
import { getServerTimeApi } from "./api/base-methods";
import {
  user_load_by_token_thunk,
  user_logout_thunk,
} from "./redux/thunk/user_thunk";
import "./App.css";
// import Stop from "./components/stop";
import { FaTimes } from "react-icons/fa";
import { useQuery } from "./hook/url-params";

const Home = lazy(() => import("./pages/home"));

function App(props) {
  const dispatch = useDispatch();
  const [online, setOnline] = useState(true);
  const [diffTimer, setDiffTimer] = useState(false);
  const [diffTimerSeconds, setDiffTimerSeconds] = useState(0);

  const params = useQuery(window.location.search);

  const { lang, user } = useSelector((state) => state);

  useEffect(() => {
    props.change_lang(lang);
    setLanguage(lang);
  }, [props, lang]);

  const secondsToDhms = (info) => {
    let seconds = info > 0 ? info : -1 * info;

    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";

    var result =
      info > 0
        ? dDisplay + hDisplay + mDisplay + sDisplay
        : "-" + dDisplay + hDisplay + mDisplay + sDisplay;
    return result;
  };

  const checkSystemTimer = (input) => {
    const date1 = dayjs(input);
    console.log(
      "🚀 ~ file: App.js ~ line 45 ~ checkSystemTimer ~ date1",
      date1.format("DD MM YYYY HH:mm:ss")
    );

    const date2 = dayjs();
    console.log(
      "🚀 ~ file: App.js ~ line 48 ~ checkSystemTimer ~ date2",
      date2.format("DD MM YYYY HH:mm:ss")
    );

    let seconds = date2.diff(date1, "seconds");

    console.log("seconds: ", seconds);

    setDiffTimerSeconds(seconds);

    if (seconds >= 10 || seconds <= -10) {
      setDiffTimer(true);
    } else {
      setDiffTimer(false);
    }
  };

  const getServerTime = async () => {
    try {
      const result = await getServerTimeApi();
      checkSystemTimer(result.data.data.time);
    } catch (error) {
      console.log("🚀 ~ file: App.js ~ line 48 ~ getServerTime ~ error", error);
    }
  };

  useEffect(() => {
    if (params.get("token")) {
      setCookies(params.get("token"));
    }
    const token = getCookies();
    if (token) dispatch(user_load_by_token_thunk(token));

    if (user.data.user && !token) dispatch(user_logout_thunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener("online", (event) => {
      setOnline(navigator.onLine);
    });
    window.addEventListener("offline", (event) => {
      setOnline(navigator.onLine);
    });
    // handleMenuVisibility();
    // getServerTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleMenuVisibility = () => {
  //   // let hideMenus = params.get("hideMenus");
  //   // setHideMenus(hideMenus === "true");
  // };

  return (
    <>
      {!online && (
        <div className="offline-ribbon">
          <div className="first">
            You are offline, please check you internet connection
          </div>
          <div>
            <FaTimes onClick={() => setOnline(true)} role={"button"} />
          </div>
        </div>
      )}

      {diffTimer && (
        <div className="offline-ribbon">
          <div className="first">
            Your system time does not match with the Internet time (
            {secondsToDhms(diffTimerSeconds)} difference). Please sync your
            system time with the Internet time to have a flawless experience,
          </div>
          <div>
            <FaTimes onClick={() => setDiffTimer(false)} role={"button"} />
          </div>
        </div>
      )}

      <div className="top-loader"></div>
      <div className="whole-content">
        <Router basename="/">
          <Suspense
            fallback={
              <div className="flone-preloader-wrapper">
                <div className="flone-preloader">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            }
          >
            <Switch>
              <Route exact path="/new" component={Home} />
            </Switch>
          </Suspense>
        </Router>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    change_lang: (input) => {
      dispatch(change_lang_action(input));
    },
  };
};

export default connect(null, mapDispatchToProps)(App);

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const user = useSelector((state) => state.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        user.login ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};
