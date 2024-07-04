import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

import userClient from './clients/user'
import mapClient from './clients/map'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Main } from './pages/main'
import { Issue } from './pages/issue'
import { Auth } from './pages/auth'
import { UserContext } from './user-contet'

mapClient.init('https://mapstorage-7e78.restdb.io', process.env.API_KEY, fetch)
userClient.init('https://mapstorage-7e78.restdb.io', process.env.API_KEY, fetch)

const router = createBrowserRouter([
  {
    // it renders this element
    element: <Main filter="total" />,

    // when the URL matches this segment
    path: '/'
  },
  {
    // it renders this element
    element: <Main filter="total" />,

    // when the URL matches this segment
    path: '/total/:page?'
  },
  {
    // it renders this element
    element: <Main filter="done" />,

    // when the URL matches this segment
    path: '/closed/:page?'
  },
  {
    // it renders this element
    element: <Issue />,

    // when the URL matches this segment
    path: '/issue/:id'
  },
  {
    // it renders this element
    element: <Auth />,

    // when the URL matches this segment
    path: '/auth'
  }
])

const App = () => {
  const [login, setLogin] = useState(null)
  const [token, setToken] = useState(null)
  useEffect(() => {
    const token = localStorage.getItem('token')
    userClient.getUser(token).then((user) => {
      if (!user) return

      setLogin(user.login)
      setToken(user.token)
    })
  }, [])
  return (
    <UserContext.Provider
      value={{
        setUser: (login, token) => {
          setLogin(login)
          setToken(token)
          localStorage.setItem('token', token)
        },
        logout: () => {
          localStorage.removeItem('token')
          setLogin(null)
          setToken(null)
        },
        login,
        token
      }}
    >
      <div>
        <RouterProvider router={router} />
      </div>
    </UserContext.Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('app'))

root.render(<App />)
