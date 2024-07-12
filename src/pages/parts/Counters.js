import { Link } from 'react-router-dom'
import { Counter } from '../../Components/Counter/counter'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import mapItemClient from '../../clients/map'

export const parseStat = (stat) => {
  const total =
    stat['true']['COUNT isDone'] + stat['false']['COUNT isDone'] + stat['undefined']['COUNT isDone']
  const done = stat['true']['COUNT isDone']

  return {
    total,
    done
  }
}

export const Counters = ({ filter = null }) => {
  const [stat, setStat] = useState({
    total: 0,
    done: 0
  })

  useEffect(() => {
    mapItemClient.getStat().then((stat) => {
      setStat(parseStat(stat))
    })
  }, [])
  return (
    <>
      <Link to={'/'}>
        <Counter active={filter === 'total'} type="total" value={stat.total} />
      </Link>
      <Link to={'/closed'}>
        <Counter active={filter === 'done'} type="done" value={stat.done} />
      </Link>
    </>
  )
}

Counters.propTypes = {
  filter: PropTypes.oneOf(['total', 'done'])
}
