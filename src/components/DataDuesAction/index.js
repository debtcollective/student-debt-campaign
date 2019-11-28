import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useForm from 'react-hook-form'
import { useMutation } from '@apollo/react-hooks'
import _ from 'lodash'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { CurrencyField, PhoneNumberField, PercentageField } from './fields'
import { CREATE_DATA_DUES_ACTION } from '../../api'
import {
  debtTypes,
  studentDebtTypes,
  accountStatuses,
  unknown,
  validationSchema
} from './schema'
import './styles.scss'

const DataDuesHeader = () => (
  <>
    <Row>
      <Col>
        <h1 className="text-center">Data Dues</h1>
      </Col>
    </Row>
    <Row className="mt-4 mb-5">
      <Col>
        <p>
          Thank you for offering your data to the Debt Collective. The more info
          we have about the debts many of us have in common, the better we can
          fight back together.
        </p>
        <p className="mt-2">
          All information provided will be securely stored in our servers. We
          won&apos;t share this information with corporations.
        </p>
      </Col>
    </Row>
  </>
)

const DataDuesThankYou = () => (
  <>
    <Row>
      <Col>
        <h2 className="text-center">Thank you! 🎉</h2>
      </Col>
    </Row>
    <Row className="mt-4 mb-5">
      <Col>
        <p>We will keep your data safe and only use it for research.</p>
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
  const selectedDebtType = watch(`debts[${debtId}].debtType`)
  const isStudentDebt = selectedDebtType === 'Student debt'

  const beingHarrasedOption = watch(`debts[${debtId}].beingHarrased`)
  const isBeingHarrased = beingHarrasedOption === 'true'

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
   */
  const [debtTypeDisabled, setDebtTypeDisabled] = useState(false)
  const [interestRateDisabled, setInterestRateDisabled] = useState(false)
  const [creditorDisabled, setCreditorDisabled] = useState(false)
  const [accountStatusDisabled, setAccountStatusDisabled] = useState(false)

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
          {debtTypes.map(item => (
            <option key={item}>{item}</option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors[`debts[${debtId}].debtType`] &&
            errors[`debts[${debtId}].debtType`].message}
        </Form.Control.Feedback>
        <Form.Check
          inline
          onChange={event =>
            onChange(`debts[${debtId}].debtType`, setDebtTypeDisabled, event)
          }
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
            {studentDebtTypes.map(item => (
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
          onChange={event =>
            onChange(
              `debts[${debtId}].interestRate`,
              setInterestRateDisabled,
              event
            )
          }
          label="I don't know my interest rate"
        />
      </Form.Group>

      <Form.Group controlId={`interestRate${debtId}`}>
        <Form.Label>Creditor</Form.Label>
        <Form.Control
          type="text"
          placeholder="Sallie Mae"
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
          onChange={event =>
            onChange(`debts[${debtId}].creditor`, setCreditorDisabled, event)
          }
          label="I don't know my creditor"
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
          {accountStatuses.map(item => (
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
          onChange={event =>
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

const DataDuesForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    unregister,
    errors
  } = useForm({
    validationSchema: validationSchema
  })

  const [createDataDuesAction, { data = {}, loading }] = useMutation(
    CREATE_DATA_DUES_ACTION
  )

  const onSubmit = data => {
    createDataDuesAction(data)
  }

  const [debtCount, setDebtCount] = useState(1)

  const addDebt = () => {
    setDebtCount(debtCount + 1)
  }

  const removeDebt = () => {
    setDebtCount(debtCount - 1)
  }

  const { userAction } = data

  if (userAction && userAction.completed) {
    return DataDuesThankYou
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="data-dues-form">
      <div className="mt-4">
        <h3 className="mb-2">Personal information</h3>
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
          <Form.Label>Street address</Form.Label>
          <Form.Control
            type="text"
            placeholder="400 Maryland Avenue, SW. Washington, DC 20202"
            name="streetAddress"
            ref={register()}
          />
        </Form.Group>

        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone number</Form.Label>
          <PhoneNumberField
            name="phoneNumber"
            register={register}
            unregister={unregister}
            setValue={setValue}
            isInvalid={!!errors.phoneNumber}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phoneNumber && errors.phoneNumber.message}
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="mt-4">
        <h3 className="mb-2">Your debts</h3>
        {_.range(debtCount).map(debtIndex => (
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
              <Button variant="secondary" className="mr-5" onClick={addDebt}>
                Add debt
              </Button>
              {debtCount > 1 && (
                <Button variant="secondary" onClick={removeDebt}>
                  Remove debt
                </Button>
              )}
            </Col>
          </Row>
        </div>
      </div>
      <Row className="mt-2">
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
  onSubmit: PropTypes.func
}

const DataDuesAction = () => {
  const handleSubmit = event => {
    event.preventDefault()
  }

  return (
    <Container>
      <DataDuesHeader />
      <DataDuesForm handleSubmit={handleSubmit} />
    </Container>
  )
}

export default DataDuesAction
