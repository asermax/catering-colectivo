export const getRecipes = (state) => state.recipes.list
export const getRecipe = (state, id) => state.recipes.list.find((recipe) => recipe._id === id)
