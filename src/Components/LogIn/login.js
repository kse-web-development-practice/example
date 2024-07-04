import React from 'react'

import styles from './login.module.css'
import PropTypes from 'prop-types'

export const LogIn = ({ isLogged, onClick = () => {} }) => {
  return (
    <div className={styles.login} onClick={onClick}>
      <span>{isLogged ? 'Log Out' : 'Log In'}</span>
    </div>
  )
}

LogIn.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  onClick: PropTypes.func
}
