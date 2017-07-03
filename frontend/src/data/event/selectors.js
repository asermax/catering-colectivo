import { createSelector } from 'reselect'
import { getRecipes } from 'data/recipe/selectors'

export const getEvents = (state) => state.event.list
export const getEditingId = (state) => state.event.edit.editingId
export const getEditingEvent = createSelector(
  [ getEvents, getEditingId, getRecipes ],
  (events, id, recipes) => {
    let result = null

    if (id != null) {
      const match = events.find((event) => event._id === id)

      if (match != null) {
        let { __typename, _id, creationDate, ...event } = match

        // populate recipes
        result = {
          ...event,
          details: event.details == null ? [] : event.details.map((detail) => ({
            ...detail,
            recipe: recipes.find((recipe) => recipe._id === detail.recipe),
          })),
        }
      }
    }

    return result
  },
)
