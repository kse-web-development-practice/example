import React, { useEffect, useState } from 'react'

import mapClient from '../../clients/map'
import { Map } from '../../Components/Map'
import { useMatch } from 'react-router-dom'

export const MapView = () => {
  const isOnline = window.navigator.onLine

  const closedRouter = useMatch('/closed/:page?')
  const shouldFilterClosed = !!closedRouter

  const [points, setPoints] = useState([])
  useEffect(() => {
    if (!isOnline) return

    mapClient.getByBounds(0, 1000, 0, 1000, shouldFilterClosed).then((points) => setPoints(points))
  }, [shouldFilterClosed, isOnline])

  return (
    <div>
      {isOnline && <Map points={points} />}
      {!isOnline && <di>Немає доступу до інтернету</di>}
    </div>
  )
}
