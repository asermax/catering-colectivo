import {
  EVENT_GALLERY, EVENT_ADD, EVENT_EDIT, RECIPE_GALLERY, RECIPE_ADD, RECIPE_EDIT,
} from 'data/page/actions'

export default {
  [EVENT_GALLERY]: '/',
  [EVENT_ADD]: '/events/add',
  [EVENT_EDIT]: '/events/:id',
  [RECIPE_GALLERY]: '/recipes',
  [RECIPE_ADD]: '/recipes/add',
  [RECIPE_EDIT]: '/recipes/:id',
}
