import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useMutation } from '@apollo/react-hooks'
import { UPSERT_USER_ACTION, GET_USER_ACTIONS } from '../api'

const CampaignActionLink = ({ action: { completed, slug, title, config } }) => {
  const className = classNames('campaign-action', { completed })
  const buttonText = completed ? 'Completed' : 'Take action'
  const buttonClassName = classNames('btn btn-primary btn-lg', {
    disabled: completed
  })
  const { href } = config

  const [upsertUserAction] = useMutation(UPSERT_USER_ACTION, {
    refetchQueries: [{ query: GET_USER_ACTIONS }]
  })

  return (
    <div className={className}>
      <a
        href={href}
        className="campaign-action-title"
        rel="noopener noreferrer"
        target="_blank"
        onClick={() =>
          upsertUserAction({ variables: { slug, completed: true } })
        }
      >
        {title}
        <span className={buttonClassName}>{buttonText}</span>
      </a>
    </div>
  )
}

CampaignActionLink.propTypes = {
  action: PropTypes.shape({
    completed: PropTypes.bool,
    config: PropTypes.object,
    id: PropTypes.string,
    type: PropTypes.string,
    slug: PropTypes.string,
    title: PropTypes.string
  })
}

export default CampaignActionLink
