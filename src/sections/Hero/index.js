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
              <div className="action-circle__img">
                <img src={fist} alt="fist" width="100px" />
              </div>
              <p className="action-circle__title">Declare!</p>
            </div>
            <div className="action-circle bg-yellow">
              <div className="action-circle__img">
                <img src={handshake} alt="handshake" width="130px" />
              </div>
              <p className="action-circle__title">Prepare!</p>
            </div>
            <div className="action-circle bg-green">
              <div className="action-circle__img">
                <img src={newspaper} alt="newspaper" width="100px" />
              </div>
              <p className="action-circle__title">Support!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
