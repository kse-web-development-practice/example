import React from 'react'
import styles from './styles.module.css'
import PropTypes from 'prop-types'

export const Input = ({ onChange, placeholder = '', type = 'text', defaultValue }) => {
  return (
    <input
      defaultValue={defaultValue}
      className={styles.input}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
  )
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.string
}
