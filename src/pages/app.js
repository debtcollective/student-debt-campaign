// @flow

import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Router, Redirect } from '@reach/router'
import Layout from '../components/Layout'
import PrivateRoute from '../components/PrivateRoute'
import { GET_USER } from '../api'
import Header from '../components/Header'
import {
  ActionsPage,
  DataDuesPage,
  ContactYourRepPage,
  CampusGroupPage,
  DirectActionTeamPage,
  SocialMediaTeamPage,
  ContributeIdeasPage
} from '../templates/app'

const App = () => {
  const { loading, data = {} } = useQuery(GET_USER)
  const isLoggedIn = data.currentUser && data.currentUser.id

  return (
    <Layout>
      <Header user={data.currentUser} />
      {!loading && (
        <Router>
          <Redirect from="/app" to="/app/actions" />
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
          <PrivateRoute
            path="/app/actions/contact-your-rep"
            component={ContactYourRepPage}
            isLoggedIn={isLoggedIn}
            user={data.currentUser}
            slug="contact-your-rep"
          />
          <PrivateRoute
            path="/app/actions/start-a-campus-group"
            component={CampusGroupPage}
            isLoggedIn={isLoggedIn}
            user={data.currentUser}
            slug="start-a-campus-group"
          />
          <PrivateRoute
            path="/app/actions/join-a-direct-action-team"
            component={DirectActionTeamPage}
            isLoggedIn={isLoggedIn}
            user={data.currentUser}
            slug="join-a-direct-action-team"
          />
          <PrivateRoute
            path="/app/actions/join-our-social-media-team"
            component={SocialMediaTeamPage}
            isLoggedIn={isLoggedIn}
            user={data.currentUser}
            slug="join-our-social-media-team"
          />
          <PrivateRoute
            path="/app/actions/contribute-your-ideas"
            component={ContributeIdeasPage}
            isLoggedIn={isLoggedIn}
            user={data.currentUser}
            slug="contribute-your-ideas"
          />
        </Router>
      )}
    </Layout>
  )
}

export default App
