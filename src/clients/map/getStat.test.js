import mapClient from './index'

describe('Map Client', () => {
  let fetchMocked = jest.fn()

  afterEach(() => {
    fetchMocked.mockClear()
  })

  describe('getStat', () => {
    beforeEach(() => {
      fetchMocked.mockResolvedValue(
        new Response(
          JSON.stringify({
            false: {
              'COUNT isDone': 2
            },
            true: {
              'COUNT isDone': 28
            },
            undefined: {
              'COUNT isDone': 23
            }
          }),
          {
            status: 200,
            statusText: '200 OK'
          }
        )
      )

      mapClient.init('http://some.com', 'key', fetchMocked)
    })

    it('should return the result', async () => {
      await expect(mapClient.getStat()).resolves.toEqual({
        false: {
          'COUNT isDone': 2
        },
        true: {
          'COUNT isDone': 28
        },
        undefined: {
          'COUNT isDone': 23
        }
      })
    })
  })
})
