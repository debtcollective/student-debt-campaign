import React from "react";

import twitter from "./img/twitter.svg";
import instagram from "./img/instagram.svg";
import IconWrap from "../../components/IconWrap";

const CTA = () => (
  <section className="cta">
    <div className="container-fluid distribute-rows">
      <div className="row">
        <div className="col" />
      </div>
      <div className="row">
        <div className="col">
          <div className="text-center">
            <h2 className="display-title mb-5">
              Help Build Power. Join Today!
            </h2>
            <button className="btn btn-primary mt-lg-5">Sign up</button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="social-icons d-xl-none mt-5">
            <p className="share-this">Share this</p>
            <IconWrap src={twitter} alt="Twitter" />
            <IconWrap src={instagram} alt="Instagram" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CTA;
