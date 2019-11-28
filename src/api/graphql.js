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

export const CREATE_DATA_DUES_ACTION = gql`
  mutation createDataDuesAction($data: JSONObject!) {
    createDataDuesAction(data: $data) {
      errors
      userAction {
        id
        completed
      }
    }
  }
`
