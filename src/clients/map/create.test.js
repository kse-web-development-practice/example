import mapClient from './index'

describe('Map Client', () => {
  let fetchMocked = jest.fn()

  afterEach(() => {
    fetchMocked.mockClear()
  })

  describe('create', () => {
    describe('when new item is created', () => {
      beforeEach(() => {
        fetchMocked.mockResolvedValue(
          new Response(
            JSON.stringify({
              _id: 1,
              lat: 1,
              lng: 2,
              title: 'Test Point'
            }),
            {
              status: 201,
              statusText: '201 Success'
            }
          )
        )

        mapClient.init('http://some.com', 'key', fetchMocked)
      })

      it('should return new item', async () => {
        await expect(mapClient.create('Some', 1, 2)).resolves.toEqual({
          _id: 1,
          lat: 1,
          lng: 2,
          title: 'Test Point'
        })
      })

      it('should call endpoint', async () => {
        await mapClient.create('Some', 1, 2)
        expect(fetchMocked).toBeCalledWith(
          'http://some.com/rest/mapitem',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({
              title: 'Some',
              lat: 1,
              lng: 2
            })
          })
        )
      })
    })

    describe('when new item is not created', () => {
      beforeEach(() => {
        fetchMocked.mockResolvedValue(
          new Response('Validation error', {
            status: 400,
            statusText: '400 Validation error'
          })
        )

        mapClient.init('http://some.com', 'key', fetchMocked)
      })

      it('should throw an error', async () => {
        await expect(mapClient.create('Some', 1, 2)).rejects.toEqual(
          Error('Error: 400 Validation error')
        )
      })
    })
  })
})
