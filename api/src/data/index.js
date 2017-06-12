import { makeExecutableSchema } from 'graphql-tools'
import scalarResolvers from './scalars'
import { recipeDefinition, recipeResolver } from './recipe'

const queryDefinition = `
  type Query {
    recipes: [Recipe]
  }
`

const scalarDefinitions = `
  scalar Date
`

const typeDefs = [
  scalarDefinitions,
  queryDefinition,
  recipeDefinition,
]

const resolvers = {
  ...scalarResolvers,
  Query: {
    ...recipeResolver.Query,
  },
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

export { schema }
