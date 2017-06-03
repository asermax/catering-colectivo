import mongoose from 'mongoose'

const EventDetailSchema = mongoose.Schema({
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
  amountPeople: { type: Number, required: true },
})

const EventSchema = mongoose.Schema({
  organization: { type: String, required: true },
  eventDescription: String,
  eventDate: Date,
  amountPeople: Number,
  creationDate: { type: Date, default: Date.now },
  details: [ EventDetailSchema ],
})

const Event = mongoose.model('Event', EventSchema)

export default Event
