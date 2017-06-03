import Router from 'express-promise-router'
import { register as registerRecipe } from './recipe'
import { register as registerEvent } from './event'

const router = Router()

registerRecipe(router)
registerEvent(router)

export default router
