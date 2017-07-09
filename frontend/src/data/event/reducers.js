import { combineReducers } from 'redux'
import * as routes from 'data/page/actions'
import { EVENTS_FETCH_SUCCESS, EVENT_FETCH_SUCCESS, EVENT_DELETE_SUCCESS } from './actions'

const listDefaultState = []
const list = (state = listDefaultState, action) => {
  switch(action.type) {
    case EVENTS_FETCH_SUCCESS:
      return [
        ...action.events,
      ]
    case EVENT_FETCH_SUCCESS: {
      const event = { ...action.event }
      event.details = event.details.map(({ recipe, ...detail }) => ({
        ...detail,
        recipe: recipe._id,
      }))

      return [
        event,
        ...state.filter((event) => event._id !== action.event._id),
      ]
    }
    case EVENT_DELETE_SUCCESS:
      return state.filter((event) => event._id !== action.id)
    default:
      return state
  }
}

const editingId = (state = null, action) => {
  switch (action.type) {
    case routes.EVENT_EDIT:
      return action.payload.id
    case routes.EVENT_DETAIL_EDIT:
      return action.payload.eventId
    default:
      return routes.allRoutes.includes(action.type) ? null : state
  }
}

const editingDetailId = (state = null, action) => {
  switch (action.type) {
    case routes.EVENT_DETAIL_EDIT:
      return action.payload.id
    default:
      return routes.allRoutes.includes(action.type) ? null : state
  }
}

const edit = combineReducers({
  editingId,
  editingDetailId,
})

export default combineReducers({
  list,
  edit,
})
