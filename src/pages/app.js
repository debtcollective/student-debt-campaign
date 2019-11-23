import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Router } from '@reach/router'
import Layout from '../components/layout'
import PrivateRoute from '../components/PrivateRoute'
import { GET_USER } from '../api'
import ActionsPage from '../templates/actions-page'

const App = () => {
  const { loading, data = {} } = useQuery(GET_USER)

  const isLoggedIn = data.currentUser && data.currentUser.id

  if (loading) {
    return 'Waiting'
  }

  return (
    <Layout user={data.currentUser}>
      <Router>
        <PrivateRoute
          path="/app/actions"
          component={ActionsPage}
          isLoggedIn={isLoggedIn}
        />
      </Router>
    </Layout>
  )
}

export default App
