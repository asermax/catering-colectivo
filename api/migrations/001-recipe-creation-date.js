/* globals require */
var mongoose = require('mongoose')

exports = {
  up(next) {
    mongoose.connections[1].db.collection('recipes').updateMany(
      {},
      { $currentDate: { creationDate: true } },
    )
    next()
  },

  down(next) {
    mongoose.connections[1].db.collection('recipes').updateMany(
      {},
      { $unset: { creationDate: true } },
    )

    next()
  },
}
