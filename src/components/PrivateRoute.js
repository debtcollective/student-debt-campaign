// @flow

import React from 'react'
import { navigate } from 'gatsby'

type Props = {
  component: React.Component,
  location: { pathname: string },
  isLoggedIn: Boolean
}

const PrivateRoute = ({
  component: Component,
  location,
  isLoggedIn,
  ...rest
}: Props) => {
  if (!isLoggedIn && location.pathname !== '/') {
    alert('Sorry! you need to be logged in')
    navigate('/')
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute
