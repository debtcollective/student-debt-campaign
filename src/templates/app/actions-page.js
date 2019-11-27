// @flow

import React from 'react'

import CampaignActions from '../../sections/CampaignActions'
type Props = {
  user: User
}

const ActionsPage = ({ user }: Props) => <CampaignActions user={user} />

export default ActionsPage
