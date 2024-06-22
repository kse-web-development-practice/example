import userClient from './index'

describe('User Client', () => {
  let fetchMocked = jest.fn()

  afterEach(() => {
    fetchMocked.mockClear()
  })

  describe('auth', () => {
    describe('if request is valid', () => {
      beforeEach(() => {
        fetchMocked.mockResolvedValue(
          new Response('Server error', {
            status: 500,
            statusText: 'Server error'
          })
        )

        userClient.init('/', '123123123', fetchMocked)
      })
      it('should throw an error', async () => {
        const login = 'test'
        const password = 'test'

        await expect(userClient.auth(login, password)).rejects.toEqual(Error('Error: Server error'))
      })
    })

    describe('if request is valid', () => {
      describe('if a user exists', () => {
        beforeEach(() => {
          fetchMocked.mockResolvedValue(
            new Response(
              JSON.stringify([
                {
                  login: 'test',
                  password: 'test'
                }
              ]),
              {
                status: 200,
                statusText: '200 OK'
              }
            )
          )

          userClient.init('/', '123123123', fetchMocked)
        })

        it('should return a user data', async () => {
          const login = 'test'
          const password = 'test'

          const res = await userClient.auth(login, password)

          expect(res).toEqual({
            login: 'test',
            password: 'test'
          })
        })
      })
      describe('if a user does not exist', () => {
        beforeEach(() => {
          fetchMocked.mockResolvedValue(
            new Response(JSON.stringify([]), {
              status: 200,
              statusText: '200 OK'
            })
          )

          userClient.init('/', '123123123', fetchMocked)
        })

        it('should return null', async () => {
          const login = 'test'
          const password = 'test'

          userClient.init('/', '123123123', fetchMocked)

          const res = await userClient.auth(login, password)

          expect(res).toEqual(null)
        })
      })
    })
  })

  describe('getUser', () => {
    describe('if the token is valid', () => {
      beforeEach(() => {
        fetchMocked.mockResolvedValue(
          new Response(
            JSON.stringify([
              {
                login: 'test',
                password: 'test',
                token: 'some-token'
              }
            ]),
            {
              status: 200,
              statusText: '200 OK'
            }
          )
        )

        userClient.init('/', '123123123', fetchMocked)
      })
      it('should return user data', async () => {
        await expect(userClient.getUser('valid-token')).resolves.toEqual({
          login: 'test',
          password: 'test',
          token: 'some-token'
        })
      })
    })

    describe('if the token is not valid', () => {
      beforeEach(() => {
        fetchMocked.mockResolvedValue(
          new Response(JSON.stringify([]), {
            status: 200,
            statusText: '200 OK'
          })
        )

        userClient.init('/', '123123123', fetchMocked)
      })
      it('should return null', async () => {
        await expect(userClient.getUser('valid-token')).resolves.toEqual(null)
      })
    })
  })
})
