// @flow

import * as React from 'react'
import { Helmet } from 'react-helmet'
import { withPrefix } from 'gatsby'
import { useQuery } from '@apollo/react-hooks'
import Footer from './Footer'
import Header from './Header'
import SEO from './SEO'
import useSiteMetadata from './SiteMetadata'
import { GET_USER } from '../api'
import classNames from 'classnames'
import '../styles/index.scss'

if (typeof window !== 'undefined') {
  require('jquery')
  require('bootstrap/js/dist/alert')
}

type Props = {
  children: React.Node,
  className?: string
}

const Layout = ({ children, className }: Props) => {
  const { title, description } = useSiteMetadata()
  const { data: userQueryResponse = {} } = useQuery(GET_USER)
  const user = userQueryResponse.currentUser || {}
  const mainClassName = classNames('main', 'website-content', className)

  return (
    <>
      <SEO />
      <Header user={user} />
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />
      </Helmet>
      <main id="main" className={mainClassName}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
