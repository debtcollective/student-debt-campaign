// @flow

import React from 'react'
import { useQuery } from '@apollo/react-hooks'
// import SocialMediaTeamAction from '../../components/SocialMediaTeamAction'
import { GET_USER_ACTION } from '../../api'

type PageProps = {
  user: User,
  slug: string
}

type TemplateProps = {
  user: User,
  slug: string
}

export const SocialMediaTeamTemplate = ({ user, slug }: TemplateProps) => {
  return null // <SocialMediaTeamAction user={user} slug={slug} />
}

const SocialMediaTeamPage = ({ user, slug }: PageProps) => {
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
    <SocialMediaTeamTemplate
      user={user}
      slug={slug}
      userAction={data.userAction}
    />
  )
}

export default SocialMediaTeamPage
