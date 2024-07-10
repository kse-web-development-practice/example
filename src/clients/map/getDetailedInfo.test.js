import mapClient from './index'

describe('Map Client', () => {
  let fetchMocked = jest.fn()

  afterEach(() => {
    fetchMocked.mockClear()
  })

  describe('getDetailedInfo', () => {
    beforeEach(() => {
      fetchMocked.mockResolvedValue(
        new Response(
          JSON.stringify({
            lat: 1,
            lng: 2,
            title: 'Test Point'
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
      await expect(mapClient.getDetailedInfo()).resolves.toEqual({
        lat: 1,
        lng: 2,
        title: 'Test Point'
      })
    })
  })
})
