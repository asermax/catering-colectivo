import { combineReducers } from 'redux'
import * as routes from 'data/page/actions'
import {
  RECIPE_FETCH_SUCCESS, RECIPE_CREATE_SUCCESS, RECIPE_EDIT_SUCCESS, RECIPE_DELETE_SUCCESS,
  NEW_RECIPE_CHANGE, EDIT_RECIPE_CHANGE,
} from './actions'
import { EVENT_FETCH_SUCCESS } from 'data/event/actions'

const listDefaultState = []
const list = (state = listDefaultState, action) => {
  switch(action.type) {
    case RECIPE_FETCH_SUCCESS: {
      const newIds = action.recipes.map((recipe) => recipe._id)
      return [
        ...state.filter((recipe) => !newIds.includes(recipe._id)),
        ...action.recipes,
      ]
    }
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
    case EVENT_FETCH_SUCCESS: {
      const seen = {}

      return [
        ...action.event.details
          .map((detail) => ({ ...detail.recipe }))
          .filter((recipe) => {
            const include = seen[recipe._id] == null
            seen[recipe._id] = true
            return include
          }),
      ]
    }
    default:
      return state
  }
}

const isAdding = (state = false, action) => {
  if (action.type === routes.RECIPE_ADD) {
    return true
  } else if (routes.allRoutes.includes(action.type)) {
    return false
  } else {
    return state
  }
}

const newRecipeDefault = {
  ingredient: null,
  description: null,
  quantity: 1,
  unit: 'unidad',
  proportion: 1,
}

const newRecipe = (state = null, action) => {
  switch(action.type) {
    case routes.RECIPE_ADD:
      return newRecipeDefault
    case NEW_RECIPE_CHANGE:
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

const add = combineReducers({
  isAdding,
  newRecipe,
})


const editingId = (state = null, action) => {
  if (action.type === routes.RECIPE_EDIT) {
    return action.payload.id
  } else if (routes.allRoutes.includes(action.type)) {
    return null
  } else {
    return state
  }
}

const editingRecipe = (state = null, action) => {
  switch(action.type) {
    case routes.RECIPE_EDIT:
      return {}
    case EDIT_RECIPE_CHANGE:
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
  editingRecipe,
})

export default combineReducers({
  list,
  edit,
  add,
})

