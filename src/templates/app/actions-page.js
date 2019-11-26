// @flow

import React from 'react'

import CampaignActions from '../../sections/CampaignActions'

// TODO: this campaignId needs to be pull from the server (mean while take from userActions table vs currentUser id)
const campaignId = '2'

type Props = {
  user: User
}

const ActionsPage = ({ user }: Props) => (
  <CampaignActions campaignId={campaignId} user={user} />
)

export default ActionsPage
