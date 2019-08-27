import React from "react";

const IconWrap = ({ src, ...rest }) => (
  <div className="icon-wrap" {...rest}>
    <img src={src} alt="icon" />
  </div>
);

export default IconWrap;
