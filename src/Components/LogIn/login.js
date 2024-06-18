import React from 'react'

import styles from './login.module.css'
import PropTypes from 'prop-types'

export const LogIn = ({ isLogged }) => {
  return (
    <div className={styles.login}>
      <span>{isLogged ? 'Log In' : 'Log Out'}</span>
    </div>
  )
}

LogIn.propTypes = {
  isLogged: PropTypes.bool.isRequired
}
