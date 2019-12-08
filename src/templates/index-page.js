/* eslint react/prop-types: 0 */

import React from 'react'
import { graphql } from 'gatsby'
import { useQuery } from '@apollo/react-hooks'
import _ from 'lodash'
import Layout from '../components/Layout'
import Hero from '../sections/Hero'
import Informative from '../sections/Informative'
import Join from '../sections/Join'
import Notification from '../sections/Notification'
import FAQ from '../sections/FAQ'
import CTA from '../sections/CTA'
import { GET_USER, GET_USER_CAMPAIGN_COUNT } from '../api'

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const {
    hero,
    social,
    notification,
    cta,
    faq,
    demand,
    join_campaign: joinCampaign
  } = frontmatter

  const { data: userQuery = {} } = useQuery(GET_USER)
  const { data: userCampaignCountQuery = {} } = useQuery(
    GET_USER_CAMPAIGN_COUNT
  )
  const user = userQuery.currentUser || {}
  const counters = userCampaignCountQuery.getUserCampaignsCountByMotive || []

  console.log('counters', counters)
  console.log('joinCampaign', joinCampaign)

  return (
    <Layout className="no-pad">
      <Hero title={hero.title} actions={hero.actions} social={social} />
      <Informative title={demand.title} remark={demand.remark}>
        {demand.content}
      </Informative>
      {joinCampaign.map(
        ({ id, background, image, title, colour, content, remark, feed }) => (
          <Join
            key={id}
            id={id}
            background={background.publicURL}
            image={image.publicURL}
            count={_.defaultTo(_.find(counters, { motive: id }), 0)}
            title={title}
            colour={colour}
            remark={remark}
            feed={feed}
            user={user}
          >
            {content}
          </Join>
        )
      )}
      <Notification title={notification.title} date={notification.date}>
        {notification.description}
      </Notification>
      <FAQ entries={faq} />
      <CTA social={social} title={cta.title} action={cta.action} />
    </Layout>
  )
}

export default IndexPage

export const indexPageQuery = graphql`
  query IndexPage {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        join_campaign {
          id
          background {
            absolutePath
            publicURL
          }
          colour
          content
          count
          feed {
            username
            status
            picture {
              publicURL
            }
          }
          image {
            absolutePath
            publicURL
          }
          remark
          title
        }
        demand {
          title
          content
          remark
        }
        faq {
          question
          answer
        }
        cta {
          title
          action
        }
        notification {
          title
          description
          date
        }
        social {
          action
          accounts {
            username
            url
            logo {
              absolutePath
              publicURL
            }
          }
        }
        hero {
          title {
            line
          }
          actions {
            title
            join_section_id
            image {
              src {
                childImageSharp {
                  fluid(maxWidth: 150, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              alt
            }
          }
        }
      }
    }
  }
`
