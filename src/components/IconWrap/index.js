import React from "react";
import PropTypes from "prop-types";

const IconWrap = ({ src, ...rest }) => (
  <div className="icon-wrap">
    <img src={src} {...rest} />
  </div>
);

IconWrap.propTypes = {
  src: PropTypes.string
};

export default IconWrap;
