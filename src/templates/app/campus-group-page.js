// @flow

import React from 'react'
import { useQuery } from '@apollo/react-hooks'
// import CampusGroupAction from '../../components/CampusGroupAction'
import { GET_USER_ACTION } from '../../api'

type PageProps = {
  user: User,
  slug: string
}

type TemplateProps = {
  user: User,
  slug: string
}

export const CampusGroupTemplate = ({ user, slug }: TemplateProps) => {
  return null // <CampusGroupAction user={user} slug={slug} />
}

const CampusGroupPage = ({ user, slug }: PageProps) => {
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
    <CampusGroupTemplate user={user} slug={slug} userAction={data.userAction} />
  )
}

export default CampusGroupPage
