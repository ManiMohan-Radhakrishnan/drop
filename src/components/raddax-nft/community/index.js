import React from "react";
import {
  FaDiscord,
  FaInstagram,
  FaTwitter,
  FaTelegramPlane,
  FaYoutube,
  FaFacebook,
  //   IoLogoWhatsapp
} from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

import "./style.scss";

const Community = () => {
  return (
    <section className={"community-section"}>
      <div className="container-fluid position-relative">
        <div className="row">
          <div className="col-12">
            <div className={"content-center"}>
              <h2 className={"title"}>JOIN OUR COMMUNITY !</h2>
            </div>
            <svg width="0" height="0">
              <linearGradient
                id="blue-gradient"
                x1="100%"
                y1="100%"
                x2="0%"
                y2="0%"
              >
                <stop stopColor="#EBFF00" offset="0%" />
                <stop stopColor="#00FF1D" offset="100%" />
              </linearGradient>
            </svg>
            <div>
              <ul className={"social-media"}>
                <li>
                  <a
                    href="https://discord.gg/guardianlink"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    <FaDiscord style={{ fill: "url(#blue-gradient)" }} />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href="https://t.me/jumptradenft"
                  >
                    <FaTelegramPlane style={{ fill: "url(#blue-gradient)" }} />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href="https://twitter.com/Jumptradenft"
                  >
                    <FaTwitter style={{ fill: "url(#blue-gradient)" }} />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href="https://www.instagram.com/jumptradenft/"
                  >
                    <FaInstagram style={{ fill: "url(#blue-gradient)" }} />
                  </a>
                </li>
                {/* <li>
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href="https://www.facebook.com/jumptradeofficialnfts">
                    <FaFacebook style={{ fill: "url(#blue-gradient)" }} />
                  </a>
                </li> */}

                <li>
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href="https://www.youtube.com/channel/UCBjyJeYnDeml1aE6URwUfdA"
                  >
                    <FaYoutube style={{ fill: "url(#blue-gradient)" }} />
                  </a>
                </li>
                {/* <li>
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href="https://api.whatsapp.com/send?l=en&amp;text=Hi,%20I%20have%20a%20query%20here!&amp;phone=918925512070">
                    <IoLogoWhatsapp style={{ fill: "url(#blue-gradient)" }} />
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
