export const RECIPE_FETCH_REQUEST = 'RECIPE_FETCH_REQUEST'
export const RECIPE_FETCH_SUCCESS = 'RECIPE_FETCH_SUCCESS'
export const RECIPE_FETCH_FAILURE = 'RECIPE_FETCH_FAILURE'

export const fetchRecipes = () => ({
  type: RECIPE_FETCH_REQUEST,
})

export const receiveRecipes = (recipes) => ({
  type: RECIPE_FETCH_SUCCESS,
  recipes,
})

export const failReceiveRecipes = () => ({
  type: RECIPE_FETCH_FAILURE,
})
