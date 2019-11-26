import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
import { Form } from 'react-bootstrap'

export const PhoneNumberField = ({
  name,
  register,
  unregister,
  setValue,
  ...props
}) => {
  useEffect(() => {
    register({ name })
    return () => unregister(name)
  }, [name, register, unregister])

  return (
    <NumberFormat
      type="tel"
      placeholder="(202) 401-3000"
      customInput={Form.Control}
      onValueChange={({ formattedValue, value }) => {
        setValue(name, formattedValue || value, true)
      }}
      format="(###) ###-####"
      mask="_"
      {...props}
    />
  )
}

PhoneNumberField.propTypes = {
  name: PropTypes.string,
  register: PropTypes.func,
  unregister: PropTypes.func,
  setValue: PropTypes.func
}

export const CurrencyField = ({
  name,
  register,
  unregister,
  setValue,
  ...props
}) => {
  useEffect(() => {
    register({ name, required: true })
    return () => unregister(name)
  }, [name, register, unregister])

  return (
    <NumberFormat
      type="number"
      placeholder="$38,000"
      isNumericString={true}
      onValueChange={({ value }) => setValue(name, value, true)}
      customInput={Form.Control}
      thousandSeparator={true}
      allowNegative={false}
      decimalScale={2}
      prefix={'$'}
      {...props}
    />
  )
}

CurrencyField.propTypes = {
  name: PropTypes.string,
  register: PropTypes.func,
  unregister: PropTypes.func,
  setValue: PropTypes.func
}

export const PercentageField = ({
  name,
  register,
  unregister,
  setValue,
  ...props
}) => {
  useEffect(() => {
    register({ name })
    return () => unregister(name)
  }, [name, register, unregister])

  return (
    <NumberFormat
      placeholder="4.53%"
      customInput={Form.Control}
      onValueChange={({ value }) => setValue(name, value, true)}
      thousandSeparator={false}
      decimalScale={2}
      suffix="%"
      isAllowed={values => {
        const { formattedValue, floatValue } = values
        return formattedValue === '' || floatValue <= 100
      }}
      {...props}
    />
  )
}

PercentageField.propTypes = {
  name: PropTypes.string,
  register: PropTypes.func,
  unregister: PropTypes.func,
  setValue: PropTypes.func
}
