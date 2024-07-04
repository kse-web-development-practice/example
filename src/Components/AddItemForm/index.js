import React, { useState } from 'react'
import { Button } from '../Button'
import styles from './styles.module.css'
import PropTypes from 'prop-types'
import { Input } from '../Input'
import { Textarea } from '../Textarea'

export const AddItemForm = ({ onAdd, errorMessage = '', initialItem = {} }) => {
  const [title, setTitle] = useState('')
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    onAdd(title, lat, lng, description)
    e.preventDefault()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.formRow}>
        <span className={styles.formRowTitle}>Назва</span>
        <Input
          defaultValue={initialItem?.title}
          onChange={(event) => setTitle(event.target.value)}
          type="text"
        />
      </label>
      <label className={styles.formRow}>
        <span className={styles.formRowTitle}>Координати</span>
        <span className={styles.formRowGroup}>
          <Input
            defaultValue={initialItem?.lat}
            onChange={(event) => setLat(event.target.value)}
            type="text"
            placeholder="lat"
          />
          <Input
            defaultValue={initialItem?.lng}
            onChange={(event) => setLng(event.target.value)}
            type="text"
            placeholder="lng"
          />
        </span>
      </label>
      <label className={styles.formRow}>
        <span className={styles.formRowTitle}>Опис</span>
        <Textarea
          defaultValue={initialItem?.description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>
      <div className={styles.formRow}>
        <Button>Додати</Button>
      </div>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
    </form>
  )
}

AddItemForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  initialItem: PropTypes.object
}
