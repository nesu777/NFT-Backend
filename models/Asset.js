const mongoose = require('mongoose')

const assetSchema = new mongoose.Schema({
  name: {type: String},
  author: {type: String},
  price: {type: Number}
})

const Asset = mongoose.model('Asset', assetSchema)
module.exports = Asset
