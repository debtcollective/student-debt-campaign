// @flow

import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import DataDuesAction from '../../components/DataDuesAction'
import { GET_USER_ACTION } from '../../api'

type PageProps = {
  user: User,
  slug: string,
  title: string,
  description: string
}

const DataDuesPage = ({ user, slug, title, description }: PageProps) => {
  const { loading, error, data } = useQuery(GET_USER_ACTION, {
    variables: { slug }
  })

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: ${error.message}</p>
  }

  return (
    <DataDuesAction
      user={user}
      slug={slug}
      title={title}
      description={description}
      userAction={data.userAction}
    />
  )
}

export default DataDuesPage
