import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'

const NotFoundPage = () => (
  <Layout>
    <div className="not-found-container">
      <img
        src="/img/logo-small.png"
        alt="Content not found"
        className="not-found-logo"
      />
      <h1 className="not-found-heading">
        <span className="text-primary">404</span> content not found
      </h1>
      <p className="not-found-text">
        This page does not exists. Please go to our{' '}
        <Link to="/" className="text-primary">
          home page
        </Link>
      </p>
    </div>
  </Layout>
)

export default NotFoundPage
