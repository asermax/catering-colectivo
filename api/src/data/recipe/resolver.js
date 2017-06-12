import recipe from '../../models/recipe'

const resolver = {
  Query: {
    recipes(_, args) {
      return recipe.find(args).exec()
    },
  },
}

export default resolver
