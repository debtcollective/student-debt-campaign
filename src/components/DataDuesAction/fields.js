import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
import AlgoliaPlaces from 'algolia-places-react'
import { Form } from 'react-bootstrap'

export const AlgoliaPlacesField = props => {
  return (
    <AlgoliaPlaces
      placeholder="Write an address here"
      options={{
        countries: ['us']
      }}
      onChange={({ query, rawAnswer, suggestion, suggestionIndex }) =>
        console.log(
          'Fired when suggestion selected in the dropdown or hint was validated.'
        )
      }
      onSuggestions={({ rawAnswer, query, suggestions }) =>
        console.log(
          'Fired when dropdown receives suggestions. You will receive the array of suggestions that are displayed.'
        )
      }
      onCursorChanged={({ rawAnswer, query, suggestion, suggestonIndex }) =>
        console.log('Fired when arrows keys are used to navigate suggestions.')
      }
      onClear={() => console.log('Fired when the input is cleared.')}
      onLimit={({ message }) =>
        console.log('Fired when you reached your current rate limit.')
      }
      onError={({ message }) =>
        console.log(
          'Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit.'
        )
      }
      {...props}
    />
  )
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
    register(name)
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
