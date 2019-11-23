// @flow

import * as React from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../components/Footer'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from 'gatsby'
import '../styles/index.scss'

if (typeof window !== 'undefined') {
  require('jquery')
  require('bootstrap/js/dist/alert')
}

type Props = {
  children: React.Node
}

const TemplateWrapper = ({ children }: Props) => {
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
      {children}
      <Footer />
    </>
  )
}

export default TemplateWrapper
