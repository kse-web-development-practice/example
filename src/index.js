import React from 'react'
import ReactDOM from 'react-dom/client'

import userClient from './clients/user'
import mapClient from './clients/map'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Main } from './pages/main'
import { Issue } from './pages/issue'

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
  }
])

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('app'))

root.render(<App />)
