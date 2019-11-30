import React from 'react'
import Layout from '../components/Layout'
import DataDuesAction from '../components/DataDuesAction'

export const DataDuesPageTemplate = () => {
  return (
    <div id="data-dues-page" className="data-dues-page">
      <DataDuesAction />
    </div>
  )
}

const DataDuesPage = () => {
  return (
    <Layout>
      <DataDuesPageTemplate />
    </Layout>
  )
}

export default DataDuesPage
