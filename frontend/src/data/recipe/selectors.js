import { createSelector } from 'reselect'

export const identity = (param) => param
export const getRecipes = (state) => state.recipes.list
export const getDateOrderedRecipes = createSelector(
  getRecipes,
  (recipes) => recipes.slice(0).sort((a, b) => (b.creationDate - a.creationDate)),
)
export const getRecipe = (state, id) => state.recipes.list.find((recipe) => recipe._id === id)
export const getEditingId = (state) => state.recipes.edit.editingId
export const getEditingRecipeChanges = (state) => state.recipes.edit.editingRecipe
export const getEditingRecipe = createSelector(
  [ getRecipes, getEditingId, getEditingRecipeChanges ],
  (recipes, id, changes) => {
    let result = null

    if (id != null) {
      const { __typename, _id, creationDate, ...recipe } = recipes
        .find((recipe) => recipe._id === id)
      result = {
        ...recipe,
        ...changes,
      }
    }

    return result
  },
)
export const isAddingRecipe = (state) => state.recipes.add.isAdding
export const getNewRecipe = (state) => state.recipes.add.newRecipe
