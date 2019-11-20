import React from 'react'
import delay from 'lodash/delay'
import PropTypes from 'prop-types'

const ACTION_TYPES = {
  LINK: 'LINK'
}

const CampaignAction = ({ config, type, onComplete }) => {
  const { text, delay: delayTime, ...attributes } = config

  return (
    <div className="cta-container content">
      {type === ACTION_TYPES.LINK ? (
        <a
          data-testid="action-cta"
          {...attributes}
          onClick={() => delay(onComplete, delayTime)}
        >
          {text}
        </a>
      ) : null}
    </div>
  )
}

CampaignAction.propTypes = {
  text: PropTypes.string,
  config: PropTypes.any,
  type: PropTypes.string,
  onComplete: PropTypes.func
}

export default CampaignAction
