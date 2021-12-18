//modules and cors
const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const session = require('express-session')


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
  },

  credentials:true
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

// const isAuthenticated = (req, res, next) => {
//     if (req.session.currentUser) {
//         return next()
//     } else {
//         res.status(403).json({msg:"login required"})
//     }
// }

app.get('/', ( req, res )=>{
  res.send('Backend Connected');
})

// Routes
app.use('/assets', routes.assets)
app.use('/users', routes.users)

app.listen(PORT, ()=> {
  console.log('app is listening on port ' + PORT)
})