import recipes from './recipe/reducers'
import events from './event/reducers'

// Combine all reducers into one root reducer
export default {
  recipes,
  events,
}
