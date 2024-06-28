import React, { useEffect, useState } from 'react'

import classnames from 'classnames'

import mapClient from '../../clients/map'
import { getCache, setCache } from '../../cache'
import { Link, useParams } from 'react-router-dom'
import styles from './styles.module.css'

const CACHE_KEY = 'listView'

export const ListView = () => {
  const params = useParams()
  const [isLoading, setIsLoading] = useState(false)

  const [points, setPoints] = useState([])
  const currentPage = params.page - 1

  useEffect(() => {
    const key = CACHE_KEY + currentPage
    const cachedData = getCache(key)
    if (cachedData) {
      setPoints(cachedData)
    } else {
      setIsLoading(true)
      mapClient.getList(currentPage).then((points) => {
        setPoints(points)
        setCache(key, points)
        setIsLoading(false)
      })
    }
  }, [currentPage, isLoading])
  const { totals } = points
  const totalPages = totals ? Math.ceil(totals.total / totals.max) : 0

  const pages = Array.from({ length: totalPages })

  return isLoading ? (
    <>Loading</>
  ) : (
    <div>
      <h1>Заявки</h1>
      <ul className={styles.listItems}>
        {points.data?.map((point) => (
          <li key={point._id}>{point.title}</li>
        ))}
      </ul>
      <div className={styles.pagination}>
        {pages.map((page, i) => (
          <Link
            className={classnames(styles.page, { [styles.pageActive]: currentPage === i })}
            key={i}
            to={`/total/${i + 1}`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  )
}
