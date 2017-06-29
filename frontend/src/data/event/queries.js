import gql from 'graphql-tag'
import { recipeFieldsFragment } from 'data/recipe/fragments'
import { eventFieldsFragment, eventDetailFieldsFragment } from './fragments'

export const allEventsQuery = gql`
  query allEvents {
    events {
      ...eventFields
    }
  }
  ${eventFieldsFragment}
`

export const eventQuery = gql`
  query event($id: ID!) {
    event(id: $id) {
      ...eventFields
      details {
        ...eventDetailFields
        recipe {
          ...recipeFields
        }
      }
    }
  }
  ${eventFieldsFragment}
  ${eventDetailFieldsFragment}
  ${recipeFieldsFragment}
`
