export const RECIPE_FETCH_REQUEST = 'RECIPE_FETCH_REQUEST'
export const RECIPE_FETCH_SUCCESS = 'RECIPE_FETCH_SUCCESS'
export const RECIPE_FETCH_FAILURE = 'RECIPE_FETCH_FAILURE'
export const RECIPE_CREATE_REQUEST = 'RECIPE_CREATE_REQUEST'
export const RECIPE_CREATE_SUCCESS = 'RECIPE_CREATE_SUCCESS'
export const RECIPE_CREATE_FAILURE = 'RECIPE_CREATE_FAILURE'
export const RECIPE_DELETE_REQUEST = 'RECIPE_DELETE_REQUEST'
export const RECIPE_DELETE_SUCCESS = 'RECIPE_DELETE_SUCCESS'
export const RECIPE_DELETE_FAILURE = 'RECIPE_DELETE_FAILURE'

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

export const createRecipe = (recipe) => ({
  type: RECIPE_CREATE_REQUEST,
  recipe,
})

export const receiveRecipe = (recipe) => ({
  type: RECIPE_CREATE_SUCCESS,
  recipe,
})

export const failReceiveRecipe = () => ({
  type: RECIPE_CREATE_FAILURE,
})

export const deleteRecipe = (id) => ({
  type: RECIPE_DELETE_REQUEST,
  id,
})

export const removeRecipe = (id) => ({
  type: RECIPE_DELETE_SUCCESS,
  id,
})

export const failRemoveRecipe = () => ({
  type: RECIPE_DELETE_FAILURE,
})
