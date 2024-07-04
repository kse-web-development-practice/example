import React, { useState } from 'react'
import { Button } from '../Button'
import styles from './styles.module.css'
import PropTypes from 'prop-types'

export const LoginForm = ({ onAuth }) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    onAuth(login, password)
    e.stopPropagation()
    e.preventDefault()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formRow}>
        <input
          className={styles.input}
          onChange={(event) => setLogin(event.target.value)}
          placeholder="login"
          type="text"
        />
      </div>
      <div className={styles.formRow}>
        <input
          onChange={(event) => setPassword(event.target.value)}
          className={styles.input}
          placeholder="password"
          type="password"
        />
      </div>
      <div className={styles.formRow}>
        <Button>Авторизуватись</Button>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  onAuth: PropTypes.func.isRequired
}
