import { Recipe } from '../recipe'
import Event from './model'

const resolver = {
  root: {
    Query: {
      events() {
        return Event.find().exec()
      },
      event(_, { id }) {
        return Event.findById(id).exec()
      },
    },
    Mutation: {
      createEvent(_, { event }) {
        return Event.create(event)
      },
      updateEvent(_, { id, event }) {
        return Event.findOneAndUpdate({ _id: id }, event, { new: true })
      },
      deleteEvent(_, { id }) {
        return Event.remove({ _id: id })
      },
      async createEventDetail(_, { eventId, eventDetail }) {
        // find the event and create the detail
        const event = await Event.findById(eventId).exec()
        const detail = event.details.create(eventDetail)
        event.details.push(detail)

        await event.save()

        return detail
      },
      async updateEventDetail(_, { eventId, id, eventDetail }) {
        // find the event and update the detail
        const event = await Event.findById(eventId).exec()
        const detail = event.details.id(id)
        Object.assign(detail, eventDetail)

        await event.save()

        return detail
      },
      async deleteEventDetail(_, { eventId, id }) {
        // find the event and remove the detail
        const event = await Event.findById(eventId).exec()
        event.details.id(id).remove()

        try {
          await event.save()
          return true
        } catch(_) {
          return false
        }
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
