const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ actions, graphql }) => {
  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const pages = result.data.allMarkdownRemark.edges
    // https://www.gatsbyjs.org/docs/building-with-components/#page-template-components
    const pageTemplateComponentSlugs = ['/']

    pages.forEach(edge => {
      const id = edge.node.id
      const templateKey = edge.node.frontmatter.templateKey
      const slug = edge.node.fields.slug

      if (!_.includes(pageTemplateComponentSlugs, slug)) return

      // Create page template component only for desired 'pageTemplateComponentSlugs'
      actions.createPage({
        path: edge.node.fields.slug,
        component: path.resolve(`src/templates/${String(templateKey)}.js`),
        context: {
          id
        }
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: 'slug',
      node,
      value
    })
  }
}
