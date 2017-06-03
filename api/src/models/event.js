import mongoose from 'mongoose'

const EventSchema = mongoose.Schema({
  organization: String,
  eventDescription: String,
  eventDate: Date,
  amountPeople: Number,
  creationDate: { type: Date, default: Date.now },
})

const Event = mongoose.model('Event', EventSchema)

export default Event
