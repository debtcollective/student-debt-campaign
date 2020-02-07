// @flow

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
import { GET_USER } from '../api'

type Props = {
  data: {
    campaign: {
      getUserCampaignsCountByMotive: Array<CounterEntry>
    },
    markdownRemark: {
      frontmatter: CMSContent
    }
  }
}

const IndexPage = ({ data }: Props) => {
  const { getUserCampaignsCountByMotive } = data.campaign
  const { frontmatter } = data.markdownRemark
  const {
    cta,
    demand,
    faq,
    hero,
    join_campaign: joinCampaign,
    notification
  } = frontmatter

  const { data: userQuery = {} } = useQuery(GET_USER)
  const user = userQuery.currentUser || {}
  const counters = getUserCampaignsCountByMotive

  return (
    <Layout className="no-pad">
      <IndexPageTemplate
        cta={cta}
        demand={demand}
        faq={faq}
        hero={hero}
        join_campaign={joinCampaign}
        notification={notification}
        user={user}
        counters={counters}
      />
    </Layout>
  )
}

export const IndexPageTemplate = ({
  hero,
  demand,
  join_campaign: joinCampaign,
  counters,
  user,
  notification,
  faq,
  cta
}: CMSContent & { counters: Array<CounterEntry> } & { user: User }) => (
  <>
    <Hero title={hero.title} actions={hero.actions} counters={counters} />
    <Informative title={demand.title} remark={demand.remark}>
      {demand.content}
    </Informative>
    {joinCampaign.map(
      ({ id, background, image, title, colour, content, remark, feed }) => {
        const countData = _.defaultTo(_.find(counters, { motive: id }), {
          count: 0
        })

        return (
          <Join
            key={id}
            id={id}
            background={background}
            image={image}
            count={Number(countData.count)}
            title={title}
            colour={colour}
            remark={remark}
            feed={feed}
            user={user}
          >
            {content}
          </Join>
        )
      }
    )}
    <Notification title={notification.title} date={notification.date}>
      {notification.description}
    </Notification>
    <FAQ entries={faq} />
    <CTA title={cta.title} action={cta.action} />
  </>
)

export default IndexPage

export const indexPageQuery = graphql`
  query IndexPage {
    campaign {
      getUserCampaignsCountByMotive {
        count
        motive
      }
    }
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
          title
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
