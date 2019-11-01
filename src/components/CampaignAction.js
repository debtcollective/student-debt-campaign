import React from "react";
import PropTypes from "prop-types";

const ACTION_TYPES = {
  LINK: "LINK"
};

const CampaignAction = ({ config, type }) => {
  const { text, delay, ...attributes } = config;

  return (
    <div className="cta-container content">
      {type === ACTION_TYPES.LINK ? (
        <a data-testid="action-cta" {...attributes}>
          {text}
        </a>
      ) : null}
    </div>
  );
};

CampaignAction.propTypes = {
  text: PropTypes.string,
  config: PropTypes.any,
  type: PropTypes.string
};

export default CampaignAction;
