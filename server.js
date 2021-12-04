//external modules
const express = require('express')
const cors = require('cors')
const session = require('express-session')
//internal modules
const routes = require('./routes')

//port !!CHANGE LATER!!
const PORT = process.env.PORT || 3003

//express instance
const app = express()

const MongoDBStore = require('connect-mongodb-session')(session)

//db connection
require('./config/db.connection')

require('dotenv').config()

//use json
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//cors
const whiteList = ['http://localhost:3000', 'https://nft-market-app.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback){
    if (whiteList.indexOf(origin) !== -1 || !origin){
      callback(null,true)
    }else {
      callback (new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

app.set('trust proxy', 1)

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoDBStore({
    uri: process.env.MONGODBURI,
    collection: 'mySessions'
  }),
  cookie: {
    sameSite: 'none',
    secure: true
  }
}))

app.get('/', ( req, res )=>{
  res.send('Hello World!');
})

// Routes
app.use('/assets', routes.assets)

app.listen(PORT, ()=> {
  console.log('app is listening on port ' + PORT)
})