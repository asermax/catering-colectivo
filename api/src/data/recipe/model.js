import mongoose from 'mongoose'

const RecipeSchema = mongoose.Schema({
  ingredient: { type: String, required: true, minlength: 1 },
  description: { type: String, required: true, minlength: 1 },
  quantity: { type: Number, required: true, min: 1 },
  unit: { type: String, required: true, minlength: 1 },
  proportion: { type: Number, required: true, min: 1 },
  creationDate: { type: Date, default: Date.now },
})

const Recipe = mongoose.model('Recipe', RecipeSchema)

export default Recipe
