import { createSelector } from 'reselect'

export const getRecipes = (state) => state.recipes.list
export const getDateOrderedRecipes = createSelector(
  getRecipes,
  (recipes) => recipes.slice(0).sort((a, b) => (b.creationDate - a.creationDate)),
)
export const getRecipe = (state, id) => state.recipes.list.find((recipe) => recipe._id === id)
export const getEditingRecipe = (state) => state.recipes.editing
export const isAddingRecipe = (state) => state.recipes.add.isAdding
export const getNewRecipe = (state) => state.recipes.add.newRecipe
