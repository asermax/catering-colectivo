import apollo from './apollo'

async function query(query, fetchPolicy = 'network-only') {
  const response = await apollo.query({ query, fetchPolicy })

  return response.data
}

async function mutate(mutation, variables) {
  const response = await apollo.mutate({ mutation, variables })

  return response.data
}

export default {
  query,
  mutate,
}

