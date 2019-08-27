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

export const IndexPageTemplate = ({ display1, display2, items }) => (
  <>
    <Hero title={[display1, display2]} items={items} />
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
    <Notification title="We are winning">
      <p>
        <strong>NEW</strong> Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Ut consequat sapien a rhoncus convallis.
      </p>
    </Notification>
  </>
);

IndexPageTemplate.propTypes = {
  hero: PropTypes.shape({
    display1: PropTypes.string,
    display2: PropTypes.string,
    items: PropTypes.arrayOf({
      title: PropTypes.string,
      image: PropTypes.string
    })
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
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`;
