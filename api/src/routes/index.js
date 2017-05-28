import Router from 'express-promise-router'
import restify from 'express-restify-mongoose'
import { register as registerRecipe } from './recipe'

const router = Router()

registerRecipe(router)

export default router
