import gql from 'graphql-tag'

export const deleteEventMutation = gql`
  mutation deleteEvent($id: ID!) {
    deleted: deleteEvent(id: $id)
  }
`
