// @flow

import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { navigate } from 'gatsby'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { UPSERT_USER_ACTION } from '../../api'

const ContributeIdeasActionHeader = () => (
  <>
    <Row>
      <Col>
        <h1 className="text-center">Contribute Your Ideas</h1>
      </Col>
    </Row>
    <Row className="mt-4 mb-5">
      <Col>
        <p>
          Click the link below for more information on how to contribute your
          ideas.
        </p>
      </Col>
    </Row>
  </>
)

const ContributeIdeasActionFooter = () => (
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

const ContributeIdeasActionForm = ({ slug }: Props) => {
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
          How to contribute your ideas
        </a>
      </Col>
    </Row>
  )
}

const ContributeIdeasAction = ({ slug }: Props) => {
  return (
    <Container className="action-detail">
      <ContributeIdeasActionHeader />
      <ContributeIdeasActionForm slug={slug} />
      <ContributeIdeasActionFooter />
    </Container>
  )
}

export default ContributeIdeasAction
