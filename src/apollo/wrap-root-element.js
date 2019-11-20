import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import { client } from './client.js'

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)

wrapRootElement.propTypes = {
  element: PropTypes.any
}
