import React from 'react'
import Layout from '../components/Layout'
import DataDuesAction from '../components/DataDuesAction'

export const DataDuesPageTemplate = () => {
  return <DataDuesAction />
}

const DataDuesPage = () => {
  return (
    <Layout>
      <DataDuesPageTemplate />
    </Layout>
  )
}

export default DataDuesPage
