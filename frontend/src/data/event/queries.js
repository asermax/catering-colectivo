import gql from 'graphql-tag'

export const allEventsQuery = gql`
  query allEvents {
    events {
      _id
      organization
      description
      date
      amountPeople
      creationDate
    }
  }
`
