import gql from 'graphql-tag'

export const eventFieldsFragment = gql`
  fragment eventFields on Event {
    _id
    organization
    description
    date
    amountPeople
    creationDate
  }
`

export const eventDetailFieldsFragment = gql`
  fragment eventDetailFields on EventDetail {
    _id
    amountPeople
    note
    creationDate
  }
`
