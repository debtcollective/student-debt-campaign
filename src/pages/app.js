// @flow

import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Router, Redirect } from '@reach/router'
import Layout from '../components/Layout'
import PrivateRoute from '../components/PrivateRoute'
import { GET_USER } from '../api'
import Header from '../components/Header'
import { ActionsPage } from '../templates/app'

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
        </Router>
      )}
    </Layout>
  )
}

export default App