import React from "react";
import PropTypes from "prop-types";

import arrow from "../../img/arrow-down.svg";
import IconWrap from "../../components/IconWrap";

const getBg = index => {
  switch (index) {
    case 1:
      return "yellow";
    case 2:
      return "green";
    default:
      return "purple";
  }
};

const Hero = ({ title, actions, social }) => (
  <section className="hero">
    <div className="container-fluid distribute-rows">
      <div className="row">
        <div className="col">
          <div className="text-center">
            <h1 className="display-title mb-sm-5 mb-xl-0">
              {title.map(({ line }, index) => (
                <span
                  key={`line-${index}`}
                  className={`d-block ${index % 2 === 0 && "text-primary"}`}
                >
                  {line}
                </span>
              ))}
            </h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="action-circle-wrap">
            {actions.map(({ title, image }, index) => (
              <div
                key={`action-${index}`}
                className={`action-circle bg-${getBg(index)}`}
              >
                <div className="action-circle__img">
                  <img
                    src={
                      image.src.childImageSharp
                        ? image.src.childImageSharp.fluid.src
                        : image.src
                    }
                    alt={image.alt}
                  />
                </div>
                <p className="action-circle__title">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="row d-none d-xl-flex">
        <div className="col">
          <div className="social-icons">
            <p className="share-this">{social.action}</p>
            {social.accounts.map(({ logo, username, url }, index) => (
              <a key={`social-${index}`} href={url}>
                <IconWrap src={logo.publicURL} alt={username} />
              </a>
            ))}
          </div>
        </div>
        <div className="col">
          <div className="d-flex justify-content-center">
            <IconWrap role="button" src={arrow} />
          </div>
        </div>
        <div className="col" />
      </div>
    </div>
  </section>
);

Hero.propTypes = {
  social: PropTypes.shape({
    action: PropTypes.string,
    accounts: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.any,
        url: PropTypes.string
      })
    )
  }),
  title: PropTypes.arrayOf(
    PropTypes.shape({
      line: PropTypes.string
    })
  ),
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.any
    })
  )
};

export default Hero;
