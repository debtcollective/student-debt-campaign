// @flow

import React from 'react'

import IconWrap from '../../components/IconWrap'
import { Link } from 'react-scroll'

const getBg = (index) => {
  switch (index) {
    case 1:
      return 'yellow'
    case 2:
      return 'green'
    default:
      return 'purple'
  }
}

type Props = {
  title: Array<string>,
  actions: Array<{
    image: ChildImageSharp,
    join_section_id: string,
    title: string
  }>,
  counters: Array<CounterEntry>
}

const Hero = ({ title, actions, counters }: Props) => {
  const totalCount =
    counters &&
    counters
      .map((countByCampaign) => Number(countByCampaign.count) || 0)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)

  return (
    <section className="hero">
      <div className="container-fluid distribute-rows">
        <div className="row">
          <div className="col">
            <div className="text-center">
              <h1 className="display-title">
                {title.map((line, index) => {
                  const classes = (index % 2 === 0 && 'text-primary') || ''

                  return (
                    <span
                      key={`line-${index}`}
                      className={`d-block ${classes}`}
                    >
                      {line}
                    </span>
                  )
                })}
              </h1>
              <p className="headline mt-xs-3 mb-sm-5 mb-xl-0 mt-xl-0">
                There are currently{' '}
                <span className="text-body-color">{totalCount}</span> people in
                the fight!
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="action-circle-wrap">
              {actions.map(
                ({ join_section_id: joinSectionId, title, image }, index) => (
                  <Link
                    className="action-circle-link"
                    duration={500}
                    key={joinSectionId}
                    smooth={true}
                    to={joinSectionId}
                  >
                    <div className={`action-circle bg-${getBg(index)}`}>
                      <div className="action-circle__img">
                        <img
                          src={
                            image.src.childImageSharp
                              ? image.src.childImageSharp.fluid.src
                              : image.src
                          }
                          alt={image.alt}
                        />
                      </div>
                      <p className="action-circle__title">{title}</p>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
        <div className="row d-none d-xl-flex">
          <div className="col">{/* allow to push arrow to center */}</div>
          <div className="col">
            <div className="d-flex justify-content-center">
              <IconWrap role="button" src="/img/arrow-down.svg" />
            </div>
          </div>
          <div className="col" />
        </div>
      </div>
    </section>
  )
}

export default Hero
