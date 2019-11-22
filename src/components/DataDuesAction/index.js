import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useForm from 'react-hook-form'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'

const debtTypes = [
  'Student debt',
  'Housing debt',
  'Medical debt',
  'Court or bail fees',
  'Payday loans',
  'Auto loan',
  'Credit card debt',
  'Other'
]
const studentDebtType = [
  'Subsidized Stafford',
  'Unsubsidized Stafford',
  'Parent PLUS',
  'Private Student loans'
]
const accountStatus = [
  'In repayment',
  'Late on payments',
  'Stopped payments',
  'Sent to collections'
]

const DataDuesHeader = () => (
  <>
    <Row>
      <Col>
        <h1 className="text-center">Data Dues</h1>
      </Col>
    </Row>
    <Row className="mt-4">
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

const DebtForm = ({ debtId, register, unregister, setValue, watch }) => {
  const unknown = 'Unknown'
  const selectedDebtType = watch(`debts[${debtId}].debtType`)
  const isStudentDebt = selectedDebtType === 'Student debt'

  const beingHarrasedOption = watch(`debts[${debtId}].beingHarrased`)
  const isBeingHarrased = beingHarrasedOption === 'Yes'

  // onChange handler for "I don't know" checkboxes
  const onChange = (name, setDisabled, event) => {
    const isChecked = event.target.checked
    const value = isChecked ? unknown : ''

    setValue(name, value)
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
          ref={register({ required: true })}
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
            ref={register({ required: true })}
          >
            <option value="" disabled hidden>
              Select a student debt type
            </option>
            {studentDebtType.map(item => (
              <option key={item}>{item}</option>
            ))}
          </Form.Control>
        </Form.Group>
      )}

      <Form.Group controlId={`amount${debtId}`}>
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="text"
          placeholder="$38,000"
          name={`debts[${debtId}].amount`}
          ref={register({ required: true })}
        />
        <Form.Text className="text-muted">
          You don’t have to know the exact amount. A good guess is fine!
        </Form.Text>
      </Form.Group>

      <Form.Group controlId={`interestRate${debtId}`}>
        <Form.Label>Interest rate</Form.Label>
        <Form.Control
          type="text"
          placeholder="%5.5"
          disabled={interestRateDisabled}
          name={`debts[${debtId}].interestRate`}
          ref={register}
        />
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
        />
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
        >
          <option value="" disabled hidden>
            Select your account status
          </option>
          <option value={unknown} disabled hidden>
            {unknown}
          </option>
          {accountStatus.map(item => (
            <option key={item}>{item}</option>
          ))}
        </Form.Control>
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
          id={`beingHarrasedYes${debtId}`}
          label="Yes"
          value="Yes"
          name={`debts[${debtId}].beingHarrased`}
          ref={register}
        />
        <Form.Check
          type="radio"
          id={`beingHarrasedNo${debtId}`}
          name={`debts[${debtId}].beingHarrased`}
          value="No"
          ref={register}
          label="No"
        />
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
  register: PropTypes.func,
  unregister: PropTypes.func,
  setValue: PropTypes.func,
  watch: PropTypes.func
}

const DataDuesForm = ({ onSubmit = data => console.log(data) }) => {
  const { register, handleSubmit, watch, setValue, unregister } = useForm()
  const [debts, setDebts] = useState([Date.now()])

  const addDebt = () => {
    // This will give us pseudo unique values
    // Better than using an index
    const debtId = Date.now()
    setDebts([...debts, debtId])
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-4">
        <h3>Personal information</h3>
        <Form.Group controlId="fullName">
          <Form.Label>Full name</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            placeholder="Betsy DeVos"
            ref={register({ required: true })}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="betsy.devos@ed.gov"
            name="email"
            ref={register({ required: true })}
          />
        </Form.Group>

        <Form.Group controlId="streetAddress">
          <Form.Label>Street address</Form.Label>
          <Form.Control
            type="text"
            placeholder="400 Maryland Avenue, SW. Washington, DC 20202"
            name="streetAddress"
            ref={register({ required: true })}
          />
        </Form.Group>

        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="(202) 401-3000"
            name="phoneNumber"
            ref={register({ required: true })}
          />
        </Form.Group>
      </div>

      <div className="mt-4">
        <h3>Your debts</h3>
        {debts.map((debtId, index) => (
          <>
            {index > 0 && <hr />}
            <DebtForm
              debtId={debtId}
              key={debtId}
              register={register}
              watch={watch}
              unregister={unregister}
              setValue={setValue}
            />
          </>
        ))}
        <div>
          <Button variant="secondary" onClick={addDebt}>
            + Add another debt
          </Button>
        </div>
      </div>

      <div className="text-right">
        <Button variant="primary" type="submit">
          Save information
        </Button>
      </div>
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
