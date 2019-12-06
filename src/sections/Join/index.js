// @flow

import * as React from 'react'
import { Link } from 'gatsby'
import Markdown from 'markdown-to-jsx'

const formatNumber = number =>
  number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

type FeedEntry = {
  picture: { publicURL: string },
  username: string,
  status: string
}

type Props = {
  user: User,
  background: string,
  children: React.Node,
  colour: string,
  count: number,
  feed: Array<FeedEntry>,
  id: string,
  image: string,
  remark: string,
  title: string
}

const Join = ({
  user,
  background,
  children,
  colour,
  count,
  feed,
  id,
  image,
  remark,
  title
}: Props) => {
  return (
    <section
      className="join"
      data-color={colour}
      id={id}
      style={{ background: `url(${background})`, backgroundSize: 'cover' }}
    >
      <div className="container-fluid distribute-rows">
        <div className="row">
          <div className="col">
            <div className="text-center">
              <header className="join__header">
                <img
                  className="join__img"
                  src={image}
                  alt={title.toLowerCase()}
                />
                <h2 className="join__title">
                  {formatNumber(count)} {title}
                </h2>
              </header>
              <div className="join__content">
                <Markdown>{children}</Markdown>
                <p className="mt-4">
                  <strong>{remark}</strong>
                </p>
                <div className="join__cta">
                  {(() => {
                    // we have a user and is part of the campaign
                    if (user && user.campaigns && user.campaigns.length) {
                      return (
                        <Link className="btn btn-primary" to="/app/actions">
                          Go To Actions
                        </Link>
                      )
                    }

                    return (
                      <Link className="btn btn-primary" to={`/app/join/${id}`}>
                        Add your name
                      </Link>
                    )
                  })()}
                </div>
              </div>
              <div className="our-voices">
                <h3 className="our-voices__title">our voices</h3>
                <ul className="our-voices__list">
                  {feed.map(({ picture, username, status }, index) => (
                    <li
                      className="our-voices__list-item"
                      key={`striker-${index}`}
                    >
                      <div className="our-voices__img">
                        <img
                          src={picture.publicURL}
                          alt={'user profile picture'}
                        />
                      </div>
                      <p className="our-voices__content">
                        <strong>{username}</strong> {status}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Join
