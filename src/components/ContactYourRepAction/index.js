// @flow

import React, { useEffect } from 'react'
import _ from 'lodash'
import { useMutation } from '@apollo/react-hooks'
import { navigate } from 'gatsby'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { UPSERT_USER_ACTION } from '../../api'

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

type Props = {
  slug: String
}

const ContactYourRepForm = ({ slug }: Props) => {
  // Complete action mutation
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

  // Load contact form
  useEffect(() => {
    const script = document.createElement('script')

    script.src = '//engage.newmode.net/embed/6866/11617.js'
    script.async = true

    // this is here just for testing
    // TODO: add proper completition trigger
    script.onload = () => {
      _.delay(
        () => upsertUserAction({ variables: { slug, completed: true } }),
        5000
      )
    }

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [slug, upsertUserAction])

  return (
    <Row>
      <Col>
        <div id="newmode-embed-6866-11617">Loading...</div>
      </Col>
    </Row>
  )
}

const ContactYourRepAction = ({ slug }: Props) => {
  return (
    <Container className="action-detail">
      <ContactYourRepHeader />
      <ContactYourRepForm slug={slug} />
      <ContactYourRepFooter />
    </Container>
  )
}

export default ContactYourRepAction
