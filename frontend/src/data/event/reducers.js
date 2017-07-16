import { combineReducers } from 'redux'
import * as routes from 'data/page/actions'
import {
  EVENTS_FETCH_SUCCESS, EVENT_FETCH_SUCCESS, EVENT_DELETE_SUCCESS, EVENT_DETAIL_EDIT_SUCCESS,
  EDIT_EVENT_DETAIL_CHANGE,
} from './actions'

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
    case EVENT_DETAIL_EDIT_SUCCESS: {
      const event = state.find((event) => event._id === action.eventId)
      return [
        ...state.filter((event) => event._id !== action.eventId),
        {
          ...event,
          details: [
            ...event.details.filter((detail) => detail._id !== action.id),
            {
              ...action.eventDetail,
              recipe: action.eventDetail.recipe._id,
            },
          ],
        },
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

const editingDetail = (state = null, action) => {
  switch(action.type) {
    case routes.EVENT_DETAIL_EDIT:
      return {}
    case EDIT_EVENT_DETAIL_CHANGE:
      return {
        ...state,
        ...action.changes,
      }
    default:
      if (routes.allRoutes.includes(action.type)) {
        return null
      } else {
        return state
      }
  }
}

const edit = combineReducers({
  editingId,
  editingDetailId,
  editingDetail,
})

export default combineReducers({
  list,
  edit,
})
