// @flow

import React from 'react'
import { IndexPageTemplate } from '../../templates/index-page'
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from '../../apollo/client'

type Props = {
  entry: {
    getIn: (
      ['data']
    ) => {
      toJS: () => CMSContent & { user: User } & {
        counters: Array<CounterEntry>
      }
    }
  }
}

const IndexPagePreview = ({ entry }: Props) => {
  // NOTE: in this case data represents the content of `src/pages/index.md`
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <ApolloProvider client={client}>
        <IndexPageTemplate
          cta={data.cta}
          demand={data.demand}
          faq={data.faq}
          hero={data.hero}
          join_campaign={data.join_campaign}
          notification={data.notification}
          user={data.user}
          counters={data.counters}
        />
      </ApolloProvider>
    )
  } else {
    return <div>Loading...</div>
  }
}

export default IndexPagePreview
