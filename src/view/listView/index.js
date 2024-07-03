import React, { useEffect, useState } from 'react'

import classnames from 'classnames'

import mapClient from '../../clients/map'
import { getCache, setCache } from '../../cache'
import { generatePath, Link, useMatch, useParams } from 'react-router-dom'
import styles from './styles.module.css'

const CACHE_KEY = 'listView'

export const ListView = () => {
  const params = useParams()
  const totalRouter = useMatch('/total/:page?')
  const closedRouter = useMatch('/closed/:page?')

  const [isError, setError] = useState(false)

  const matchedRouter = totalRouter ?? closedRouter

  const shouldFilterClosed = !!closedRouter

  const [isLoading, setIsLoading] = useState(false)

  const [points, setPoints] = useState([])
  const currentPage = params.page ? params.page - 1 : 0

  useEffect(() => {
    const key = CACHE_KEY + currentPage + shouldFilterClosed
    const cachedData = getCache(key)
    if (cachedData) {
      setPoints(cachedData)
    } else {
      setIsLoading(true)
      mapClient
        .getList(currentPage, shouldFilterClosed)
        .then((points) => {
          setPoints(points)
          setCache(key, points)
          setIsLoading(false)
        })
        .catch(() => {
          setError(true)
        })
    }
  }, [currentPage, isLoading, shouldFilterClosed])
  const { totals } = points
  const totalPages = totals ? Math.ceil(totals.total / totals.max) : 0

  const pages = Array.from({ length: totalPages })

  if (isError) {
    return (
      <>
        <h1>Заявки</h1>
        <p>Something went wrong. Please, try later</p>
      </>
    )
  }

  return (
    <div className={styles.listWrapper}>
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
            to={generatePath(matchedRouter?.pattern?.path ?? '/total/:page?', { page: i + 1 })}
          >
            {i + 1}
          </Link>
        ))}
      </div>

      {isLoading && <div className={styles.loading}></div>}
      {/*{isError && <div className={styles.error}>Error! Please, reload the page</div>}*/}
    </div>
  )
}
