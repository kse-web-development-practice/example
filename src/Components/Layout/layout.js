import PropTypes from 'prop-types'
import React from 'react'

import styles from './layout.module.css'

export const Layout = ({ children }) => {
  return <div className={styles.layout}>{children}</div>
}

Layout.propTypes = {
  children: PropTypes.node
}
