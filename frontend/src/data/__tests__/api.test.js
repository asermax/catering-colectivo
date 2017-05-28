import api, { API_PREFIX } from '../api'
import fetch from 'isomorphic-fetch'
jest.mock('isomorphic-fetch')

describe('fetch', () => {
  test('calls fetch on a certain entrypoint', async () => {
    const responseJson = 'json'
    const response = { json: jest.fn().mockReturnValueOnce(responseJson) }
    fetch.mockReturnValueOnce(response)
    const entrypoint = 'shows'

    const json = await api.fetch(entrypoint)

    expect(fetch).toHaveBeenCalledWith(`${API_PREFIX}/${entrypoint}`)
    expect(response.json).toHaveBeenCalled()
    expect(json).toEqual(responseJson)
  })
})
