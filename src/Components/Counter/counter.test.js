import React from 'react'

import renderer from 'react-test-renderer'
import { Counter } from './counter'

describe('Counter', () => {
  it('should work', () => {
    const count = renderer.create(<Counter active={true} value={12} type="total" />).toJSON()
    expect(true).toEqual(true)
    expect(count).toMatchSnapshot()
  })
})
