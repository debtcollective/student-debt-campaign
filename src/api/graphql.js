import gql from 'graphql-tag'

/**
 * Retrieve the count of users for each campaign motive
 */

export const GET_USER_CAMPAIGN_COUNT = gql`
  query getUserCampaignsCountByMotive {
    getUserCampaignsCountByMotive {
      motive
      count
    }
  }
`

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

export const ADD_USER_TO_CAMPAIGN = gql`
  mutation addUserToCampaign($motive: String!) {
    addUserToCampaign(motive: $motive) {
      ok
    }
  }
`

export const UPDATE_USER_ACTION = gql`
  mutation userActionUpdate($userActionId: ID!, $completed: Boolean!) {
    userActionUpdate(userActionId: $userActionId, completed: $completed) {
      id
      completed
    }
  }
`

export const GET_USER_ACTIONS = gql`
  query getUserActions {
    getUserActions {
      actionId
      userActionId
      campaignId
      title
      description
      type
      config
      completed
      slug
    }
  }
`
