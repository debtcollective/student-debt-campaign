import React from "react";

import fist from "./img/fist.png";
import handshake from "./img/handshake.png";
import newspaper from "./img/newspaper.png";

const Hero = ({ title }) => (
  <section className="hero">
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className="text-center">
            <div className="display-3 text-monospace title-line">
              End student debt!
            </div>
            <div className="display-3 text-monospace title-line">
              Join the strike!
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="action-circle-wrap">
            <div className="action-circle bg-purple">
              <img
                className="action-circle__img"
                src={fist}
                alt="fist"
                width="100px"
              />
              <p className="action-circle__title">Declare!</p>
            </div>
            <div className="action-circle bg-yellow">
              <img
                className="action-circle__img"
                src={handshake}
                alt="handshake"
                width="130px"
              />
              <p className="action-circle__title">Prepare!</p>
            </div>
            <div className="action-circle bg-green">
              <img
                className="action-circle__img"
                src={newspaper}
                alt="newspaper"
                width="100px"
              />
              <p className="action-circle__title">Support!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
