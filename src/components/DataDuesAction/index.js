// @flow

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import Markdown from 'markdown-to-jsx'
import _ from 'lodash'
import { useMutation } from '@apollo/react-hooks'
import { navigate } from 'gatsby'
import { Container, Row, Col, Button, ButtonGroup, Form } from 'react-bootstrap'
import {
  AlgoliaPlacesField,
  CurrencyField,
  PhoneNumberField,
  PercentageField
} from './fields'
import { UPSERT_DATA_DUES_ACTION, GET_USER_ACTIONS } from '../../api'
import {
  debtTypes,
  studentDebtTypes,
  accountStatuses,
  unknown,
  validationSchema
} from './schema'

export const DataDuesHeader = ({
  title,
  description
}: {
  title: string,
  description: string
}) => (
  <>
    <Row>
      <Col>
        <h1 className="text-center text-monospace">{title}</h1>
      </Col>
    </Row>
    <Row className="my-4">
      <Col>
        <Markdown className="markdown-content" options={{ forceBlock: true }}>
          {description}
        </Markdown>
      </Col>
    </Row>
  </>
)

const DebtForm = ({
  debtId,
  errors,
  register,
  setValue,
  unregister,
  watch
}) => {
  /**
   * Initial Values
   * used for controlled components to have a defaultValue
   * and for conditional rendering of components
   */
  const debtType = watch(`debts[${debtId}].debtType`)
  const amount = watch(`debts[${debtId}].amount`)
  const interestRate = watch(`debts[${debtId}].interestRate`)
  const creditor = watch(`debts[${debtId}].creditor`)
  const accountStatus = watch(`debts[${debtId}].accountStatus`)
  const beingHarrased = watch(`debts[${debtId}].beingHarrased`)

  const isStudentDebt = debtType === 'Student debt'
  const isBeingHarrased = beingHarrased === 'true'

  // onChange handler for "I don't know" checkboxes
  const onChange = (name, setDisabled, event) => {
    const isChecked = event.target.checked
    const value = isChecked ? unknown : ''

    setValue(name, value, true)
    setDisabled(isChecked)
  }

  /**
   * We are using the following states to programatically disable fields.
   * These is used by fields that have a "I don't know" checkbox
   * If the value is unknown, then the input should be disabled
   *
   */
  const [debtTypeDisabled, setDebtTypeDisabled] = useState(debtType === unknown)
  const [interestRateDisabled, setInterestRateDisabled] = useState(
    interestRate === unknown
  )
  const [creditorDisabled, setCreditorDisabled] = useState(creditor === unknown)
  const [accountStatusDisabled, setAccountStatusDisabled] = useState(
    accountStatus === unknown
  )

  return (
    <>
      <Form.Group controlId={`debtType${debtId}`}>
        <Form.Label>Debt type</Form.Label>
        <Form.Control
          as="select"
          name={`debts[${debtId}].debtType`}
          disabled={debtTypeDisabled}
          defaultValue=""
          ref={register}
          isInvalid={!!errors[`debts[${debtId}].debtType`]}
        >
          <option value="" disabled hidden>
            Select debt type
          </option>
          <option value={unknown} disabled hidden>
            {unknown}
          </option>
          {debtTypes.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors[`debts[${debtId}].debtType`] &&
            errors[`debts[${debtId}].debtType`].message}
        </Form.Control.Feedback>
        <Form.Check
          inline
          onChange={(event) =>
            onChange(`debts[${debtId}].debtType`, setDebtTypeDisabled, event)
          }
          defaultChecked={debtTypeDisabled}
          type="checkbox"
          id={`debtTypeUnknown${debtId}`}
          label="I don't know my debt type"
        />
      </Form.Group>

      {isStudentDebt && (
        <Form.Group controlId={`studentDebtType${debtId}`}>
          <Form.Label>Student debt type</Form.Label>
          <Form.Control
            as="select"
            name={`debts[${debtId}].studentDebtType`}
            defaultValue=""
            ref={register}
            isInvalid={!!errors[`debts[${debtId}].studentDebtType`]}
          >
            <option value="" disabled hidden>
              Select a student debt type
            </option>
            {studentDebtTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors[`debts[${debtId}].studentDebtType`] &&
              errors[`debts[${debtId}].studentDebtType`].message}
          </Form.Control.Feedback>
        </Form.Group>
      )}

      <Form.Group controlId={`amount${debtId}`}>
        <Form.Label>Amount</Form.Label>
        <CurrencyField
          type="text"
          name={`debts[${debtId}].amount`}
          register={register}
          unregister={unregister}
          setValue={setValue}
          defaultValue={amount}
          isInvalid={!!errors[`debts[${debtId}].amount`]}
        />
        <Form.Text className="text-muted">
          You don’t have to know the exact amount. A good guess is fine!
        </Form.Text>
        <Form.Control.Feedback type="invalid">
          {errors[`debts[${debtId}].amount`] &&
            errors[`debts[${debtId}].amount`].message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId={`interestRate${debtId}`}>
        <Form.Label>Interest rate</Form.Label>
        <PercentageField
          name={`debts[${debtId}].interestRate`}
          register={register}
          unregister={unregister}
          setValue={setValue}
          disabled={interestRateDisabled}
          defaultValue={interestRate}
          isInvalid={!!errors[`debts[${debtId}].interestRate`]}
        />
        <Form.Control.Feedback type="invalid">
          {errors[`debts[${debtId}].interestRate`] &&
            errors[`debts[${debtId}].interestRate`].message}
        </Form.Control.Feedback>
        <Form.Check
          inline
          type="checkbox"
          id={`interestRateUnknown${debtId}`}
          defaultChecked={interestRateDisabled}
          onChange={(event) =>
            onChange(
              `debts[${debtId}].interestRate`,
              setInterestRateDisabled,
              event
            )
          }
          label="I don't know my interest rate"
        />
      </Form.Group>

      <Form.Group controlId={`creditor${debtId}`}>
        <Form.Label>{isStudentDebt ? 'Servicer' : 'Creditor'}</Form.Label>
        <Form.Control
          type="text"
          placeholder={isStudentDebt ? 'Navient' : 'Sallie Mae'}
          disabled={creditorDisabled}
          name={`debts[${debtId}].creditor`}
          ref={register}
          isInvalid={!!errors[`debts[${debtId}].creditor`]}
        />
        <Form.Control.Feedback type="invalid">
          {errors[`debts[${debtId}].creditor`] &&
            errors[`debts[${debtId}].creditor`].message}
        </Form.Control.Feedback>
        <Form.Check
          inline
          type="checkbox"
          id={`creditorUnknown${debtId}`}
          defaultChecked={creditorDisabled}
          onChange={(event) =>
            onChange(`debts[${debtId}].creditor`, setCreditorDisabled, event)
          }
          label={`I don't know my ${isStudentDebt ? 'servicer' : 'creditor'}`}
        />
      </Form.Group>

      <Form.Group controlId={`accountStatus${debtId}`}>
        <Form.Label>Account status</Form.Label>
        <Form.Control
          as="select"
          name={`debts[${debtId}].accountStatus`}
          disabled={accountStatusDisabled}
          defaultValue=""
          ref={register}
          isInvalid={!!errors[`debts[${debtId}].accountStatus`]}
        >
          <option value="" disabled hidden>
            Select your account status
          </option>
          <option value={unknown} disabled hidden>
            {unknown}
          </option>
          {accountStatuses.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors[`debts[${debtId}].accountStatus`] &&
            errors[`debts[${debtId}].accountStatus`].message}
        </Form.Control.Feedback>
        <Form.Check
          inline
          type="checkbox"
          id={`accountStatusUnknown${debtId}`}
          defaultChecked={accountStatusDisabled}
          onChange={(event) =>
            onChange(
              `debts[${debtId}].accountStatus`,
              setAccountStatusDisabled,
              event
            )
          }
          label="I don't know my account status"
        />
      </Form.Group>

      <Form.Group controlId={`beingHarrased${debtId}`}>
        <Form.Label>
          Are you being harrased by creditors or debt collectors?
        </Form.Label>
        <Form.Check
          type="radio"
          id={`beingHarrasedNo${debtId}`}
          name={`debts[${debtId}].beingHarrased`}
          value="true"
          ref={register}
          label="Yes"
          isInvalid={!!errors[`debts[${debtId}].beingHarrased`]}
        />
        <Form.Check
          id={`beingHarrasedYes${debtId}`}
          isInvalid={!!errors[`debts[${debtId}].beingHarrased`]}
        >
          <Form.Check.Input
            name={`debts[${debtId}].beingHarrased`}
            isInvalid={!!errors[`debts[${debtId}].beingHarrased`]}
            type="radio"
            ref={register}
            value="false"
          />
          <Form.Check.Label>No</Form.Check.Label>
          <Form.Control.Feedback type="invalid">
            {errors[`debts[${debtId}].beingHarrased`] &&
              errors[`debts[${debtId}].beingHarrased`].message}
          </Form.Control.Feedback>
        </Form.Check>
      </Form.Group>

      {isBeingHarrased && (
        <Form.Group controlId={`harrasmentDescription${debtId}`}>
          <Form.Label>Describe the harrasment</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            name={`debts[${debtId}].harrasmentDescription`}
            ref={register}
            placeholder="Debt collectors knock everyday on my door asking for money"
          />
        </Form.Group>
      )}
    </>
  )
}

DebtForm.propTypes = {
  debtId: PropTypes.number,
  errors: PropTypes.object,
  register: PropTypes.func,
  setValue: PropTypes.func,
  unregister: PropTypes.func,
  watch: PropTypes.func
}

DebtForm.defaultProps = {
  errors: {}
}

const DataDuesForm = ({ userAction }) => {
  // Get data in db to be rendered in the form
  let formData = {}
  if (userAction) {
    formData = userAction.data
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    unregister,
    errors
  } = useForm({
    validationSchema: validationSchema,
    defaultValues: formData
  })

  /**
   * Initial Values
   * used for controlled components to have a defaultValue
   * and for conditional rendering of components
   */
  const phoneNumber = watch('phoneNumber')
  const addressValue = watch('address')
  const address = addressValue && addressValue.value

  const [upsertDataDuesAction, { loading }] = useMutation(
    UPSERT_DATA_DUES_ACTION,
    {
      onCompleted({ userAction }) {
        navigate('/app/actions', {
          state: {
            alert: {
              message: 'Thank you for completing an action. Why stop now?',
              variant: 'success'
            }
          }
        })
      },
      onError({ errors: formErrors }) {
        // set errors to the form
      },
      refetchQueries: [{ query: GET_USER_ACTIONS }]
    }
  )

  const onSubmit = (data) => {
    upsertDataDuesAction({ variables: { data } })
  }

  const [debtCount, setDebtCount] = useState(1)

  const addDebt = () => {
    setDebtCount(debtCount + 1)
  }

  const removeDebt = () => {
    setDebtCount(debtCount - 1)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="action-detail">
      <div className="form-section">
        <h3 className="mb-2 text-monospace">Personal information</h3>
        <Form.Group controlId="fullName">
          <Form.Label>Full name</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            placeholder="Betsy DeVos"
            ref={register}
            isInvalid={!!errors.fullName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.fullName && errors.fullName.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="betsy.devos@ed.gov"
            name="email"
            ref={register}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email && errors.email.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="streetAddress">
          <Form.Label>Street Address</Form.Label>
          <AlgoliaPlacesField
            name="address"
            register={register}
            unregister={unregister}
            setValue={setValue}
            isInvalid={!!errors.address}
            defaultValue={address}
          />
          {!!errors.address && <div className="is-invalid" />}
          <Form.Control.Feedback type="invalid">
            {!!errors.address && 'Select a valid address'}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone number</Form.Label>
          <PhoneNumberField
            name="phoneNumber"
            register={register}
            unregister={unregister}
            setValue={setValue}
            defaultValue={phoneNumber}
            isInvalid={!!errors.phoneNumber}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phoneNumber && errors.phoneNumber.message}
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="form-section">
        <h3 className="mb-2 text-monospace">Your debts</h3>
        {_.range(debtCount).map((debtIndex) => (
          <div key={debtIndex}>
            {debtIndex > 0 && <hr />}
            <DebtForm
              debtId={debtIndex}
              register={register}
              watch={watch}
              unregister={unregister}
              setValue={setValue}
              errors={errors}
            />
          </div>
        ))}
        <div>
          <Row>
            <Col>
              <ButtonGroup size="lg" aria-label="Add/remove debt type">
                <Button variant="info" onClick={addDebt}>
                  Add another debt type
                </Button>
                {debtCount > 1 && (
                  <Button variant="dark" onClick={removeDebt}>
                    Remove debt type
                  </Button>
                )}
              </ButtonGroup>
            </Col>
          </Row>
        </div>
      </div>
      <Row className="confirmation-row">
        <Col>
          <div className="text-left">
            <Button
              variant="secondary"
              onClick={() => {
                navigate('/app/actions')
              }}
            >
              Go back
            </Button>
          </div>
        </Col>
        <Col>
          <div className="text-right">
            <Button variant="primary" type="submit" disabled={loading}>
              Save information
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  )
}

DataDuesForm.propTypes = {
  userAction: PropTypes.object
}

DataDuesForm.defaultValues = {
  userAction: {}
}

type DataDuesActionProps = {
  user: User,
  slug: string,
  userAction: any,
  title: string,
  description: string
}

const DataDuesAction = ({
  user,
  slug,
  userAction,
  title,
  description
}: DataDuesActionProps) => {
  // TODO: do something with user and slug
  return (
    <Container className="container-standard-font">
      <DataDuesHeader title={title} description={description} />
      <DataDuesForm userAction={userAction} />
    </Container>
  )
}

export default DataDuesAction
