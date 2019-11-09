import React from "react";

import Layout from "../components/Layout";
import Campaign from "../sections/CampaignActions";

// TODO: this data needs to be pulled from our SSO service
const tempFakeUser = {
  id: "3",
  name: "Jane Doe",
  email: "jane.doe@mail.com"
};

export const ActionsPageTemplate = () => (
  <>
    <Campaign user={tempFakeUser} campaignId="8" />
  </>
);

const ActionsPage = () => {
  return (
    <Layout>
      <ActionsPageTemplate />
    </Layout>
  );
};

export default ActionsPage;
