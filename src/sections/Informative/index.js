import React from 'react'
import PropTypes from 'prop-types'
import Markdown from 'markdown-to-jsx'

const Informative = ({ title, children, remark }) => (
  <section className="informative">
    <div className="container-fluid distribute-rows justify-content-center extra-pad">
      <div className="row">
        <div className="col">
          <div className="text-center">
            <h1 className="informative__title">{title}</h1>
          </div>
          <div className="informative__content">
            <Markdown>{children}</Markdown>
          </div>
          <p className="informative__content">
            <strong>{remark}</strong>
          </p>
        </div>
      </div>
    </div>
  </section>
)

Informative.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  remark: PropTypes.string
}

export default Informative
