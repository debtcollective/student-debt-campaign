import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-jsonschema-form";

const schema = {
  type: "object",
  properties: {
    personalInformation: {
      title: "Personal information",
      type: "object",
      required: ["fullName", "email"],
      properties: {
        fullName: {
          type: "string",
          title: "Full name"
        },
        email: {
          type: "string",
          format: "email",
          title: "Email"
        },
        streetAddress: {
          type: "string",
          title: "Street address",
          minLength: 3
        },
        phoneNumber: {
          type: "string",
          title: "Phone number",
          pattern: "^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$",
          minLength: 10
        }
      }
    },
    debts: {
      title: "Your Debts",
      description:
        "Please provide as much information about each account as you can.",
      type: "object",
      properties: {
        debtType: {
          type: "string",
          title: "Debt type"
        },
        studentDebtType: {
          type: "string",
          format: "email",
          title: "Student debt type"
        },
        amount: {
          type: "string",
          title: "Amount",
          minLength: 3
        },
        interestRates: {
          type: "string",
          title: "Interest rates",
          minLength: 3
        },
        creditor: {
          type: "string",
          title: "Creditor",
          minLength: 10
        },
        accountStatus: {
          type: "string",
          title: "Account status",
          minLength: 10
        },
        beingHarrased: {
          type: "boolean",
          enumNames: ["Yes", "No"],
          title: "Are you being harrased by creditors or debt collectors?"
        },
        harrasmentDescription: {
          type: "string",
          title: "Describe the harrasment"
        }
      }
    }
  }
};

const uiSchema = {
  personalInformation: {
    fullName: {
      "ui:placeholder": "Bernie Sanders"
    },
    email: {
      "ui:placeholder": "bernie@berniesanders.com"
    }
  },
  debts: {
    beingHarrased: {
      "ui:widget": "radio"
    },
    harrasmentDescription: {
      "ui:widget": "textarea"
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
      <Form schema={schema} uiSchema={uiSchema} onSubmit={handleSubmit}>
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
