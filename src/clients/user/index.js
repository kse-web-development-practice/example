let fetchFn
let baseUrl
let apiKey

function init(url, key, fetchAPI) {
  fetchFn = fetchAPI
  baseUrl = url
  apiKey = key
}

async function auth(login, password) {
  const searchParams = new URLSearchParams()
  const q = JSON.stringify({
    login,
    password
  })
  searchParams.append('q', q)

  return searchUser(searchParams)
}

async function getUser(token) {
  const searchParams = new URLSearchParams()
  const q = JSON.stringify({
    token
  })
  searchParams.append('q', q)

  return searchUser(searchParams)
}

async function searchUser(searchParams) {
  const url = `${baseUrl}/rest/userlist?${searchParams.toString()}`

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
    return null
  }

  return data[0]
}

export default {
  init,
  auth,
  getUser
}
