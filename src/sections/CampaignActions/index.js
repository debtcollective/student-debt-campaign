import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const APOLLO_QUERY = gql`
  {
    meme(where: { id: "cjke2xlf9nhd90953khilyzja" }) {
      photo {
        url(
          transformation: {
            image: { resize: { width: 600, height: 600, fit: crop } }
          }
        )
      }
    }
  }
`;

const CampaignActions = ({ user = {} }) => {
  const { loading, error, data } = useQuery(APOLLO_QUERY);

  return (
    <div id="campaign-actions" className="campaign-actions">
      <div className="container-fluid distribute-rows justify-content-center extra-pad">
        <div className="row">
          <div className="col">
            <div className="box">
              <div className="box-header">
                <p>Thank you for joining!</p>
                <h2 className="box-title">Ways to take action</h2>
              </div>
              <div className="box-session">
                <p>{user.name}</p>
              </div>
              <div className="box-action">
                {(() => {
                  if (loading) {
                    return <p>Loading...</p>;
                  }

                  if (error) {
                    return <p>Error: ${error.message}</p>;
                  }

                  return data.userCampaignsActions.map(campaignAction => {
                    const { id, title, description } = campaignAction;
                    return (
                      <details className="box-action__item" key={id}>
                        <summary className="summary">
                          {title}
                          <button className="btn btn-primary btn-sm">
                            DONE
                          </button>
                        </summary>
                        <p className="content">
                          <Markdown>{description}</Markdown>
                        </p>
                      </details>
                    );
                  });
                })()}
              </div>
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
