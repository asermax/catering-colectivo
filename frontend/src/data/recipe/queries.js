import gql from 'graphql-tag'
import { recipeFieldsFragment } from './fragments'

export const allRecipesQuery = gql`
  query allRecipes {
    recipes {
      ...recipeFields
    }
  }
  ${recipeFieldsFragment}
`
