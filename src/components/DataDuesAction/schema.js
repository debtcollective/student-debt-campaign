const schema = {
  definitions: {
    debt: {
      type: 'object',
      properties: {
        debtType: {
          type: 'string',
          title: 'Debt type',
          enum: [
            'Student debt',
            'Housing debt',
            'Medical debt',
            'Court or bail fees',
            'Payday loans',
            'Auto loan',
            'Credit card debt',
            'Other'
          ]
        },
        amount: {
          type: 'number',
          title: 'Amount'
        },
        interestRate: {
          type: 'number',
          title: 'Interest rate',
          maxLength: 4,
          minLength: 1
        },
        creditor: {
          type: 'string',
          title: 'Creditor',
          minLength: 10
        },
        accountStatus: {
          type: 'string',
          title: 'Account status',
          enum: [
            'In repayment',
            'Late on payments',
            'Stopped payments',
            'Sent to collections'
          ]
        },
        beingHarrased: {
          type: 'boolean',
          enumNames: ['Yes', 'No'],
          title: 'Are you being harrased by creditors or debt collectors?'
        },
        harrasmentDescription: {
          type: 'string',
          title: 'Describe the harrasment'
        }
      },
      required: ['debtType', 'amount', 'beingHarrased'],
      dependencies: {
        debtType: {
          oneOf: [
            {
              properties: {
                debtType: {
                  enum: ['Student debt']
                },
                studentDebtType: {
                  type: 'string',
                  title: 'Student debt type',
                  enum: [
                    'Subsidized Stafford',
                    'Unsubsidized Stafford',
                    'Parent PLUS',
                    'Private Student loans'
                  ]
                }
              },
              required: ['studentDebtType']
            }
          ]
        }
      }
    }
  },
  type: 'object',
  properties: {
    personalInformation: {
      title: 'Personal information',
      type: 'object',
      required: ['fullName', 'email'],
      properties: {
        fullName: {
          type: 'string',
          title: 'Full name'
        },
        email: {
          type: 'string',
          format: 'email',
          title: 'Email'
        },
        streetAddress: {
          type: 'string',
          title: 'Street address',
          minLength: 3
        },
        phoneNumber: {
          type: 'string',
          title: 'Phone number',
          pattern: '^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$',
          minLength: 10
        }
      }
    },
    debts: {
      title: 'Your Debts',
      description:
        'Please provide as much information about each account as you can.',
      type: 'array',
      items: [
        {
          $ref: '#/definitions/debt'
        }
      ],
      additionalItems: {
        $ref: '#/definitions/debt'
      }
    }
  }
}

export default schema
