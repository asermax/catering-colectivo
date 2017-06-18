export const EVENT_GALLERY = 'ROUTE_EVENT_GALLERY'
export const RECIPE_GALLERY = 'ROUTE_RECIPE_GALLERY'
export const RECIPE_EDIT = 'ROUTE_RECIPE_EDIT'
export const RECIPE_ADD = 'ROUTE_RECIPE_ADD'

export default {
  [EVENT_GALLERY]: '/',
  [RECIPE_GALLERY]: '/recipes',
  [RECIPE_EDIT]: '/recipes/:id',
  [RECIPE_ADD]: '/recipes/add',
}

export const goTo = (type, payload) => ({
  type,
  payload,
})
