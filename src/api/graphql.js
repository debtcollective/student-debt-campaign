import gql from 'graphql-tag'

/**
 * Retrive the current user data
 */
export const GET_USER = gql`
  query getUser {
    currentUser {
      id
      external_id
      username
      avatar_url
      campaigns {
        id
        data
      }
    }
  }
`
