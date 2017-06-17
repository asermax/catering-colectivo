import gql from 'graphql-tag'
import { recipeFieldsFragment } from './fragments'

export const createRecipeMutation = gql`
  mutation createRecipe($recipe: RecipeInput!) {
    recipe: createRecipe(recipe: $recipe) {
      ...recipeFields
    }
  }
  ${recipeFieldsFragment}
`

export const updateRecipeMutation = gql`
  mutation updateRecipe($id: ID!, $recipe: RecipeInput!) {
    recipe: updateRecipe(id: $id, recipe: $recipe) {
      ...recipeFields
    }
  }
  ${recipeFieldsFragment}
`

export const deleteRecipeMutation = gql`
  mutation deleteRecipe($id: ID!) {
    deleted: deleteRecipe(id: $id)
  }
`
