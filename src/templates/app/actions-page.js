// @flow

import React from 'react'
import CampaignActions from '../../sections/CampaignActions'
import Alert from '../../components/Alert'

type Props = {
  user: User,
  location: any
}

const ActionsPage = ({ user, location }: Props) => {
  let message = null
  let variant = null

  if (location && location.state) {
    const state = location.state
    message = state && state.alert && state.alert.message
    variant = state && state.alert && state.alert.variant
  }

  return (
    <>
      <Alert message={message} variant={variant} />
      <CampaignActions user={user} />
    </>
  )
}

export default ActionsPage
