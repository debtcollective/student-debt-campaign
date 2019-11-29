import React from 'react'
import Markdown from 'markdown-to-jsx'
import PropTypes from 'prop-types'

if (typeof window !== 'undefined') {
  require('details-polyfill')
}

const FAQ = ({ entries }) => (
  <section id="faq" className="faq">
    <div className="container-fluid distribute-rows">
      <div className="row">
        <div className="col">
          <div className="text-center">
            <h1 className="display-title">FAQ</h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="collapsable-list">
            {entries.map(({ question, answer }, index) => (
              <details
                key={`faq-question-${index}`}
                className="collapsable-list__item"
              >
                <summary className="summary">{question}</summary>
                <Markdown className="content">{answer}</Markdown>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
)

FAQ.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string,
      answer: PropTypes.string
    })
  )
}

export default FAQ
