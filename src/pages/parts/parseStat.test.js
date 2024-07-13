import { parseStat } from './Counters'

describe('parseStat', () => {
  it('should return statistics', () => {
    const rawStat = {
      false: {
        'COUNT isDone': 2
      },
      true: {
        'COUNT isDone': 34
      },
      undefined: {
        'COUNT isDone': 17
      }
    }
    expect(parseStat(rawStat)).toEqual({
      done: 34,
      total: 53
    })
  })
})
