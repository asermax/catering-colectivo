export const EVENT_GALLERY = 'ROUTE_EVENT_GALLERY'
export const EVENT_ADD = 'ROUTE_EVENT_ADD'
export const RECIPE_GALLERY = 'ROUTE_RECIPE_GALLERY'
export const RECIPE_ADD = 'ROUTE_RECIPE_ADD'
export const RECIPE_EDIT = 'ROUTE_RECIPE_EDIT'

export const goTo = (type, payload) => ({
  type,
  payload,
})

export const allRoutes = [ EVENT_GALLERY, EVENT_ADD, RECIPE_GALLERY, RECIPE_ADD, RECIPE_EDIT ]
