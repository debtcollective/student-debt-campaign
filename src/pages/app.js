import React, { useState, useEffect } from 'react'
import { Router } from '@reach/router'
import Layout from '../components/layout'
import PrivateRoute from '../components/PrivateRoute'
import * as authService from '../api/auth'
import ActionsPage from '../templates/actions-page'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  useEffect(() => {
    authService.isLoggedIn().then(result => {
      setIsLoggedIn(result)
    })
    // TODO: "react-hooks/exhaustive-deps" is not working
  }, [])

  if (isLoggedIn === null) {
    return 'Waiting'
  }

  return (
    <Layout>
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
