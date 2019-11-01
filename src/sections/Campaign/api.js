import gql from "graphql-tag";

export const GET_CAMPAIGN_ACTIONS = gql`
  query getCampaignActions($userId: ID!, $campaignId: ID!) {
    userCampaignsActions(userId: $userId, campaignId: $campaignId) {
      campaignId
      config
      description
      id
      title
      type
    }
  }
`;

export const GET_USER_ACTIONS = gql`
  query getUserActions($campaignId: ID!, $actionId: ID!) {
    userActions(
      userId: 1
      filterBy: { campaignId: $campaignId, actionId: $actionId }
    ) {
      actionId
      completed
      id
    }
  }
`;
