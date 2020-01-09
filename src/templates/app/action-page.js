// @flow

import React from 'react'
import _ from 'lodash'
import { StaticQuery, graphql } from 'gatsby'
import { DataDuesPage } from './'

const componentMap = {
  'data-dues': DataDuesPage
}

type Props = {
  slug: $Keys<typeof componentMap>,
  user: User
}

const ActionPageTemplate = (props: Props) => {
  const { slug, user } = props

  return (
    <StaticQuery
      query={graphql`
        query {
          # TODO: we need to avoid to fetch all the created MarkdownRemark nodes
          allMarkdownRemark {
            nodes {
              frontmatter {
                title
                description
                templateKey
              }
            }
          }
        }
      `}
      render={data => {
        const Component = componentMap[slug]
        const content = _.find(data.allMarkdownRemark.nodes, {
          frontmatter: { templateKey: slug }
        }).frontmatter

        return <Component {...content} slug={slug} user={user} />
      }}
    />
  )
}

export default ActionPageTemplate
