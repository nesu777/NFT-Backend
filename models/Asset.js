const mongoose = require('mongoose')

const assetSchema = new mongoose.Schema({
  name: {type: String},
  creator: {type: String},
  price: {type: Number},
  likes: {type: Number, default:0},
  image: {type: String}
})

const Asset = mongoose.model('Asset', assetSchema)
module.exports = Asset
