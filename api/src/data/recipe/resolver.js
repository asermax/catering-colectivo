import Recipe from './model'

const resolver = {
  root: {
    Query: {
      recipes(_, { ingredient }) {
        const query = Recipe.find()

        if (ingredient != null) {
          // allow searching by name
          ingredient = ingredient.trim()

          if (ingredient !== '') {
            query.regex('ingredient', new RegExp(ingredient, 'i'))
          }
        }

        return query.exec()
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
