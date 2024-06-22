import mapClient from './index'

describe('Map Client', () => {
  let fetchMocked = jest.fn()

  afterEach(() => {
    fetchMocked.mockClear()
  })

  describe('getByBounds', () => {
    describe('when there are some points in viewport', () => {
      beforeEach(() => {
        fetchMocked.mockResolvedValue(
          new Response(
            JSON.stringify([
              {
                lat: 1,
                lng: 2,
                title: 'Test Point'
              }
            ]),
            {
              status: 200,
              statusText: '200 OK'
            }
          )
        )

        mapClient.init('/', 'key', fetchMocked)
      })
      it('should return array of points', async () => {
        await expect(mapClient.getByBounds()).resolves.toEqual([
          {
            lat: 1,
            lng: 2,
            title: 'Test Point'
          }
        ])
      })
    })

    describe('when there are no points in viewport', () => {
      beforeEach(() => {
        fetchMocked.mockResolvedValue(
          new Response(JSON.stringify([]), {
            status: 200,
            statusText: '200 OK'
          })
        )

        mapClient.init('/', 'key', fetchMocked)
      })
      it('should return an empty array', async () => {
        await expect(mapClient.getByBounds()).resolves.toEqual([])
      })
    })

    describe('when there is an error', () => {
      beforeEach(() => {
        fetchMocked.mockResolvedValue(
          new Response(JSON.stringify([]), {
            status: 500,
            statusText: 'Server error'
          })
        )

        mapClient.init('/', 'key', fetchMocked)
      })
      it('should throw the error', async () => {
        await expect(mapClient.getByBounds()).rejects.toEqual(Error('Error: Server error'))
      })
    })
  })
})
