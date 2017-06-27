import events from './event/reducers'
import page from './page/reducers'
import recipes from './recipe/reducers'

// Combine all reducers into one root reducer
export default {
  events,
  page,
  recipes,
}
