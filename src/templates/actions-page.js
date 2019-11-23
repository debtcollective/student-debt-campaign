// @flow

import React from 'react'

import CampaignActions from '../sections/CampaignActions'

type Props = {
  user: User
}

// TODO: this campaignId needs to be pull from the server (mean while take from userActions table vs currentUser id)
const campaignId = '2'

const ActionsPage = ({ user }: Props) => {
  return <CampaignActions user={user} campaignId={campaignId} />
}

export default ActionsPage
