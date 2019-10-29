import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";
import Markdown from "markdown-to-jsx";
import gql from "graphql-tag";

const APOLLO_QUERY = gql`
  {
    userCampaignsActions(userId: 55, campaignId: 98) {
      id
      campaignId
      title
      description
    }
  }
`;

const CampaignActions = ({ user = { name: "jane" } }) => {
  const { loading, error, data } = useQuery(queryCampaignActions);

  return (
    <div id="campaign-actions" className="campaign-actions">
      <div className="container-fluid distribute-rows justify-content-center extra-pad">
        <div className="row">
          <div className="col">
            <div className="text-center">
              <h1 className="section-title mb-1">Ways to take action</h1>
              {user && (
                <p className="section-content text-center mb-5">
                  {user.name}, Thank you for joining!
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="collapsable-list">
              {(() => {
                if (loading) {
                  return <p>Loading...</p>;
                }

                if (error) {
                  return <p>Error: ${error.message}</p>;
                }

                return data.userCampaignsActions.map(
                  (campaignAction, index) => {
                    const { title, description } = campaignAction;
                    return (
                      <details
                        key={`action-item-${index}`}
                        className="collapsable-list__item"
                        open={index === 0}
                      >
                        <summary className="summary">{title}</summary>
                        <Markdown className="content">{description}</Markdown>
                      </details>
                    );
                  }
                );
              })()}
            </div>
          </div>
        </div>
        {loading && <p>Loading Sara...</p>}
        {error && <p>Error: ${error.message}</p>}
        {data && data.meme && data.meme.photo && (
          <img
            src={data.meme.photo.url}
            alt="Sara Vieira"
            style={{ maxWidth: 300 }}
          />
        )}
      </div>
    </div>
  );
};

CampaignActions.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string
  })
};

export default CampaignActions;
