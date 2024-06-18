import React from 'react'
import PropTypes from 'prop-types'

import styles from './header.module.css'

export const Header = ({ children }) => {
  return <div className={styles.header}>{children}</div>
}

Header.propTypes = {
  children: PropTypes.node
}

export const HeaderLeft = ({ children }) => {
  return <div className={styles.left}>{children}</div>
}

HeaderLeft.propTypes = {
  children: PropTypes.node
}

export const HeaderRight = ({ children }) => {
  return <div className={styles.right}>{children}</div>
}

HeaderRight.propTypes = {
  children: PropTypes.node
}
