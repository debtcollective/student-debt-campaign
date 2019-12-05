// @flow

import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import CampaignAction from '../../components/CampaignAction'
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
  } = useQuery(GET_USER_ACTIONS, {
    variables: { userId: user.id }
  })

  return (
    <section id="campaign-actions" className="campaign-actions">
      <div className="container-fluid extra-pad">
        <div className="row">
          <div className="col">
            <div className="text-center">
              <h1 className="section-title mb-1">Ways to take action</h1>
              <p className="text-center mb-5">
                Here&apos;s a list of actions you can do in order to be more
                involved with the campaign.
              </p>
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

                return queryResponse.getUserActions.map(action => (
                  <CampaignAction action={action} key={action.actionId} />
                ))
              })()}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CampaignActions
