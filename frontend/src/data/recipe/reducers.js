import { combineReducers } from 'redux'
import * as routes from 'pages/routes'
import {
  RECIPE_FETCH_SUCCESS, RECIPE_CREATE_SUCCESS, RECIPE_EDIT_SUCCESS, RECIPE_DELETE_SUCCESS,
  NEW_RECIPE_CHANGE,
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

const isAdding = (state = false, action) => {
  if (action.type === routes.RECIPE_ADD) {
    return true
  } else if (routes.default[action.type]) {
    return false
  } else {
    return state
  }
}

const newRecipe = (state = null, action) => {
  switch(action.type) {
    case routes.RECIPE_ADD:
      return {
        ingredient: null,
        description: null,
        quantity: 1,
        unit: 'unidad',
        proportion: 1,
      }
    case NEW_RECIPE_CHANGE:
      return {
        ...state,
        ...action.changes,
      }
    default:
      if (routes.default[action.type]) {
        return null
      } else {
        return state
      }
  }
}

const add = combineReducers({
  isAdding,
  newRecipe,
})

export default combineReducers({
  list,
  editing,
  add,
})

