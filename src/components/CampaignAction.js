import React from "react";
import PropTypes from "prop-types";

const CampaignAction = ({ config }) => {
  const { text, delay, ...attributes } = config;

  return (
    <div className="cta-container content">
      <a data-testid="action-cta" {...attributes}>
        {text}
      </a>
    </div>
  );
};

CampaignAction.propTypes = {
  text: PropTypes.string,
  config: PropTypes.any
};

export default CampaignAction;
