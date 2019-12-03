import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { Alert as BootstrapAlert } from 'react-bootstrap'

const Alert = ({ message, variant, handleClose }) => {
  const [show, setShow] = useState(true)

  const onClose = () => {
    setShow(false)

    const pathname = window && window.location.pathname

    // this is used as a hack to clear the state in location.state
    // it is persisted across renders and in this case we don't need that
    if (pathname) {
      navigate(pathname, {})
    }
  }

  if (show && message) {
    return (
      <div className="alert-wrapper">
        <BootstrapAlert
          variant={variant}
          onClose={onClose}
          className="alert-app"
          dismissible
        >
          <p>{message}</p>
        </BootstrapAlert>
      </div>
    )
  }

  return null
}

Alert.propTypes = {
  message: PropTypes.string,
  variant: PropTypes.string,
  handleClose: PropTypes.func
}

Alert.defaultProps = {
  variant: 'warning',
  handleClose: () => {}
}

export default Alert
