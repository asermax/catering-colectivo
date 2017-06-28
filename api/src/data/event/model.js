import mongoose from 'mongoose'

const EventDetailSchema = mongoose.Schema({
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
  amountPeople: { type: Number, required: true },
  note: String,
  creationDate: { type: Date, default: Date.now },
})

const EventSchema = mongoose.Schema({
  organization: { type: String, required: true },
  description: String,
  date: Date,
  amountPeople: Number,
  creationDate: { type: Date, default: Date.now },
  details: [ EventDetailSchema ],
})

const Event = mongoose.model('Event', EventSchema)

export default Event
