import React from 'react'
import PropTypes from 'prop-types'
import { Map } from '../Map'
import styles from './styles.module.css'

export const DetailedView = ({ title, lat, lng, description = '', isDone = false }) => {
  const isOnline = window.navigator.onLine

  return (
    <div className={styles.detailed}>
      <h1 className={styles.title}>
        {isDone ? <>✅</> : <>🚧</>} {title}
      </h1>

      <section className={styles.description}>
        <p>{description}</p>
      </section>

      {isOnline && <Map points={[{ lat, lng }]} />}

      <table className={styles.table}>
        <tbody>
          <tr>
            <td>lat:</td>
            <td>{lat}</td>
          </tr>
          <tr>
            <td>lng:</td>
            <td>{lng}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

DetailedView.propTypes = {
  title: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  description: PropTypes.string,
  isDone: PropTypes.bool
}
