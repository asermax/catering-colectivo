import { EVENT_FETCH_SUCCESS } from './actions'

const defaultState = {
  list: [],
}

const eventsReducer = (state = defaultState, action) => {
  switch(action.type) {
    case EVENT_FETCH_SUCCESS:
      return {
        ...state,
        list: [
          ...action.events,
        ],
      }
    default:
      return state
  }
}

export default eventsReducer
