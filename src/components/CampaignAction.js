import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'gatsby'

const CampaignAction = ({ action: { completed, slug, title } }) => {
  const className = classNames('campaign-action', { completed })
  const buttonText = completed ? 'Completed' : 'Take action'
  const buttonClassName = classNames('btn btn-primary btn-lg', {
    disabled: completed
  })

  return (
    <div className={className}>
      <Link to={`/app/actions/${slug}`} className="campaign-action-title">
        {title}
        <span className={buttonClassName}>{buttonText}</span>
      </Link>
    </div>
  )
}

CampaignAction.propTypes = {
  action: PropTypes.shape({
    completed: PropTypes.bool,
    config: PropTypes.object,
    id: PropTypes.string,
    type: PropTypes.string,
    slug: PropTypes.string,
    title: PropTypes.string
  })
}

export default CampaignAction
