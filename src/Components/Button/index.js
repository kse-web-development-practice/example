import React from 'react'
import PropTypes from 'prop-types'
import styles from './button.module.css'

export const Button = ({ children, onClick = () => {}, disabled = false }) => {
  return (
    <button disabled={disabled} onClick={onClick} className={styles.button}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.node,
  disabled: PropTypes.bool
}

Button.defaultProps = {
  children: <>Button</>
}
