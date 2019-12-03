import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
import { Form } from 'react-bootstrap'

export const PhoneNumberField = ({
  name,
  register,
  unregister,
  setValue,
  defaultValue,
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
      defaultValue={defaultValue}
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
  setValue: PropTypes.func,
  defaultValue: PropTypes.string
}

export const CurrencyField = ({
  name,
  register,
  unregister,
  setValue,
  defaultValue,
  ...props
}) => {
  useEffect(() => {
    register({ name, required: true })
    return () => unregister(name)
  }, [name, register, unregister])

  return (
    <NumberFormat
      allowNegative={false}
      customInput={Form.Control}
      decimalScale={2}
      defaultValue={defaultValue}
      isNumericString={true}
      onValueChange={({ floatValue }) => setValue(name, floatValue, true)}
      placeholder="$38,000"
      prefix={'$'}
      thousandSeparator={true}
      type="number"
      {...props}
    />
  )
}

CurrencyField.propTypes = {
  name: PropTypes.string,
  register: PropTypes.func,
  unregister: PropTypes.func,
  setValue: PropTypes.func,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export const PercentageField = ({
  name,
  register,
  unregister,
  setValue,
  defaultValue,
  ...props
}) => {
  useEffect(() => {
    register({ name })
    return () => unregister(name)
  }, [name, register, unregister])

  return (
    <NumberFormat
      allowNegative={false}
      customInput={Form.Control}
      decimalScale={2}
      defaultValue={defaultValue}
      isNumericString={true}
      onValueChange={({ floatValue }) => setValue(name, floatValue, true)}
      placeholder="4.53%"
      suffix="%"
      thousandSeparator={false}
      isAllowed={({ formattedValue, floatValue }) =>
        formattedValue === '' || floatValue <= 100
      }
      {...props}
    />
  )
}

PercentageField.propTypes = {
  name: PropTypes.string,
  register: PropTypes.func,
  unregister: PropTypes.func,
  setValue: PropTypes.func,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
