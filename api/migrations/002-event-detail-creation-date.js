/* globals require, module */
var mongoose = require('mongoose')

exports.up = function(next){
  const db = mongoose.connections[1].db

  db.collection('events')
    .find({})
    .forEach(function(event) {
      if (event.details != null) {
        event.details.forEach(function(detail) {
          detail.creationDate = Date.now()
        })

        db.collection('events').save(event)
      }
    })
  next()
}

exports.down = function(next){
  const db = mongoose.connections[1].db

  db.collection('events')
    .find({})
    .forEach(function(event) {
      if (event.details != null) {
        event.details.forEach(function(detail) {
          delete detail.creationDate
        })

        db.collection.save(event)
      }
    })
  next()
}
