// @flow

import React from 'react'
import DataDuesAction from '../../components/DataDuesAction'

type Props = {
  user: User,
  slug: string
}

export const DataDuesPageTemplate = ({ user, slug }: Props) => {
  return <DataDuesAction user={user} slug={slug} />
}

const DataDuesPage = ({ user, slug }: Props) => {
  return <DataDuesPageTemplate user={user} slug={slug} />
}

export default DataDuesPage
