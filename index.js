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
// Routes
const home = require('./routes/home')
//const submit = require('./routes/submit')
const errorHandler = require('./middleware/error')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
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

app.use(home)
//app.use(submit)
app.use(errorHandler)

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on ${port}`))
