import { combineReducers } from 'redux'
import * as routes from 'pages/routes'
import {
  RECIPE_FETCH_SUCCESS, RECIPE_CREATE_SUCCESS, RECIPE_EDIT_SUCCESS, RECIPE_DELETE_SUCCESS,
  NEW_RECIPE_CHANGE, EDIT_RECIPE_CHANGE,
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

const isAdding = (state = false, action) => {
  if (action.type === routes.RECIPE_ADD) {
    return true
  } else if (routes.default[action.type]) {
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


const editingId = (state = null, action) => {
  if (action.type === routes.RECIPE_EDIT) {
    return action.payload.id
  } else if (routes.default[action.type]) {
    return null
  } else {
    return state
  }
}

const editingRecipe = (state = null, action) => {
  switch(action.type) {
    case EDIT_RECIPE_CHANGE:
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

const edit = combineReducers({
  editingId,
  editingRecipe,
})

const childReducers = combineReducers({
  list,
  edit,
  add,
})


const rootRecipesReducer = (state, action) => {
  const newState = childReducers(state, action)

  switch(action.type) {
    case routes.RECIPE_EDIT:
    case RECIPE_FETCH_SUCCESS: {
      const editingRecipe = {
        ...newState.list.find((recipe) => recipe._id === newState.edit.editingId),
      }
      delete editingRecipe._id
      delete editingRecipe.__typename
      delete editingRecipe.creationDate

      newState.edit.editingRecipe = editingRecipe
    }
  }

  return newState
}

export default rootRecipesReducer
