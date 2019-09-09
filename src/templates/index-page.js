import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import Hero from "../sections/Hero";
import Informative from "../sections/Informative";
import Join from "../sections/Join";
import fist from "./img/fist.png";
import handshake from "./img/handshake.png";
import newspaper from "./img/newspaper.png";
import bgFist from "./img/image_3.png";
import bgHandshake from "./img/image_1.png";
import bgNewspaper from "./img/image_2.png";
import Notification from "../sections/Notification";
import FAQ from "../sections/FAQ";
import CTA from "../sections/CTA";

export const IndexPageTemplate = ({ hero, social, notification, cta }) => (
  <>
    <Hero title={hero.title} actions={hero.actions} social={social} />
    <Informative />
    <Join
      background={bgFist}
      image={fist}
      count={Math.floor(Math.random() * 900000) + 100000}
      title="of us are already on strike!"
      colour="purple"
    >
      We are not paying our student loans this means we are already in default
      or that we have enrolled in programs such as forbearance, deferment or $0
      IBR in order to halt our payments. The government and the lenders aren’t
      getting a cent from us!
    </Join>
    <Join
      background={bgNewspaper}
      image={newspaper}
      count={Math.floor(Math.random() * 900000) + 100000}
      title="of us are threatening to strike!"
      colour="yellow"
    >
      We are prepared to stop paying our loans in the future if our demands are
      not met. These loans are unjust and it is only a matter of time before we
      stop cooperating.
    </Join>
    <Join
      background={bgHandshake}
      image={handshake}
      count={Math.floor(Math.random() * 900000) + 100000}
      title="of us stand in solidarity with strikers."
      colour="green"
    >
      We do not have student loans, but we are standing in solidarity with all
      those people who are on strike
    </Join>
    <Notification title={notification.title} date={notification.date}>
      {notification.description}
    </Notification>
    <FAQ />
    <CTA social={social} title={cta.title} action={cta.action} />
  </>
);

IndexPageTemplate.propTypes = {
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
        title: PropTypes.string,
        image: PropTypes.object
      })
    )
  })
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
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
