import userClient from './index'

describe('User Client', () => {
  let fetchMocked = jest.fn()

  afterEach(() => {
    fetchMocked.mockClear()
  })

  describe('if a user exists', () => {
    beforeEach(() => {
      fetchMocked.mockResolvedValue({
        json: jest.fn().mockResolvedValue([
          {
            login: 'test',
            password: 'test'
          }
        ])
      })

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
      fetchMocked.mockResolvedValue({
        json: jest.fn().mockResolvedValue([])
      })

      userClient.init('/', '123123123', fetchMocked)
    })

    it('should return null', async () => {
      const login = 'test'
      const password = 'test'

      const fetchMocked = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue([])
      })

      userClient.init('/', '123123123', fetchMocked)

      const res = await userClient.auth(login, password)

      expect(res).toEqual(null)
    })
  })
})