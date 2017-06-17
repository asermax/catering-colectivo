import { Recipe } from '../recipe'
import Event from './model'

const resolver = {
  root: {
    Query: {
      events(_, args) {
        return Event.find(args).exec()
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
