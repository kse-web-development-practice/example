import mapClient from './index'

describe('Map Client', () => {
  let fetchMocked = jest.fn()

  afterEach(() => {
    fetchMocked.mockClear()
  })

  describe('getList', () => {
    describe('when there are some points in viewport', () => {
      beforeEach(() => {
        fetchMocked.mockResolvedValue(
          new Response(
            JSON.stringify({
              totals: { total: 20, count: 5, skip: 0, max: 5 },
              data: [
                {
                  lat: 1,
                  lng: 2,
                  title: 'Test Point'
                },
                {
                  lat: 2,
                  lng: 3,
                  title: 'Test Point1'
                }
              ]
            }),
            {
              status: 200,
              statusText: '200 OK'
            }
          )
        )

        mapClient.init('http://some.com', 'key', fetchMocked)
      })

      describe('where page is not set', () => {
        it('should return array of points', async () => {
          await expect(mapClient.getList()).resolves.toEqual({
            totals: { total: 20, count: 5, skip: 0, max: 5 },
            data: [
              {
                lat: 1,
                lng: 2,
                title: 'Test Point'
              },
              {
                lat: 2,
                lng: 3,
                title: 'Test Point1'
              }
            ]
          })
        })

        it('should call endpoint', async () => {
          await mapClient.getList()
          expect(fetchMocked).toBeCalledWith(
            'http://some.com/rest/mapitem?totals=true&max=5',
            expect.any(Object)
          )
        })
      })

      describe('where page is set to 4', () => {
        it('should return array of points', async () => {
          await expect(mapClient.getList()).resolves.toEqual({
            totals: { total: 20, count: 5, skip: 0, max: 5 },
            data: [
              {
                lat: 1,
                lng: 2,
                title: 'Test Point'
              },
              {
                lat: 2,
                lng: 3,
                title: 'Test Point1'
              }
            ]
          })
        })

        it('should call endpoint', async () => {
          await mapClient.getList(4)
          expect(fetchMocked).toBeCalledWith(
            'http://some.com/rest/mapitem?skip=20&totals=true&max=5',
            expect.any(Object)
          )
        })
      })
    })
  })
})
