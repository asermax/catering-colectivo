import gql from 'graphql-tag'

export const recipeFieldsFragment = gql`
  fragment recipeFields on Recipe {
    _id
    ingredient
    description
    quantity
    unit
    proportion
    creationDate
  }
`
