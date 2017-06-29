import apollo from './apollo'

async function query(query, variables, fetchPolicy = 'network-only') {
  const response = await apollo.query({ query, variables, fetchPolicy })

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

