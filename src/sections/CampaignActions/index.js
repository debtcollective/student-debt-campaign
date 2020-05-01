// @flow

import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import CampaignAction from '../../components/CampaignAction'
import CampaignActionLink from '../../components/CampaignActionLink'
import { GET_USER_ACTIONS } from '../../api'

type Props = {
  user: User
}

const CampaignActions = ({ user }: Props) => {
  // FIXME: flag approach needs to be removed throught #46
  const {
    loading: queryLoading,
    error: queryError,
    data: queryResponse
  } = useQuery(GET_USER_ACTIONS)

  return (
    <section id="campaign-actions" className="campaign-actions">
      <div className="container-fluid extra-pad">
        <div className="row">
          <div className="col">
            <div className="text-center">
              <h1 className="section-title mb-5 text-monospace">
                Ways to take action
              </h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div data-testid="action-items" className="campaign-actions-list">
              {(() => {
                if (queryLoading) {
                  return <p>Loading...</p>
                }

                if (queryError) {
                  return <p>Error: ${queryError.message}</p>
                }

                return queryResponse.getUserActions.map((action) => {
                  let component = (
                    <CampaignAction action={action} key={action.actionId} />
                  )

                  if (action.type === 'link') {
                    component = (
                      <CampaignActionLink
                        action={action}
                        key={action.actionId}
                      />
                    )
                  }

                  return component
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
