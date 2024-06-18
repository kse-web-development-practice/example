import React from 'react'

import classnames from 'classnames'
import styles from './counter.module.css'
import PropTypes from 'prop-types'

export const Counter = ({ value, type, active }) => {
  return (
    <div
      className={classnames(styles.counterBlock, {
        [styles.counterBlockActive]: active
      })}
    >
      <span
        className={classnames(styles.counterLabel, {
          [styles.counterLabelActive]: active
        })}
      >
        {type === 'total' ? 'Заявок' : 'Вирішено'}
      </span>
      <span
        className={classnames(styles.counterCount, {
          [styles.counterCountTotal]: type === 'total'
        })}
      >
        {value}
      </span>
    </div>
  )
}

Counter.propTypes = {
  type: PropTypes.oneOf(['total', 'done']).isRequired,
  active: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired
}
