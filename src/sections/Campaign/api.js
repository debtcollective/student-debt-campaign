import gql from "graphql-tag";

export const GET_USER_ACTIONS = gql`
  query getUserActions($userId: ID!, $campaignId: ID!) {
    userActions(userId: $userId, campaignId: $campaignId) {
      actionId
      completed
      id
      action {
        config
        description
        title
        type
      }
    }
  }
`;
