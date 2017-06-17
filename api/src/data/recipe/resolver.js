import Recipe from '../../models/recipe'

const resolver = {
  Query: {
    recipes(_, args) {
      return Recipe.find(args).exec()
    },
  },
  Mutation: {
    createRecipe(_, args) {
      return Recipe.create(args.recipe)
    },
    updateRecipe(_, args) {
      return Recipe.findOneAndUpdate({ _id: args.id }, args.recipe, { new: true })
    },
    deleteRecipe(_, args) {
      return Recipe.remove({ _id: args.id })
    },
  },
}

export default resolver
