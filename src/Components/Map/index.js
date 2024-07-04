import React, { useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import PropTypes from 'prop-types'
import { generatePath } from 'react-router-dom'

const containerStyle = {
  width: '100%',
  height: 'calc(100vh - 10rem)'
}

const center = {
  lat: -3.745,
  lng: -38.523
}

export const Map = ({ points }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.MAP_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(
    function callback(map) {
      fitMap(map, points)

      setMap(map)
    },
    [points]
  )

  useEffect(() => {
    if (!map) return

    fitMap(map, points)
  }, [map, points])

  const fitMap = (map, points) => {
    const bounds = new window.google.maps.LatLngBounds()

    points.forEach((point) => bounds.extend({ lat: Number(point.lat), lng: Number(point.lng) }))

    map.fitBounds(bounds)
    map.setZoom(3)
  }

  const onUnmount = React.useCallback(function callback() {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={onLoad}
      zoom={7}
      onUnmount={onUnmount}
    >
      <>
        {points.map((point) => (
          <Marker
            key={point._id}
            onClick={() => {
              location.href = generatePath('/issue/:id', { id: point._id })
            }}
            position={{
              lat: Number(point.lat),
              lng: Number(point.lng)
            }}
          />
        ))}
      </>
    </GoogleMap>
  ) : (
    <></>
  )
}

Map.propTypes = {
  points: PropTypes.array.isRequired
}
