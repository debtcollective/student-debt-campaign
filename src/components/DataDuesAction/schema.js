import * as yup from 'yup'

export const debtTypes = [
  'Student debt',
  'Housing debt',
  'Medical debt',
  'Court or bail fees',
  'Payday loans',
  'Auto loan',
  'Credit card debt',
  'Other'
]
export const studentDebtTypes = [
  'Federal loan',
  'Parent Plus loan',
  'Private loan'
]
export const accountStatuses = [
  'In repayment',
  'Late on payments',
  'Forbearance/Deferment',
  'Sent to collections'
]

export const unknown = 'Unknown'

const phoneRegExp = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/

export const validationSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(5, 'Full name must be at least ${min} characters') // eslint-disable-line no-template-curly-in-string
    .required('Full name is a required field'),
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is a required field'),
  // for backwards compatibility
  streetAddress: yup.string(),
  address: yup.object().shape({
    name: yup.string().required('Address is required'),
    administrative: yup.string(),
    county: yup.string(),
    city: yup.string(),
    suburb: yup.string(),
    country: yup.string(),
    countryCode: yup.string(),
    type: yup.string(),
    latlng: yup.object().shape({
      lat: yup.number(),
      lng: yup.number()
    }),
    postcode: yup.string(),
    postcodes: yup.array().of(yup.string()),
    value: yup.string()
  }),
  phoneNumber: yup.string().matches(phoneRegExp, {
    message: 'Phone number must be valid',
    excludeEmptyString: true
  }),
  debts: yup.array().of(
    yup.object().shape({
      debtType: yup
        .mixed()
        .oneOf([...debtTypes, unknown], 'Debt type is required'),
      studentDebtType: yup
        .mixed()
        .oneOf([...studentDebtTypes, unknown], 'Student debt type is required'),
      amount: yup.number().required('Amount is required'),
      interestRate: yup.string().required('Interest rate is required'),
      creditor: yup.string().required('This field is required'),
      accountStatus: yup
        .mixed()
        .oneOf([...accountStatuses, unknown], 'Account status is required'),
      beingHarrased: yup.string().required('You need to answer this question'),
      harrasmentDescription: yup.string().when('beingHarrased', {
        is: 'true',
        then: yup.string().required()
      })
    })
  )
})
