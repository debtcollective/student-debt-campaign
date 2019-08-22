import React from "react";

import fist from "./img/fist.png";
import handshake from "./img/handshake.png";
import newspaper from "./img/newspaper.png";
import arrow from "./img/arrow-down.svg";
import twitter from "./img/twitter.svg";
import instagram from "./img/instagram.svg";
import IconWrap from "../../components/IconWrap";

const Hero = ({ title }) => (
  <section className="hero">
    <div className="container-fluid distribute-rows">
      <div className="row">
        <div className="col">
          <div className="text-center">
            <h1 className="display-title mb-sm-5 mb-xl-0">
              End student debt!{" "}
              <span className="text-primary">Join the strike!</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="action-circle-wrap">
            <div className="action-circle bg-purple">
              <div className="action-circle__img">
                <img src={fist} alt="fist" />
              </div>
              <p className="action-circle__title">Declare!</p>
            </div>
            <div className="action-circle bg-yellow">
              <div className="action-circle__img">
                <img src={handshake} alt="handshake" />
              </div>
              <p className="action-circle__title">Prepare!</p>
            </div>
            <div className="action-circle bg-green">
              <div className="action-circle__img">
                <img src={newspaper} alt="newspaper" />
              </div>
              <p className="action-circle__title">Support!</p>
            </div>
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

export default Hero;
