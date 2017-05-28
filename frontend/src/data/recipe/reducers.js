import { RECIPE_FETCH_SUCCESS, RECIPE_CREATE_SUCCESS } from './actions'

const defaultState = {
  list: [],
}

const recipesReducer = (state = defaultState, action) => {
  switch(action.type) {
    case RECIPE_FETCH_SUCCESS:
      return {
        ...state,
        list: [
          ...action.recipes,
        ],
      }
    case RECIPE_CREATE_SUCCESS:
      return {
        ...state,
        list: [
          {
            ...action.recipe,
          },
          ...state.list,
        ],
      }
    default:
      return state
  }
}

export default recipesReducer
