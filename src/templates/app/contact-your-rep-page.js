// @flow

import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import ContactYourRepAction from '../../components/ContactYourRepAction'
import { GET_USER_ACTION } from '../../api'

type PageProps = {
  user: User,
  slug: string
}

type TemplateProps = {
  user: User,
  slug: string
}

export const ContactYourRepPageTemplate = ({ user, slug }: TemplateProps) => {
  return <ContactYourRepAction user={user} slug={slug} />
}

const ContactYourRepPage = ({ user, slug }: PageProps) => {
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
    <ContactYourRepPageTemplate
      user={user}
      slug={slug}
      userAction={data.userAction}
    />
  )
}

export default ContactYourRepPage
