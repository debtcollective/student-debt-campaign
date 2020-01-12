// @flow

import React from 'react'
import { useQuery } from '@apollo/react-hooks'
// import DirectActionTeamAction from '../../components/DirectActionTeamAction'
import { GET_USER_ACTION } from '../../api'

type PageProps = {
  user: User,
  slug: string
}

type TemplateProps = {
  user: User,
  slug: string
}

export const DirectActionTeamTemplate = ({ user, slug }: TemplateProps) => {
  return null // <DirectActionTeamAction user={user} slug={slug} />
}

const DirectActionTeamPage = ({ user, slug }: PageProps) => {
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
    <DirectActionTeamTemplate
      user={user}
      slug={slug}
      userAction={data.userAction}
    />
  )
}

export default DirectActionTeamPage
