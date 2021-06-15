// @flow

import React from 'react'
import logo from '../../../static/assets/logo.png'
import logoSmall from '../../../static/assets/logo-small.png'

const GATSBY_HOST_URL = process.env.GATSBY_HOST_URL
const GATSBY_COMMUNITY_URL = process.env.GATSBY_COMMUNITY_URL

const Header = () => {
  return (
    <dc-header
      logo={logo}
      logosmall={logoSmall}
      community={GATSBY_COMMUNITY_URL}
      returnurl={GATSBY_HOST_URL}
      id="dc-header"
    ></dc-header>
  )
}

export default Header
