import React, { useState, useEffect } from 'react'
import has from 'lodash/has'
import PropTypes from 'prop-types'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Markdown from 'markdown-to-jsx'
import CampaignAction from '../../components/CampaignAction'
import { GET_USER_ACTIONS, UPDATE_USER_ACTION } from './api'

const CampaignActions = ({ user, campaignId }) => {
  const [completedActions, setCompletedActions] = useState({})
  const [completeAction, { data: mutationResponse }] = useMutation(
    UPDATE_USER_ACTION
  )
  const {
    loading: queryLoading,
    error: queryError,
    data: queryResponse
  } = useQuery(GET_USER_ACTIONS, {
    variables: { campaignId, userId: user.id }
  })

  useEffect(() => {
    if (mutationResponse) {
      setCompletedActions({
        ...completedActions,
        [mutationResponse.userActionUpdate.id]:
          mutationResponse.userActionUpdate.completed
      })
    }
  }, [completedActions, mutationResponse])

  return (
    <section id="campaign-actions" className="campaign-actions">
      <div className="container-fluid distribute-rows justify-content-center extra-pad">
        <div className="row">
          <div className="col">
            <div className="text-center">
              <h1 className="section-title mb-1">Ways to take action</h1>
              {user && (
                <p className="section-content text-center mb-5">
                  {user.username}, Thank you for joining!
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div data-testid="action-items" className="collapsable-list">
              {(() => {
                if (queryLoading) {
                  return <p>Loading...</p>
                }

                if (queryError) {
                  return <p>Error: ${queryError.message}</p>
                }

                return queryResponse.userActions.map((userAction, index) => {
                  const { action, completed } = userAction
                  const { title, description, config, type } = action
                  // Check if state of the action has changed within completedActions state
                  const isActionCompleted = has(completedActions, userAction.id)
                    ? completedActions[userAction.id]
                    : completed
                  const completedClass = isActionCompleted
                    ? 'completed'
                    : 'no-completed'

                  return (
                    <details
                      id={`action-item-${index}`}
                      data-testid={`action-item-${index}`}
                      key={userAction.id}
                      className={`collapsable-list__item ${completedClass}`}
                      open={index === 0}
                    >
                      <summary className="summary">{title}</summary>
                      <Markdown className="content">{description}</Markdown>
                      <CampaignAction
                        config={config}
                        type={type}
                        onComplete={() => {
                          completeAction({
                            variables: {
                              userActionId: userAction.id,
                              completed: true
                            }
                          })
                        }}
                      />
                    </details>
                  )
                })
              })()}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

CampaignActions.propTypes = {
  campaignId: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string
  })
}

export default CampaignActions
