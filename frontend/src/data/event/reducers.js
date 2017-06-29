import { combineReducers } from 'redux'
import * as routes from 'data/page/actions'
import { EVENTS_FETCH_SUCCESS, EVENT_FETCH_SUCCESS } from './actions'

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
    default:
      return state
  }
}

const editingId = (state = null, action) => {
  if (action.type === routes.EVENT_EDIT) {
    return action.payload.id
  } else if (routes.allRoutes.includes(action.type)) {
    return null
  } else {
    return state
  }
}

const edit = combineReducers({
  editingId,
})

export default combineReducers({
  list,
  edit,
})
