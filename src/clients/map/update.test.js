import mapClient from './index'

describe('Map Client', () => {
  let fetchMocked = jest.fn()

  afterEach(() => {
    fetchMocked.mockClear()
  })

  describe('update', () => {
    const dataToUpdate = {
      _id: 1,
      title: 'new title'
    }

    describe('when new item is updated', () => {
      beforeEach(() => {
        fetchMocked.mockResolvedValue(
          new Response(
            JSON.stringify({
              _id: 1
            }),
            {
              status: 200,
              statusText: '200 Modified'
            }
          )
        )

        mapClient.init('http://some.com', 'key', fetchMocked)
      })

      it('should not throw an error', async () => {
        await expect(mapClient.update(dataToUpdate)).resolves.toEqual({
          _id: 1
        })
      })

      it('should call endpoint', async () => {
        await mapClient.update(dataToUpdate)
        expect(fetchMocked).toBeCalledWith(
          'http://some.com/rest/mapitem/1',
          expect.objectContaining({
            method: 'PATCH',
            body: JSON.stringify(dataToUpdate)
          })
        )
      })
    })

    describe('when an item is not updated', () => {
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
        await expect(mapClient.update(dataToUpdate)).rejects.toEqual(
          Error('Error: 400 Validation error')
        )
      })
    })

    describe('when object is not valid', () => {
      it('should throw an error', async () => {
        await expect(mapClient.update({})).rejects.toEqual(Error('Item should contain `_id`'))
      })
    })
  })
})
