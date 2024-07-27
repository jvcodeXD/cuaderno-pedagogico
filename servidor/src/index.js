const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const dotenv = require('dotenv')
const passport = require('passport')

const routes = require('./routes/index')

require('./config/passport')

dotenv.config()

// init
const app = express()

// settings
app.set('port', process.env.PORT)
app.use('/files', express.static(path.join(__dirname, 'public/files')))

// Middleware
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())

// Routes
app.use('/api', routes)

// Server
app.listen(app.get('port'), () => {
  console.log('Server on port: ', app.get('port'))
})
