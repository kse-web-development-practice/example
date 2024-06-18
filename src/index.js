import React from 'react'
import ReactDOM from 'react-dom/client'

import { Layout } from './Components/Layout/layout'
import { Counter } from './Components/Counter/counter'

const App = () => {
  return (
    <div>
      <Layout>
        <p>Hello from React !!!!</p>
        <div>Test</div>
        <Counter active={true} type="done" value={12} />
      </Layout>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('app'))

root.render(<App />)
