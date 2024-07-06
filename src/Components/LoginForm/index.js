import React, { useState } from 'react'
import { Button } from '../Button'
import styles from './styles.module.css'
import PropTypes from 'prop-types'
import { Input } from '../Input'
import { ErrorMessage } from '../ErrorMessage'

export const LoginForm = ({ onAuth, error = null }) => {
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
        <Input onChange={(event) => setLogin(event.target.value)} placeholder="login" type="text" />
      </div>
      <div className={styles.formRow}>
        <Input
          onChange={(event) => setPassword(event.target.value)}
          placeholder="password"
          type="password"
        />
      </div>
      {error && <ErrorMessage errorMessage="something went wrong" />}
      <div className={styles.formRow}>
        <Button>Авторизуватись</Button>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  onAuth: PropTypes.func.isRequired,
  error: PropTypes.string
}
