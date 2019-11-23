// @flow

import React from 'react'

import CampaignActions from '../sections/CampaignActions'

// TODO: this campaignId needs to be pull from the server (mean while take from userActions table vs currentUser id)
const campaignId = '2'

const ActionsPage = () => {
  return <CampaignActions campaignId={campaignId} />
}

export default ActionsPage
