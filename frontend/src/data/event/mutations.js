import gql from 'graphql-tag'
import { eventDetailFieldsFragment } from './fragments'

export const deleteEventMutation = gql`
  mutation deleteEvent($id: ID!) {
    deleted: deleteEvent(id: $id)
  }
`

export const updateEventDetailMutation = gql`
  mutation updateEventDetail($eventId: ID!, $id: ID!, $eventDetail: EventDetailInput!) {
    eventDetail: updateEventDetail(eventId: $eventId, id: $id, eventDetail: $eventDetail) {
      ...eventDetailFields
      recipe {
        _id
      }
    }
  }
  ${eventDetailFieldsFragment}
`
