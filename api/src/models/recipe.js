import mongoose from 'mongoose'

const RecipeSchema = mongoose.Schema({
  ingredient: String,
  description: String,
  quantity: Number,
  unit: String,
  proportion: Number,
  creationDate: Date,
})

const Recipe = mongoose.model('Recipe', RecipeSchema)

export default Recipe
