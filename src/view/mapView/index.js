import React, { useEffect, useState } from 'react'

import mapClient from '../../clients/map'
import { Map } from '../../Components/Map'

export const MapView = () => {
  const [points, setPoints] = useState([])
  useEffect(() => {
    mapClient.getByBounds(0, 1000, 0, 1000).then((points) => setPoints(points))
  }, [])

  return (
    <div>
      <Map points={points} />
    </div>
  )
}
