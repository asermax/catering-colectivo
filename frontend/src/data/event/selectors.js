import { createSelector } from 'reselect'
import { getRecipes } from 'data/recipe/selectors'

export const getEvents = (state) => state.event.list
export const getEditingId = (state) => state.event.edit.editingId
export const getEditingEvent = createSelector(
  [ getEvents, getEditingId ],
  (events, id) => {
    let result = null

    if (id != null) {
      const match = events.find((event) => event._id === id)

      if (match != null) {
        let { __typename, _id, creationDate, ...event } = match
        result = event
      }
    }

    return result
  },
)
export const getEditingEventDetails = createSelector(
  [ getEditingEvent, getRecipes ],
  (event, recipes) => event == null || event.details == null ? [] :
    event.details.map((detail) => ({
      ...detail,
      recipe: recipes.find((recipe) => recipe._id === detail.recipe),
    })),
)
export const isAddingEventDetail = (state) => state.event.add.isAddingEventDetail
export const getNewEventDetail = (state) => state.event.add.newEventDetail
export const getEditingEventDetailId = (state) => state.event.edit.editingDetailId
export const getEditingEventDetailChanges = (state) => state.event.edit.editingDetail
export const getEditingEventDetail = createSelector(
  [ getEditingEvent, getEditingEventDetailId, getEditingEventDetailChanges ],
  (event, detailId, changes) => {
    let result = null

    if (detailId != null) {
      const { __typename, _id, creationDate, ...detail } = event.details
        .find((detail) => detail._id === detailId)
      result = {
        ...detail,
        ...changes,
      }
    }

    return result
  },
)
