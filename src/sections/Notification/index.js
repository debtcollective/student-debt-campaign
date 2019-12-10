// @flow

import * as React from 'react'
import Markdown from 'markdown-to-jsx'

type Props = {
  title: string,
  children: React.Node,
  date: string
}

const Notification = ({ title, children, date }: Props) => (
  <div className="notification alert" role="alert">
    <div className="notification-col">
      <div className="notification__title">{title}</div>
      <div className="notification__date">Updated {date}</div>
    </div>
    <div className="notification-col">
      <div className="notification__content">
        <Markdown>{children}</Markdown>
      </div>
    </div>
    <button
      type="button"
      className="close"
      data-dismiss="alert"
      aria-label="Close"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
)

export default Notification
