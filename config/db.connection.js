const mongoose = require('mongoose')

const connectionStr = process.env.MONGODBURI

mongoose.connect(connectionStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', ()=>console.log('mongodb connected'))
mongoose.connection.on('error', (error)=>console.log('mongodb error:' + error))
mongoose.connection.on('disconnected', ()=>console.log('mongodb disconnected'))
