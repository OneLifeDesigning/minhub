require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const path = require('path')

require('./config/db.config')
// require('./config/ejs.config')

const app = express()


app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(logger("dev"))
// app.use(cookieParser())
// app.use(session)
// app.use(passport)

/**
 * View engine setup
 */
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

/**
 * Configure routes
 */
const router = require('./config/routes.js')
app.use('/', router)

app.listen(process.env.PORT || 3000, () => {
  console.log(`Ready!`)
})