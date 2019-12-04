// @flow

import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import { Container, Row, Col, Button } from 'react-bootstrap'

const ContactYourRepHeader = () => (
  <>
    <Row>
      <Col>
        <h1 className="text-center">Contact your Rep</h1>
      </Col>
    </Row>
    <Row className="mt-4 mb-5">
      <Col>
        <p>
          Use the form below to contact your rep about cancelling the student
          debt.
        </p>
      </Col>
    </Row>
  </>
)

const ContactYourRepFooter = () => (
  <Row className="mt-4">
    <Col>
      <div className="text-left">
        <Button
          className="normal"
          variant="secondary"
          onClick={() => {
            navigate('/app/actions')
          }}
        >
          Go back to actions list
        </Button>
      </div>
    </Col>
  </Row>
)

const ContactYourRepForm = () => {
  useEffect(() => {
    const script = document.createElement('script')

    script.src = '//engage.newmode.net/embed/6866/11617.js'
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <Row>
      <Col>
        <div id="newmode-embed-6866-11617">Loading...</div>
      </Col>
    </Row>
  )
}

const ContactYourRepAction = () => {
  return (
    <Container className="action-detail">
      <ContactYourRepHeader />
      <ContactYourRepForm />
      <ContactYourRepFooter />
    </Container>
  )
}

export default ContactYourRepAction
