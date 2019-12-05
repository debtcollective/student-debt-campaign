// @flow

import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { navigate } from 'gatsby'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { UPSERT_USER_ACTION, GET_USER_ACTIONS } from '../../api'

const CampusGroupActionHeader = () => (
  <>
    <Row>
      <Col>
        <h1 className="text-center">Start a Campus Group</h1>
      </Col>
    </Row>
    <Row className="mt-4 mb-5">
      <Col>
        <p>
          Click the link below for more information on how to start a campus.
        </p>
      </Col>
    </Row>
  </>
)

const CampusGroupActionFooter = () => (
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

const CampusGroupActionForm = ({ slug }: Props) => {
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
    },
    refetchQueries: [{ query: GET_USER_ACTIONS }]
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
          How to start a campus group
        </a>
      </Col>
    </Row>
  )
}

const CampusGroupAction = ({ slug }: Props) => {
  return (
    <Container className="action-detail">
      <CampusGroupActionHeader />
      <CampusGroupActionForm slug={slug} />
      <CampusGroupActionFooter />
    </Container>
  )
}

export default CampusGroupAction
