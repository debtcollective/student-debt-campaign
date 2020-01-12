// @flow

import React from 'react'
import { useQuery } from '@apollo/react-hooks'
// import ContributeIdeasAction from '../../components/ContributeIdeasAction'
import { GET_USER_ACTION } from '../../api'

type PageProps = {
  user: User,
  slug: string
}

type TemplateProps = {
  user: User,
  slug: string
}

export const ContributeIdeasTemplate = ({ user, slug }: TemplateProps) => {
  return null // <ContributeIdeasAction user={user} slug={slug} />
}

const ContributeIdeasPage = ({ user, slug }: PageProps) => {
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
    <ContributeIdeasTemplate
      user={user}
      slug={slug}
      userAction={data.userAction}
    />
  )
}

export default ContributeIdeasPage
