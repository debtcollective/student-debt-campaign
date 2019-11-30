// @flow

import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Markdown from 'markdown-to-jsx'
import CampaignAction from '../../components/CampaignAction'
import { GET_USER_ACTIONS } from './api'

type Props = {
  user: User
}

const CampaignActions = ({ user }: Props) => {
  // FIXME: flag approach needs to be removed throught #46
  const {
    loading: queryLoading,
    error: queryError,
    data: queryResponse
  } = useQuery(GET_USER_ACTIONS, {
    variables: { userId: user.id }
  })

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

                return queryResponse.getUserActions.map((action, index) => {
                  const { title, description, config, type, completed } = action

                  const completedClass = completed
                    ? 'completed'
                    : 'no-completed'

                  return (
                    <details
                      id={action.actionId}
                      data-testid={`action-item-${index}`}
                      key={action.actionId}
                      className={`collapsable-list__item ${completedClass}`}
                      open={index === 0}
                    >
                      <summary className="summary">{title}</summary>
                      <Markdown className="content">{description}</Markdown>
                      <CampaignAction
                        config={config}
                        type={type}
                        onComplete={params => {
                          console.log('action has been completed', params)
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

export default CampaignActions
