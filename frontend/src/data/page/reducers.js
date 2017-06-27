import * as routes from './actions'

const page = (state = null, action) => {
  switch(action.type) {
    case routes.RECIPE_ADD:
    case routes.RECIPE_EDIT:
      return routes.RECIPE_GALLERY
    default:
      if (routes.allRoutes.includes(action.type)) {
        return action.type
      } else {
        return state
      }
  }
}

export default page
