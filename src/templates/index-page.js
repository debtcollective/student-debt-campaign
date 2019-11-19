import React from "react";
import { useQuery } from "@apollo/react-hooks";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import Header from "../components/Header";
import SEO from "../components/SEO";
import Hero from "../sections/Hero";
import Informative from "../sections/Informative";
import Join from "../sections/Join";
import Notification from "../sections/Notification";
import FAQ from "../sections/FAQ";
import CTA from "../sections/CTA";
import { GET_USER } from "../api";

export const IndexPageTemplate = ({
  hero,
  social,
  notification,
  cta,
  faq,
  demand,
  join_campaign
}) => {
  const { data: userQueryResponse = {} } = useQuery(GET_USER);

  return (
    <>
      <Header user={userQueryResponse.currentUser} />
      <Hero title={hero.title} actions={hero.actions} social={social} />
      <Informative title={demand.title} remark={demand.remark}>
        {demand.content}
      </Informative>
      {join_campaign.map(
        ({
          id,
          background,
          image,
          title,
          colour,
          content,
          count,
          remark,
          feed
        }) => (
          <Join
            key={id}
            id={id}
            background={background.publicURL}
            image={image.publicURL}
            count={count}
            title={title}
            colour={colour}
            remark={remark}
            feed={feed}
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
    </>
  );
};

IndexPageTemplate.propTypes = {
  join_campaign: PropTypes.arrayOf(PropTypes.any),
  demand: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    remark: PropTypes.string
  }),
  faq: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string,
      answer: PropTypes.string
    })
  ),
  cta: PropTypes.shape({
    title: PropTypes.string,
    action: PropTypes.string,
    social: PropTypes.shape({
      action: PropTypes.string,
      accounts: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.any,
          url: PropTypes.string
        })
      )
    })
  }),
  social: PropTypes.shape({
    action: PropTypes.string,
    accounts: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.any,
        url: PropTypes.string
      })
    )
  }),
  notification: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string
  }),
  hero: PropTypes.shape({
    title: PropTypes.arrayOf(
      PropTypes.shape({
        line: PropTypes.string
      })
    ),
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.object,
        join_section_id: PropTypes.string,
        title: PropTypes.string
      })
    )
  })
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <SEO />
      <IndexPageTemplate {...frontmatter} />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
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
`;
