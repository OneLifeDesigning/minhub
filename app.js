require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const path = require('path')
const cookieParser = require('cookie-parser')


require('./config/db.config')

const session = require("./config/session.config")
const passport = require('./config/passport.config')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('dev'))
app.use(cookieParser())
app.use(session)
app.use(passport)

/**
 * View engine setup
 */
const expressLayouts = require('express-ejs-layouts');
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(expressLayouts)

app.use((req, res, next) => {
  res.locals.helpers = require('./config/helpers.config')
  next();
})

/**
 * Configure routes
 */
const router = require('./config/routes.js')
app.use('/', router)

app.listen(process.env.PORT || 3000, () => {
  console.log('Minhub project running on port 3000 - http://localhost:3000/ 🧳🧳🧳🧳🧳')
})