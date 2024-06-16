import React from 'react'
import PropTypes from 'prop-types'
import * as styles from './button.module.css'

export const Button = ({ children }) => {
  return <button className={styles.button}>{children}</button>
}

Button.propTypes = {
  children: PropTypes.node.isRequired
}

Button.defaultProps = {
  children: <>Button</>
}
