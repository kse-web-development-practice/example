import React from 'react'

import renderer from 'react-test-renderer'
import { Counter } from './counter'

describe('Counter', () => {
  it('should render', () => {
    const counterComponent = renderer.create(<Counter active={true} type="done" value={12} />)
    expect(counterComponent).toMatchSnapshot()
  })
})
