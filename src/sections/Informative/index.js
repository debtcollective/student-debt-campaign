import React from "react";
import PropTypes from "prop-types";

const Informative = ({ title, content, remark }) => (
  <section className="informative">
    <div className="container-fluid distribute-rows justify-content-center extra-pad">
      <div className="row">
        <div className="col">
          <div className="text-center">
            <h1 className="informative__title">{title}</h1>
          </div>
          <p className="informative__content">{content}</p>
          <p className="informative__content">
            <strong>{remark}</strong>
          </p>
        </div>
      </div>
    </div>
  </section>
);

Informative.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  remark: PropTypes.string
};

export default Informative;
