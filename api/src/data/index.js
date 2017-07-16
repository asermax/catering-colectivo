import { makeExecutableSchema } from 'graphql-tools'
import scalarResolvers from './scalars'
import { recipeDefinition, recipeResolver } from './recipe'
import { eventDefinition, eventResolver } from './event'

const queryDefinition = `
  type Query {
    recipes(ingredient: String): [Recipe]
    events: [Event]
    event(id: ID!): Event
  }

  type Mutation {
    createRecipe(recipe: RecipeInput!): Recipe
    updateRecipe(id: ID!, recipe: RecipeInput!): Recipe
    deleteRecipe(id: ID!): Boolean
    createEvent(event: EventInput!): Event
    updateEvent(event: EventInput!): Event
    deleteEvent(id: ID!): Boolean
    createEventDetail(eventId: ID!, eventDetail: EventDetailInput!): EventDetail
    updateEventDetail(eventId: ID!,id: ID!, eventDetail: EventDetailInput!): EventDetail
    deleteEventDetail(eventId: ID!,id: ID!): Boolean
  }
`

const scalarDefinitions = `
  scalar Date
`

const typeDefs = [
  scalarDefinitions,
  queryDefinition,
  recipeDefinition,
  eventDefinition,
]

const resolvers = {
  ...scalarResolvers,
  Query: {
    ...recipeResolver.root.Query,
    ...eventResolver.root.Query,
  },
  Mutation: {
    ...recipeResolver.root.Mutation,
    ...eventResolver.root.Mutation,
  },
  ...eventResolver.nested,
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

export { schema }
