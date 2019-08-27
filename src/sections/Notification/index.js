import React from "react";

const Notification = ({ title, children }) => (
  <div className="notification alert" role="alert">
    <div className="notification-col">
      <div className="notification__title">{title}</div>
      <div className="notification__date">
        Updated Wed, Nov 30, 2019 at 12:00 PM
      </div>
    </div>
    <div className="notification-col">
      <div className="notification__content">{children}</div>
    </div>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
);

export default Notification;
