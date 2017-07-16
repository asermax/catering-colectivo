export const RECIPE_FETCH_REQUEST = 'RECIPE_FETCH_REQUEST'
export const RECIPE_SEARCH_REQUEST = 'RECIPE_SEARCH_REQUEST'
export const RECIPE_FETCH_SUCCESS = 'RECIPE_FETCH_SUCCESS'
export const RECIPE_FETCH_FAILURE = 'RECIPE_FETCH_FAILURE'
export const RECIPE_CREATE_REQUEST = 'RECIPE_CREATE_REQUEST'
export const RECIPE_CREATE_SUCCESS = 'RECIPE_CREATE_SUCCESS'
export const RECIPE_CREATE_FAILURE = 'RECIPE_CREATE_FAILURE'
export const RECIPE_EDIT_REQUEST = 'RECIPE_EDIT_REQUEST'
export const RECIPE_EDIT_SUCCESS = 'RECIPE_EDIT_SUCCESS'
export const RECIPE_EDIT_FAILURE = 'RECIPE_EDIT_FAILURE'
export const RECIPE_DELETE_REQUEST = 'RECIPE_DELETE_REQUEST'
export const RECIPE_DELETE_SUCCESS = 'RECIPE_DELETE_SUCCESS'
export const RECIPE_DELETE_FAILURE = 'RECIPE_DELETE_FAILURE'
export const NEW_RECIPE_CHANGE = 'NEW_RECIPE_CHANGE'
export const EDIT_RECIPE_CHANGE = 'EDIT_RECIPE_CHANGE'

export const fetchRecipes = () => ({
  type: RECIPE_FETCH_REQUEST,
})

export const searchRecipes = (ingredient) => ({
  type: RECIPE_SEARCH_REQUEST,
  ingredient,
})

export const receiveRecipes = (recipes) => ({
  type: RECIPE_FETCH_SUCCESS,
  recipes,
})

export const failReceiveRecipes = (message) => ({
  type: RECIPE_FETCH_FAILURE,
  message,
})

export const createRecipe = (recipe) => ({
  type: RECIPE_CREATE_REQUEST,
  recipe,
})

export const receiveRecipe = (recipe) => ({
  type: RECIPE_CREATE_SUCCESS,
  recipe,
})

export const failReceiveRecipe = (message) => ({
  type: RECIPE_CREATE_FAILURE,
  message,
})

export const deleteRecipe = (id) => ({
  type: RECIPE_DELETE_REQUEST,
  id,
})

export const removeRecipe = (id) => ({
  type: RECIPE_DELETE_SUCCESS,
  id,
})

export const failRemoveRecipe = (message) => ({
  type: RECIPE_DELETE_FAILURE,
  message,
})

export const editRecipe = (id, recipe) => ({
  type: RECIPE_EDIT_REQUEST,
  id,
  recipe,
})

export const updateRecipe = (id, recipe) => ({
  type: RECIPE_EDIT_SUCCESS,
  id,
  recipe,
})

export const failUpdateRecipe = (message) => ({
  type: RECIPE_EDIT_FAILURE,
  message,
})

export const changeNewRecipe = (changes) => ({
  type: NEW_RECIPE_CHANGE,
  changes,
})

export const changeEditingRecipe = (changes) => ({
  type: EDIT_RECIPE_CHANGE,
  changes,
})
