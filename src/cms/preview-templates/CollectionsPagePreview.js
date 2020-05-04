// @flow

import React from 'react'
import { Container } from 'react-bootstrap'
import { DataDuesHeader } from '../../components/DataDuesAction'
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from '../../apollo/client'

type Props = {
  entry: {
    getIn: (
      ['data']
    ) => {
      toJS: () => {
        templateKey: string,
        title: string,
        description: string
      }
    }
  },
  widgetFor: (string) => mixed
}

const CollectionsPagePreview = ({ entry, widgetFor }: Props) => {
  const data = entry.getIn(['data']).toJS()
  const { title, description } = data

  return (
    <ApolloProvider client={client}>
      <Container>
        <DataDuesHeader title={title} description={description} />
      </Container>
    </ApolloProvider>
  )
}

export default CollectionsPagePreview
