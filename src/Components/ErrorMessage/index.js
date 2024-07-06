import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'

export const ErrorMessage = ({ errorMessage }) => {
  return <div className={styles.error}>{errorMessage}</div>
}

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired
}
