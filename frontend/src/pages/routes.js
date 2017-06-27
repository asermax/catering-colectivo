import {
  EVENT_GALLERY, EVENT_ADD, RECIPE_GALLERY, RECIPE_ADD, RECIPE_EDIT,
} from 'data/page/actions'

export default {
  [EVENT_GALLERY]: '/',
  [EVENT_ADD]: '/events/add',
  [RECIPE_GALLERY]: '/recipes',
  [RECIPE_ADD]: '/recipes/add',
  [RECIPE_EDIT]: '/recipes/:id',
}
