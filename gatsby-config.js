const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'
console.log(`Using environment config: '${activeEnv}'`)
require('dotenv').config({ path: `.env.${activeEnv}` })

const deployContext = process.env.DEPLOY_CONTEXT
const isProduction = deployContext === 'production'
let siteUrl =
  process.env.DEPLOY_URL ||
  process.env.DEPLOY_PRIME_URL ||
  'http://localhost:8000'

if (isProduction) {
  siteUrl = process.env.URL
}

module.exports = {
  siteMetadata: {
    title: 'Student Debt Strike | Join today!',
    description:
      'Join the movement to end Student Debt. #CancelStudentDebt #CollegeForAll',
    author: 'Debt Collective',
    twitterUsername: '@StrikeDebt',
    facebookPage: 'https://www.facebook.com/DebtCollective',
    image: `${siteUrl}/img/seo.png`,
    url: siteUrl
  },
  plugins: [
    'gatsby-plugin-flow',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'CAMPAIGN',
        fieldName: 'campaign',
        url: process.env.GATSBY_CAMPAIGN_API_URL,
        refetchInterval: 60
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GOOGLE_TRACKING_ID,
        head: false,
        anonymize: true
      }
    },
    {
      resolve: 'gatsby-plugin-fullstory',
      options: {
        fs_org: process.env.FULLSTORY_ORG
      }
    },
    {
      // all paths prefixed by /app/ will render the route described in src/pages/app.js
      resolve: 'gatsby-plugin-create-client-paths',
      options: { prefixes: ['/app/*'] }
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages'
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads'
            }
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048
            }
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static'
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn: process.env.SENTRY_DSN,
        environment: deployContext
      }
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    },
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        purgeOnly: ['/all.sass'] // applies purging only on the bulma css file
      }
    }, // must be after other CSS plugins
    'gatsby-plugin-netlify', // make sure to keep it last in the array,
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['Libre+Franklin:400,600,800', 'Material+Icons'],
        display: 'swap'
      }
    }
  ]
}
