const { MongoClient } = require('mongodb')

let dbConnection
const uri = "mongodb://localhost:27017/bookstore"
module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(uri)
      .then((client) => {
        dbConnection = client.db()
        return cb()
      }).catch(err => {
        console.log(err)
        return cb(err)
      })
  },
  getDb: () => dbConnection
}
