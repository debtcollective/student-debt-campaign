// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import Footer from '../components/Footer'
import '../styles/index.scss'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from 'gatsby'
import Header from '../components/Header'

if (typeof window !== 'undefined') {
  require('jquery')
  require('bootstrap/js/dist/alert')
}

type Props = {
  user: User
}

const TemplateWrapper = ({ children, user }: Props) => {
  const { title, description } = useSiteMetadata()
  return (
    <>
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
      <Header user={user} />
      {children}
      <Footer />
    </>
  )
}

TemplateWrapper.propTypes = {
  children: PropTypes.node
}

export default TemplateWrapper
