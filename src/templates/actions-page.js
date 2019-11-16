import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Layout from "../components/Layout";
import Campaign from "../sections/CampaignActions";

const GET_USER = gql`
  query getUser {
    currentUser {
      id
      username
    }
  }
`;

// TODO: this campaignId needs to be pull from the server (mean while take from userActions table vs currentUser id)
const campaignId = "2";

export const ActionsPageTemplate = () => {
  const {
    loading: userQueryLoading,
    error: userQueryError,
    data: userQueryResponse
  } = useQuery(GET_USER);

  return (
    <>
      {userQueryLoading
        ? "Loading"
        : (userQueryError && userQueryError.message) || (
            <Campaign
              user={userQueryResponse.currentUser}
              campaignId={campaignId}
            />
          )}
    </>
  );
};

const ActionsPage = () => {
  return (
    <Layout>
      <ActionsPageTemplate />
    </Layout>
  );
};

export default ActionsPage;
