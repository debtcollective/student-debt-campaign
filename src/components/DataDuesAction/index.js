import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useForm from 'react-hook-form'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'

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

const DebtForm = ({ debtId, register, unregister, watch }) => {
  // TODO: add default values
  const selectedDebtType = watch(`debts[${debtId}].debtType`)
  const isStudentDebt = selectedDebtType === 'Student debt'

  const beingHarrasedOption = watch(`debts[${debtId}].beingHarrased`)
  const isBeingHarrased = beingHarrasedOption === 'Yes'

  return (
    <>
      <Form.Group controlId="debtType">
        <Form.Label>Debt type</Form.Label>
        <Form.Control
          as="select"
          name={`debts[${debtId}].debtType`}
          ref={register({ required: true })}
        >
          {debtTypes.map(item => (
            <option key={item}>{item}</option>
          ))}
        </Form.Control>
      </Form.Group>

      {isStudentDebt && (
        <Form.Group controlId="studentDebtType">
          <Form.Label>Student debt type</Form.Label>
          <Form.Control
            as="select"
            name={`debts[${debtId}].studentDebtType`}
            ref={register({ required: true })}
          >
            {studentDebtType.map(item => (
              <option key={item}>{item}</option>
            ))}
          </Form.Control>
        </Form.Group>
      )}

      <Form.Group controlId="amount">
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

      <Form.Group controlId="interestRate">
        <Form.Label>Interest rate</Form.Label>
        <Form.Control
          type="text"
          placeholder="%5.5"
          name={`debts[${debtId}].interestRate`}
          ref={register}
        />
        <Form.Check
          inline
          type="checkbox"
          id="interestRateUnknown"
          label="I don't know my interest rate"
        />
      </Form.Group>

      <Form.Group controlId="interestRate">
        <Form.Label>Creditor</Form.Label>
        <Form.Control
          type="text"
          placeholder="Sallie Mae"
          name={`debts[${debtId}].creditor`}
          ref={register}
        />
        <Form.Check
          inline
          type="checkbox"
          id="creditorUnknown"
          label="I don't know my creditor"
        />
      </Form.Group>

      <Form.Group controlId="accountStatus">
        <Form.Label>Account status</Form.Label>
        <Form.Control
          as="select"
          name={`debts[${debtId}].accountStatus`}
          ref={register}
        >
          {accountStatus.map(item => (
            <option key={item}>{item}</option>
          ))}
        </Form.Control>
        <Form.Check
          inline
          type="checkbox"
          id="accountStatusUnknown"
          label="I don't know my account status"
        />
      </Form.Group>

      <Form.Group controlId="beingHarrased">
        <Form.Label>
          Are you being harrased by creditors or debt collectors?
        </Form.Label>
        <Form.Check
          type="radio"
          id="beingHarrasedYes"
          label="Yes"
          value="Yes"
          name={`debts[${debtId}].beingHarrased`}
          ref={register}
        />
        <Form.Check
          type="radio"
          id="beingHarrasedNo"
          name={`debts[${debtId}].beingHarrased`}
          value="No"
          ref={register}
          label="No"
        />
      </Form.Group>

      {isBeingHarrased && (
        <Form.Group controlId="harrasmentDescription">
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
  debtId: PropTypes.string,
  register: PropTypes.func,
  unregister: PropTypes.func,
  watch: PropTypes.func
}

const DataDuesForm = ({ onSubmit = data => console.log(data) }) => {
  const { register, handleSubmit, watch, unregister } = useForm()
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
