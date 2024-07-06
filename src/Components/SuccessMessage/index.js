import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'

export const SuccessMessage = ({ message }) => {
  return <div className={styles.success}>{message}</div>
}

SuccessMessage.propTypes = {
  message: PropTypes.string.isRequired
}
