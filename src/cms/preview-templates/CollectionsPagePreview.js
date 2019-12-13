// @flow

import React from 'react'
import { DataDuesHeader } from '../../components/DataDuesAction'

type Props = {
  entry: {
    getIn: (
      ['data']
    ) => {
      toJS: () => {
        templateKey: string,
        content: Array<{
          slug: string,
          title: string,
          description: string
        }>
      }
    }
  },
  widgetFor: string => mixed
}

const CollectionsPagePreview = ({ entry, widgetFor }: Props) => {
  // NOTE: in this case data represents the content of `src/collections/actions.md`
  const data = entry.getIn(['data']).toJS()

  // $FlowFixMe: TODO: We need to address the error
  return data.content.map(({ slug, ...rest }, i) => (
    <div key={i} style={{ padding: '1rem' }}>
      <DataDuesHeader {...rest} />
    </div>
  ))
}

export default CollectionsPagePreview
