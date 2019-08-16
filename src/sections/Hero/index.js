import React from "react";
import "./style.scss";

const Hero = ({ title }) => (
  <div className="container-fluid">
    <div className="row">
      <div className="col">
        <div className="display-1">End student debt!</div>
        <div className="display-1">Join the strike!</div>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <div className="action-circle-wrap">
          <div className="action-circle bg-purple">
            <img
              className="action-circle__img"
              src="https://via.placeholder.com/100x70"
              alt="fist"
              width="auto"
              height="70px"
            />
            <p className="action-circle__title">Declare!</p>
          </div>
          <div className="action-circle bg-yellow">
            <img
              className="action-circle__img"
              src="https://via.placeholder.com/100x70"
              alt="fist"
              width="auto"
              height="70px"
            />
            <p className="action-circle__title">Prepare!</p>
          </div>
          <div className="action-circle bg-green">
            <img
              className="action-circle__img"
              src="https://via.placeholder.com/100x70"
              alt="fist"
              width="auto"
              height="70px"
            />
            <p className="action-circle__title">Support!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Hero;
