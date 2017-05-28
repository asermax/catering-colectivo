import restify from 'express-restify-mongoose'
import models from '../models'

export const register = (router) => {
  restify.serve(router, models.Recipe)
}

