import React from 'react'
import styles from './styles.module.css'
import PropTypes from 'prop-types'

export const Textarea = ({ onChange = '', defaultValue = '' }) => {
  return (
    <textarea className={styles.textarea} onChange={onChange}>
      {defaultValue}
    </textarea>
  )
}

Textarea.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string
}
