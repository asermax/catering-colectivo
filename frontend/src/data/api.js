import _fetch from 'isomorphic-fetch'
import apollo from './apollo'

function buildPath(entrypoint) {
  return `${API_PREFIX}/${entrypoint}`
}

async function fetch(entrypoint) {
  const response = await _fetch(buildPath(entrypoint))
  return response.json()
}

async function create(entrypoint, data) {
  const response = await _fetch(
    buildPath(entrypoint),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )
  return response.json()
}

async function update(entrypoint, id, data) {
  const response = await _fetch(
    buildPath(`${entrypoint}/${id}`),
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )
  return response.json()
}

async function _delete(entrypoint, id) {
  const response = await _fetch(
    buildPath(`${entrypoint}/${id}`),
    {
      method: 'DELETE',
    }
  )
  return response.ok
}

async function query(query, fetchPolicy = 'network-only') {
  const response = await apollo.query({ query, fetchPolicy })

  return response.data
}

async function mutate(mutation, variables) {
  const response = await apollo.mutate({ mutation, variables })

  return response.data
}

export const API_PREFIX = '/api/v1'
export default {
  fetch,
  create,
  update,
  delete: _delete,
  query,
  mutate,
}

