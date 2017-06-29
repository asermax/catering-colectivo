import { createSelector } from 'reselect'

export const getEvents = (state) => state.event.list
export const getEditingId = (state) => state.event.edit.editingId
export const getEditingEvent = createSelector(
  [ getEvents, getEditingId ],
  (events, id ) => {
    let result = null

    if (id != null) {
      const match = events.find((recipe) => recipe._id === id)

      if (match != null) {
        let { __typename, _id, creationDate, ...event } = match
        result = event
      }
    }

    return result
  },
)

