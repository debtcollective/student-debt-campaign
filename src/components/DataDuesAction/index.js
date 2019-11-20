import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";

const Form = withTheme(MuiTheme);

const schema = {
  definitions: {
    debt: {
      type: "object",
      properties: {
        debtType: {
          type: "string",
          title: "Debt type",
          enum: [
            "Student debt",
            "Housing debt",
            "Medical debt",
            "Court or bail fees",
            "Payday loans",
            "Auto loan",
            "Credit card debt",
            "Other"
          ]
        },
        amount: {
          type: "number",
          title: "Amount"
        },
        interestRate: {
          type: "number",
          title: "Interest rate",
          maxLength: 4,
          minLength: 1
        },
        creditor: {
          type: "string",
          title: "Creditor",
          minLength: 10
        },
        accountStatus: {
          type: "string",
          title: "Account status",
          enum: [
            "In repayment",
            "Late on payments",
            "Stopped payments",
            "Sent to collections"
          ]
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
      },
      required: ["debtType", "amount", "beingHarrased"],
      dependencies: {
        debtType: {
          oneOf: [
            {
              properties: {
                debtType: {
                  enum: ["Student debt"]
                },
                studentDebtType: {
                  type: "string",
                  title: "Student debt type",
                  enum: [
                    "Subsidized Stafford",
                    "Unsubsidized Stafford",
                    "Parent PLUS",
                    "Private Student loans"
                  ]
                }
              },
              required: ["studentDebtType"]
            }
          ]
        }
      }
    }
  },
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
      type: "array",
      items: [
        {
          $ref: "#/definitions/debt"
        }
      ],
      additionalItems: {
        $ref: "#/definitions/debt"
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
    items: [
      {
        "ui:order": [
          "debtType",
          "studentDebtType",
          "amount",
          "interestRate",
          "creditor",
          "accountStatus",
          "beingHarrased",
          "harrasmentDescription"
        ],
        debtType: {
          "ui:placeholder": "Choose an option"
        },
        studentDebtType: {
          "ui:placeholder": "Choose an option"
        },
        creditor: {
          "ui:placeholder": "Sallie Mae"
        },
        beingHarrased: {
          "ui:widget": "radio"
        },
        harrasmentDescription: {
          "ui:widget": "textarea",
          "ui:placeholder": "They knock on my door everyday insulting me"
        }
      }
    ]
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
