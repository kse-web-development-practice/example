let fetchFn
let baseUrl
let apiKey

function init(url, key, fetchAPI) {
  fetchFn = fetchAPI
  baseUrl = url
  apiKey = key
}

async function getByBounds(latMin, latMax, lngMin, lngMax) {
  const searchParams = new URLSearchParams()
  const query = {
    lat: {
      $bt: [latMin, latMax]
    },
    lng: {
      $bt: [lngMin, lngMax]
    }
  }

  searchParams.append('q', JSON.stringify(query))

  const url = `${baseUrl}/rest/mapitem?${searchParams.toString()}`

  const headers = {
    'cache-control': 'no-cache',
    'x-apikey': apiKey
  }

  const res = await fetchFn(url, {
    method: 'GET',
    headers
  })

  if (!res.ok || res.status !== 200) {
    throw new Error(`Error: ${res.statusText}`)
  }

  const data = await res.json()
  if (data.length < 1) {
    return []
  }

  return data
}

export default {
  init,
  getByBounds
}
