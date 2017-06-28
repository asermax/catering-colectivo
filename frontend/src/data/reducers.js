import event from './event/reducers'
import page from './page/reducers'
import recipe from './recipe/reducers'

// Combine all reducers into one root reducer
export default {
  event,
  page,
  recipe,
}
