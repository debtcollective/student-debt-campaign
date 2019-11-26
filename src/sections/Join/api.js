import gql from 'graphql-tag'

export const ADD_USER_TO_CAMPAIGN = gql`
  mutation addUserToCampaign($motive: String!) {
    addUserToCampaign(motive: $motive) {
      ok
    }
  }
`
