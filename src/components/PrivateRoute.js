// @flow

import * as React from 'react'
import { navigate } from 'gatsby'

type Props = {
  component: React.ComponentType<any>,
  location?: { pathname: string, state: any },
  isLoggedIn: Boolean
}

const PrivateRoute = ({
  component: Component,
  location,
  isLoggedIn,
  ...rest
}: Props) => {
  if (!isLoggedIn && location && location.pathname !== '/') {
    alert('Sorry! you need to join the campaign before seeing actions')
    navigate('/')
    return null
  }

  return <Component {...rest} location={location} />
}

export default PrivateRoute
