import { createSelector } from 'reselect'

export const getRecipes = (state) => state.recipe.list
export const getDateOrderedRecipes = createSelector(
  getRecipes,
  (recipes) => recipes.slice(0).sort((a, b) => (b.creationDate - a.creationDate)),
)
export const getRecipe = (state, id) => state.recipe.list.find((recipe) => recipe._id === id)
export const getEditingId = (state) => state.recipe.edit.editingId
export const getEditingRecipeChanges = (state) => state.recipe.edit.editingRecipe
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
export const isAddingRecipe = (state) => state.recipe.add.isAdding
export const getNewRecipe = (state) => state.recipe.add.newRecipe
