import React from "react";
import PropTypes from "prop-types";

import arrow from "../../img/arrow-down.svg";
import twitter from "../../img/twitter.svg";
import instagram from "../../img/instagram.svg";
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

const Hero = ({ title, actions }) => (
  <section className="hero">
    <div className="container-fluid distribute-rows">
      <div className="row">
        <div className="col">
          <div className="text-center">
            <h1 className="display-title mb-sm-5 mb-xl-0">
              {title[0]} <span className="text-primary">{title[1]}</span>
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
            <p className="share-this">Share this</p>
            <IconWrap src={twitter} alt="Twitter" />
            <IconWrap src={instagram} alt="Instagram" />
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
  title: PropTypes.string,
  actions: PropTypes.arrayOf({
    title: PropTypes.string,
    image: PropTypes.any
  })
};

export default Hero;
