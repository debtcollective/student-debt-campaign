// @flow

import React from 'react'
import { navigate } from 'gatsby'
import { Container, Row, Col, Button } from 'react-bootstrap'

const CampaignWelcomeHeader = () => (
  <>
    <Row>
      <Col>
        <h1 className="text-center section-title mb-0 text-monospace">
          Thank you for joining!
        </h1>
      </Col>
    </Row>
    <Row className="my-5">
      <Col>
        <p>
          Thousands of Debt Collective members are working together to win a
          debt jubilee and free college. For additional actions that you can
          take, click below.
        </p>
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
