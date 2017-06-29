import { Recipe } from '../recipe'
import Event from './model'

const resolver = {
  root: {
    Query: {
      events() {
        return Event.find().exec()
      },
      event(_, { id }) {
        return Event.findOne({ _id: id }).exec()
      },
    },
    Mutation: {
      createEvent(_, { event }) {
        return Event.create(event)
      },
      deleteEvent(_, { id }) {
        return Event.remove({ _id: id })
      },
    },
  },
  nested: {
    Event: {
      details(event) {
        return event.details
      },
    },
    EventDetail: {
      recipe(detail) {
        return Recipe.findOne({ _id: detail.recipe })
      },
    },
  },
}

export default resolver
