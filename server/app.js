require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

logger.info('Connecting to database...')

mongoose.connect(config.MONGO_URI)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((error) => logger.error('error:', error.message))

const app = express()

app.use(express.json())
app.use(middleware.requestLogger)

// routers, controllers

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app