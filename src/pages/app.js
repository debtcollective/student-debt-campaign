// @flow

import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Router } from '@reach/router'
import Layout from '../components/layout'
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
          <PrivateRoute
            path="/app/actions"
            component={ActionsPage}
            isLoggedIn={isLoggedIn}
          />
        </Router>
      )}
    </Layout>
  )
}

export default App
