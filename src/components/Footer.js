import React from "react";

import logo from "../img/logo.svg";

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="container-fluid">
        <div className="row">
          <div className="col">
            <img
              src={logo}
              alt="Kaldi"
              style={{ width: "14em", height: "10em" }}
            />
          </div>
        </div>
      </footer>
    );
  }
};

export default Footer;
