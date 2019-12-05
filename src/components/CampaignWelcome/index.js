// @flow

import React from 'react'
import { navigate } from 'gatsby'
import { Container, Row, Col, Button } from 'react-bootstrap'

const CampaignWelcomeHeader = () => (
  <>
    <Row>
      <Col>
        <h1 className="text-center">Thank you for joining!</h1>
      </Col>
    </Row>
    <Row className="my-4">
      <Col>
        <p>
          We are trilled to have you. If you want to be an active supporter,
          there&apos;s a list of actions you can do to spread the word about the
          strike.
        </p>
        <p className="mt-3">Click the button below to know more</p>
      </Col>
    </Row>
  </>
)

const CampaignWelcomeFooter = () => (
  <Row>
    <Col>
      <div className="text-center">
        <Button
          className="normal"
          variant="primary"
          onClick={() => {
            navigate('/app/actions')
          }}
        >
          Go to actions list
        </Button>
      </div>
    </Col>
  </Row>
)

const CampaignWelcome = () => {
  return (
    <Container className="action-detail">
      <CampaignWelcomeHeader />
      <CampaignWelcomeFooter />
    </Container>
  )
}

export default CampaignWelcome
