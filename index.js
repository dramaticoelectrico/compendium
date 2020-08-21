require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('connected to DB')
  }
)
const app = express()
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'views/admin/'),
])
app.set('view engine', 'pug')

// Routes
const signIn = require('./routes/authorize')
const adminPages = require('./routes/admin')
const home = require('./routes/home')

const errorHandler = require('./middleware/error')

app.use(cookieParser())
app.use(
  express.static(
    path.join(
      __dirname,
      `${app.get('env') === 'development' ? 'public' : 'dist'}`
    )
  )
)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(signIn)
app.use(adminPages)
app.use(home)

app.use(errorHandler)

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on ${port}`))
