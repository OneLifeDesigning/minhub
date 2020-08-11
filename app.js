require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const path = require('path')


require('./config/db.config')

const app = express()


app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('dev'))
app.use(cookieParser())

/**
 * View engine setup
 */
const expressLayouts = require('express-ejs-layouts');
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(expressLayouts)
 
app.locals.helpers = require('./config/helpers.config')

/**
 * Configure routes
 */
const router = require('./config/routes.js')
app.use('/', router)

app.listen(process.env.PORT || 3000, () => {
  console.log('Minhub project running on port 3000 - http://localhost:3000/ 🧳🧳🧳🧳🧳')
})