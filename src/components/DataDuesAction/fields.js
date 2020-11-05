/* global Sentry */

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
import AlgoliaPlaces from 'algolia-places-react'
import classNames from 'classnames'
import { Form } from 'react-bootstrap'
import { unknown } from './schema'

export const AlgoliaPlacesField = ({
  name,
  register,
  unregister,
  setValue,
  defaultValue,
  isInvalid,
  ...props
}) => {
  useEffect(() => {
    register(name)
    return () => unregister(name)
  }, [name, register, unregister])

  const fieldName = name
  const cssClasses = classNames('form-control', { 'is-invalid': isInvalid })

  return (
    <AlgoliaPlaces
      className={cssClasses}
      placeholder="Start typing..."
      options={{
        countries: ['us'],
        type: 'address'
      }}
      defaultValue={defaultValue}
      onChange={({ suggestion }) => {
        const {
          administrative,
          city,
          country,
          countryCode,
          county,
          latlng,
          name,
          postcode,
          postcodes,
          suburb,
          type,
          value
        } = suggestion

        const addressObject = {
          administrative,
          city,
          country,
          countryCode,
          county,
          latlng,
          name,
          postcode,
          postcodes,
          suburb,
          type,
          value
        }

        setValue(fieldName, addressObject, { shouldDirty: true })
      }}
      onClear={() => setValue(name, {}, { shouldDirty: true })}
      onLimit={(message) => Sentry.captureMessage(message)}
      onError={(message) => Sentry.captureMessage(message)}
      {...props}
    />
  )
}

AlgoliaPlacesField.propTypes = {
  isInvalid: PropTypes.bool,
  defaultValue: PropTypes.string,
  name: PropTypes.string,
  register: PropTypes.func,
  setValue: PropTypes.func,
  unregister: PropTypes.func
}

export const PhoneNumberField = ({
  name,
  register,
  unregister,
  setValue,
  defaultValue,
  ...props
}) => {
  useEffect(() => {
    register(name)
    return () => unregister(name)
  }, [name, register, unregister])

  return (
    <NumberFormat
      type="tel"
      placeholder="(202) 401-3000"
      customInput={Form.Control}
      defaultValue={defaultValue}
      onValueChange={({ formattedValue, value }) => {
        setValue(name, formattedValue || value, { shouldDirty: true })
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
    register(name, { required: true })
    return () => unregister(name)
  }, [name, register, unregister])

  return (
    <NumberFormat
      allowNegative={false}
      customInput={Form.Control}
      decimalScale={2}
      defaultValue={defaultValue}
      isNumericString={true}
      onValueChange={({ floatValue }) =>
        setValue(name, floatValue, { shouldDirty: true })
      }
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
    register(name)
    return () => unregister(name)
  }, [name, register, unregister])

  let isNumericString = true
  let placeholder = '4.53%'

  if (defaultValue === unknown) {
    isNumericString = false
    placeholder = unknown
  }

  return (
    <NumberFormat
      allowNegative={false}
      customInput={Form.Control}
      decimalScale={2}
      defaultValue={defaultValue}
      isNumericString={isNumericString}
      onValueChange={({ floatValue }) =>
        setValue(name, floatValue, { shouldDirty: true })
      }
      placeholder={placeholder}
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
