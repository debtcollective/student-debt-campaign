import React from "react";
import PropTypes from "prop-types";

const CampaignActions = ({ user }) => {
  return (
    <div id="campaign-actions">
      <div className="box">
        <div className="box-image">
          <img src="https://via.placeholder.com/300x200.png?text=Image" />
        </div>
        <div className="box-session">
          <p>{user.name}</p>
        </div>
        <div className="box-action">
          <details className="box-action__item">
            <summary className="summary">Visit our facebook page</summary>
            <p className="content">
              Go to our Facebook page by clicking <a href="#">here</a> and
              support the cause
            </p>
          </details>
          <details className="box-action__item">
            <summary className="summary">Follow us in twitter</summary>
            <p className="content">
              Go to our Twitter account by clicking <a href="#">here</a> and
              support the cause
            </p>
          </details>
          <details className="box-action__item">
            <summary className="summary">Follow us in Instagram</summary>
            <p className="content">
              Go to our IG account by clicking <a href="#">here</a> and support
              the cause
            </p>
          </details>
        </div>
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
