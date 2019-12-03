// @flow

import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import DataDuesAction from '../../components/DataDuesAction'
import { GET_USER_ACTION } from '../../api'

type PageProps = {
  user: User,
  slug: string
}

type TemplateProps = {
  user: User,
  slug: string,
  userAction: any
}

export const DataDuesPageTemplate = ({
  user,
  slug,
  userAction
}: TemplateProps) => {
  return <DataDuesAction user={user} slug={slug} userAction={userAction} />
}

const DataDuesPage = ({ user, slug }: PageProps) => {
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
    <DataDuesPageTemplate
      user={user}
      slug={slug}
      userAction={data.userAction}
    />
  )
}

export default DataDuesPage
