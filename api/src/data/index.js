import { makeExecutableSchema } from 'graphql-tools'
import scalarResolvers from './scalars'
import { recipeDefinition, recipeResolver } from './recipe'

const queryDefinition = `
  type Query {
    recipes: [Recipe]
  }

  type Mutation {
    createRecipe(recipe: RecipeInput!): Recipe
    updateRecipe(id: ID!, recipe: RecipeInput!): Recipe
    deleteRecipe(id: ID!): Boolean
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
  Mutation: {
    ...recipeResolver.Mutation,
  },
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

export { schema }
