import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import Layout from '../components/Layout'
import Header from '../components/Header'
import CampaignActions from '../sections/CampaignActions'
import { GET_USER } from '../api'

// TODO: this campaignId needs to be pull from the server (mean while take from userActions table vs currentUser id)
const campaignId = '2'

export const ActionsPageTemplate = () => {
  const {
    loading: userQueryLoading,
    error: userQueryError,
    data: userQueryResponse = {}
  } = useQuery(GET_USER)

  return (
    <>
      <Header user={userQueryResponse.currentUser} />
      {userQueryLoading
        ? 'Loading'
        : (userQueryError && userQueryError.message) || (
          <CampaignActions
            user={userQueryResponse.currentUser}
            campaignId={campaignId}
          />
        )}
    </>
  )
}

const ActionsPage = () => {
  return (
    <Layout>
      <ActionsPageTemplate />
    </Layout>
  )
}

export default ActionsPage
