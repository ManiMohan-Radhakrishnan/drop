import React from "react";

import "./style.scss";

const OurTeam = () => {
  return (
    <section className="our-team-section">
      <div className="container-fluid">
        <div className="row mt-150">
          <div className="col-sm-12">
            <h2 className="sectionHeading">GuardianLink Team</h2>
          </div>
        </div>
      </div>
      <section className="team-box">
        <article className="team-member">
          <div className="team-member-img">
            <img
              src="https://cdn.guardianlink.io/product-hotspot/images/raddx/RAM_mgtteam.jpg"
              alt="Ramkumar"
            />
          </div>

          <span className="team-member-role">
            Co-Founder <br />
            &amp; CEO
          </span>
          <div className="team-member-name-desc">
            <h3 className="team-member-name">
              Ramkumar <br />
              Subramaniam
            </h3>
            <p className="team-member-desc">
              Having helped create a $3B MarketCap for our partners, Ram, an
              early crypto-adopter and diehard decentralisation fan, is a
              Co-Founder of GuardianLink. His vision is to make sure 1 Million
              Artists make $1 Million each on GuardianLink.
            </p>
          </div>
        </article>

        <article className="team-member">
          <div className="team-member-img">
            <img
              src="https://cdn.guardianlink.io/product-hotspot/images/raddx/kamesh_mgtteam.jpg"
              alt="Kameshwaran"
            />
          </div>

          <span className="team-member-role">
            Co-Founder <br />
            &amp; COO
          </span>
          <div className="team-member-name-desc">
            <h3 className="team-member-name">
              Kameshwaran <br />
              Elangovan
            </h3>
            <p className="team-member-desc">
              Coming from the traditional IT startup world, Kamesh founded a
              company during his college years and grew it up to be 400+ strong.
              He has executed 50+ of the most complex crypto project launches
              for our R&amp;D partners so that their communities had reason to
              trust their roadmaps.
            </p>
          </div>
        </article>
        {/* <article className="team-member">
          <div className="team-member-img">
            <img
              src="https://cdn.guardianlink.io/product-hotspot/images/raddx/Sandrina_mgtteam.jpg"
              alt="Sandrina"
            />
          </div>

          <span className="team-member-role">
            Vice <br />
            President
          </span>
          <div className="team-member-name-desc">
            <h3 className="team-member-name">
              Sandrina <br />
              Paula
            </h3>
            <p className="team-member-desc">
              Sandrina is the new age millennial, fashion trendsetter who is a
              crypto geek herself. She has worked on some of the most
              interesting brands such as Fedex, HCL, Four Seasons, Sky+ for
              Business Development &amp; as a Human Resource Strategist. At
              GuardianLink she is focussed on International Brand Partnerships.
            </p>
          </div>
        </article> */}
      </section>
    </section>
  );
};

export default OurTeam;
