// @flow

import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Router, Redirect } from '@reach/router'
import Layout from '../components/Layout'
import PrivateRoute from '../components/PrivateRoute'
import { GET_USER } from '../api'
import Header from '../components/Header'
import CampaignWelcome from '../components/CampaignWelcome'
import Join from '../components/Join'
import { ActionsPage, DataDuesPage } from '../templates/app'

const App = () => {
  const { loading, data = {} } = useQuery(GET_USER)
  const isLoggedIn = data.currentUser && data.currentUser.id

  return (
    <Layout>
      <Header user={data.currentUser} />
      {!loading && (
        <Router>
          <Redirect from="/app" to="/app/actions" />
          <CampaignWelcome
            path="/app/welcome"
            isLoggedIn={isLoggedIn}
            user={data.currentUser}
          />
          <Join
            // FIXME: #89
            path="/app/join/:motive"
            isLoggedIn={isLoggedIn}
            user={data.currentUser}
          />
          <PrivateRoute
            path="/app/actions"
            component={ActionsPage}
            isLoggedIn={isLoggedIn}
            user={data.currentUser}
          />
          {/* Actions specific routes */}
          <PrivateRoute
            path="/app/actions/data-dues"
            component={DataDuesPage}
            isLoggedIn={isLoggedIn}
            user={data.currentUser}
            slug="data-dues"
          />
        </Router>
      )}
    </Layout>
  )
}

export default App
