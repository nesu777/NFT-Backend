const mongoose = require('mongoose')

const assetSchema = new mongoose.Schema({
  name: {type: String},
  creator: {type: String},
  price: {type: Number, default:0.01},
  likes: {type: Number, default:0}
})

const Asset = mongoose.model('Asset', assetSchema)
module.exports = Asset
