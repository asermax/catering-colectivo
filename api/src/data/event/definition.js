const definition = `
  type Event {
    _id: ID!
    organization: String!
    description: String
    date: Date
    amountPeople: Int
    creationDate: Date!
    details: [ EventDetail! ]
  }

  type EventDetail {
    _id: ID!
    recipe: Recipe!
    amountPeople: Int!
    note: String
    creationDate: Date!
  }

  input EventInput {
    organization: String!
    description: String
    date: Date
    amountPeople: Int
  }
`

export default definition
