import Recipe from './model'

const resolver = {
  root: {
    Query: {
      recipes() {
        return Recipe.find().exec()
      },
    },
    Mutation: {
      createRecipe(_, { recipe }) {
        return Recipe.create(recipe)
      },
      updateRecipe(_, { id, recipe }) {
        return Recipe.findOneAndUpdate({ _id: id }, recipe, { new: true })
      },
      deleteRecipe(_, { id }) {
        return Recipe.remove({ _id: id })
      },
    },
  },
}

export default resolver
