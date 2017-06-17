const definition = `
  type Recipe {
    _id: ID!
    ingredient: String!
    description: String!
    quantity: Int!
    unit: String!
    proportion: Int!
    creationDate: Date!
  }

  input RecipeInput {
    ingredient: String!
    description: String!
    quantity: Int!
    unit: String!
    proportion: Int!
  }
`

export default definition
