/* globals Promise */

import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress } from 'graphql-server-express'
import { MONGO_URL, PORT } from './config'
import routes from './routes'
import { schema } from './data'

// mongoose
mongoose.Promise = Promise
const connect = () => (
  mongoose.connect(MONGO_URL, (err) => {
    if (err != null) {
      setTimeout(connect, 5000)
    }
  })
)
connect()

// setup express instance
const app = express()
const port = PORT

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', routes)
app.use('/api', graphqlExpress({ schema }))

app.listen(port)
