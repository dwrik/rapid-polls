require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const pollsRouter = require('./controllers/pollsRouter')
const cors = require('cors')

logger.info('Connecting to database...')

mongoose.connect(config.MONGO_URI)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((error) => logger.error('error:', error.message))

const app = express()

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/polls', pollsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app