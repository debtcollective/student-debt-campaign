import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Layout from "../components/Layout";
import Campaign from "../sections/CampaignActions";

// TODO: this data needs to be pulled from our SSO service
const tempFakeUser = {
  id: "3",
  name: "Jane Doe",
  email: "jane.doe@mail.com"
};

const GET_USER = gql`
  query getUser {
    currentUser {
      id
    }
  }
`;

export const ActionsPageTemplate = () => {
  const {
    loading: userQueryLoading,
    error: userQueryError,
    data: userQueryResponse
  } = useQuery(GET_USER);

  console.log({
    userQueryLoading,
    userQueryError,
    userQueryResponse
  });

  return (
    <>
      {userQueryLoading
        ? "Loading"
        : (userQueryError && userQueryError.message) ||
          JSON.stringify(userQueryResponse.currentUser)}
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
