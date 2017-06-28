const definition = `
  type EventDetail {
    _id: ID!
    recipe: Recipe!
    amountPeople: Int!
    note: String
    creationDate: Date!
  }

  type Event {
    _id: ID!
    organization: String!
    description: String
    date: Date
    amountPeople: Int
    creationDate: Date!
    details: [ EventDetail! ]
  }
`

export default definition
