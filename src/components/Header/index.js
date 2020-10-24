// @flow

import React from 'react'
import { Link } from 'gatsby'

type Props = {
  user?: object
}

type NavigationLinksProps = {
  isLoggedIn: boolean
}

const GATSBY_HOST_URL = process.env.GATSBY_HOST_URL
const GATSBY_COMMUNITY_URL = process.env.GATSBY_COMMUNITY_URL

const HEADER_LINKS = [
  {
    href: 'https://debtcollective.org/debt-union/',
    text: 'Join the Union',
    target: '_blank'
  },
  {
    href: 'https://community.debtcollective.org/',
    text: 'Community',
    target: '_blank'
  },
  {
    href: 'https://teespring.com/stores/debt-collective',
    text: 'Store',
    target: '_blank'
  }
]

const LocalNavigationLinks = ({ isLoggedIn }: NavigationLinksProps) => {
  return (
    <>
      <div className="nav-item">
        <Link to="/#faq" className="nav-link">
          FAQ
        </Link>
      </div>
      {isLoggedIn && (
        <>
          <div className="nav-item" data-testid="actions-link">
            <Link to="/app/actions" className="nav-link">
              Actions
            </Link>
          </div>
          <div className="nav-item" data-testid="member-hub-link">
            <a
              href="https://debtcollective.org/hub/"
              className="nav-link"
              target="_blank"
            >
              Member hub
            </a>
          </div>
        </>
      )}
    </>
  )
}

const NavigationLinks = ({ isLoggedIn }: NavigationLinksProps) => {
  return (
    <>
      <LocalNavigationLinks isLoggedIn={isLoggedIn} />
      {HEADER_LINKS.map((link) => (
        <div className="nav-item" key={link.href}>
          <a href={link.href} className="nav-link" target={link.target}>
            {link.text}
          </a>
        </div>
      ))}
    </>
  )
}

const Header = ({ user }: Props) => {
  const isLoggedIn = Boolean(user) && Boolean(user.id)

  return (
    <dc-header
      id="dc-header"
      logo="/img/logo.svg"
      logoSmall="/img/logo-small.png"
      host={GATSBY_HOST_URL}
      memberhuburl={`${GATSBY_HOST_URL}/hub`}
      community={GATSBY_COMMUNITY_URL}
      donateurl="/donate"
    >
      <div slot="header" className="header-links">
        <NavigationLinks isLoggedIn={isLoggedIn} />
      </div>
      <div slot="menu">
        <NavigationLinks isLoggedIn={isLoggedIn} />
      </div>
    </dc-header>
  )
}

export default Header
