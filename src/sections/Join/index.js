import React from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import Markdown from 'markdown-to-jsx'
import { ADD_USER_TO_CAMPAIGN } from './api'

const formatNumber = number =>
  number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

const Join = ({
  background,
  children,
  colour,
  count,
  feed,
  id,
  image,
  remark,
  title
}) => {
  const [joinToCampaign] = useMutation(ADD_USER_TO_CAMPAIGN)

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
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      joinToCampaign({
                        variables: {
                          motive: id
                        }
                      })
                    }
                  >
                    Add your name
                  </button>
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

Join.propTypes = {
  feed: PropTypes.arrayOf(
    PropTypes.shape({
      picture: PropTypes.any,
      status: PropTypes.string,
      username: PropTypes.string
    })
  ),
  background: PropTypes.any,
  children: PropTypes.string,
  colour: PropTypes.string,
  content: PropTypes.string,
  count: PropTypes.number,
  id: PropTypes.string,
  image: PropTypes.any,
  remark: PropTypes.string,
  title: PropTypes.string
}

export default Join
