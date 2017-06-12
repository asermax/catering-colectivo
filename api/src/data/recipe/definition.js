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
`

export default definition
