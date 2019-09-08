import React from "react";
import PropTypes from "prop-types";

import IconWrap from "../../components/IconWrap";

const CTA = ({ social }) => (
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
            <p className="share-this">{social.action}</p>
            {social.accounts.map(({ logo, username, url }, index) => (
              <a key={`social-${index}`} href={url}>
                <IconWrap src={logo.publicURL} alt={username} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

CTA.propTypes = {
  social: PropTypes.shape({
    action: PropTypes.string,
    accounts: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.any,
        url: PropTypes.string
      })
    )
  })
};

export default CTA;
