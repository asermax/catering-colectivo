import { combineReducers } from 'redux'
import * as routes from 'pages/routes'
import {
  RECIPE_FETCH_SUCCESS, RECIPE_CREATE_SUCCESS, RECIPE_EDIT_SUCCESS, RECIPE_DELETE_SUCCESS,
} from './actions'

const listDefaultState = []
const list = (state = listDefaultState, action) => {
  switch(action.type) {
    case RECIPE_FETCH_SUCCESS:
      return [
        ...action.recipes,
      ]
    case RECIPE_CREATE_SUCCESS:
      return [
        {
          ...action.recipe,
        },
        ...state,
      ]
    case RECIPE_EDIT_SUCCESS:
      return [
        ...state.filter((recipe) => recipe._id !== action.id),
        {
          ...state.find((recipe) => recipe._id === action.id),
          ...action.recipe,
        },
      ]
    case RECIPE_DELETE_SUCCESS:
      return state.filter((recipe) => recipe._id !== action.id)
    default:
      return state
  }
}

const editing = (state = null, action) => {
  if (action.type === routes.RECIPE_EDIT) {
    return action.payload.id
  } else if (routes.default[action.type]) {
    return null
  } else {
    return state
  }
}

const adding = (state = false, action) => {
  if (action.type === routes.RECIPE_ADD) {
    return true
  } else if (routes.default[action.type]) {
    return false
  } else {
    return state
  }
}

export default combineReducers({
  list,
  editing,
  adding,
})

