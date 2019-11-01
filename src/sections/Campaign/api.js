import gql from "graphql-tag";

export const UPDATE_USER_ACTION = gql`
  mutation userActionUpdate($userActionId: ID!, $completed: Boolean!) {
    userActionUpdate(userActionId: $userActionId, completed: $completed) {
      id
      completed
    }
  }
`;

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
