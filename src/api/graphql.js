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

export const UPSERT_DATA_DUES_ACTION = gql`
  mutation upsertDataDuesAction($data: JSONObject!) {
    upsertDataDuesAction(data: $data) {
      errors
      userAction {
        id
        completed
        data
      }
    }
  }
`

export const UPSERT_USER_ACTION = gql`
  mutation upsertUserAction(
    $slug: String!
    $completed: Boolean!
    $data: JSONObject
  ) {
    upsertUserAction(slug: $slug, completed: $completed, data: $data) {
      id
      completed
      data
    }
  }
`

export const GET_USER_ACTION = gql`
  query getUserAction($slug: String!) {
    userAction(slug: $slug) {
      id
      completed
      data
    }
  }
`
