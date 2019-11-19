import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const dataDuesSchema = {
  type: "object",
  properties: {
    personalInformation: {
      fullName: {
        type: "string",
        title: "Full name",
        default: "Bernie Sanders"
      },
      email: {
        type: "string",
        title: "Email",
        default: "Del Aguila"
      },
      streetAddress: {
        type: "",
        title: "Password",
        minLength: 3
      },
      telephone: {
        type: "string",
        title: "Telephone",
        minLength: 10
      }
    }
  }
};

const DataDuesAction = () => {
  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Data Dues</h1>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <p>
            Thank you for offering your data to the Debt Collective. The more
            info we have about the debts many of us have in common, the better
            we can fight back together.
          </p>
          <p className="mt-2">
            All information provided will be securely stored in our servers. We
            won&apos;t share this information with corporations.
          </p>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <div className="text-right">
          <Button variant="primary" type="submit">
            Save information
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default DataDuesAction;
