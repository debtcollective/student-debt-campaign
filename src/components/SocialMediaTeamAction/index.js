// @flow

import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { navigate } from 'gatsby'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { UPSERT_USER_ACTION } from '../../api'

const SocialMediaTeamActionHeader = () => (
  <>
    <Row>
      <Col>
        <h1 className="text-center">Join Our Social Media Team</h1>
      </Col>
    </Row>
    <Row className="mt-4 mb-5">
      <Col>
        <p>
          Click the link below for more information on how to join our social
          media team.
        </p>
      </Col>
    </Row>
  </>
)

const SocialMediaTeamActionFooter = () => (
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

type Props = {
  slug: String
}

const SocialMediaTeamActionForm = ({ slug }: Props) => {
  const [upsertUserAction] = useMutation(UPSERT_USER_ACTION, {
    onCompleted: () => {
      navigate('/app/actions', {
        state: {
          alert: {
            message:
              "You completed an action! Let's keep going until you complete all!",
            variant: 'success'
          }
        }
      })
    }
  })

  return (
    <Row>
      <Col>
        <a
          href="https://community.debtcollective.org"
          rel="noopener noreferrer"
          target="_blank"
          onClick={() =>
            upsertUserAction({ variables: { slug, completed: true } })
          }
        >
          How to join our social media team
        </a>
      </Col>
    </Row>
  )
}

const SocialMediaTeamAction = ({ slug }: Props) => {
  return (
    <Container className="action-detail">
      <SocialMediaTeamActionHeader />
      <SocialMediaTeamActionForm slug={slug} />
      <SocialMediaTeamActionFooter />
    </Container>
  )
}

export default SocialMediaTeamAction
