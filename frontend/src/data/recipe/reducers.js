import { RECIPE_FETCH_SUCCESS } from './actions'

const defaultState = {
  list: [],
}

const recipesReducer = (state = defaultState, action) => {
  switch(action.type) {
    case RECIPE_FETCH_SUCCESS:
      return {
        ...state,
        list: action.recipes,
      }
    default:
      return state
  }
}

export default recipesReducer
