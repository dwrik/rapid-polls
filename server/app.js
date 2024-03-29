require('express-async-errors')
const cors = require('cors')
const express = require('express')
const path = require('node:path')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const pollsRouter = require('./controllers/pollsRouter')
const votesRouter = require('./controllers/votesRouter')
const connectToMongoDB = require('./databases/mongodb')
const { connectToRedis } = require('./databases/redis')

logger.info('Connecting to databases...')

connectToMongoDB()
connectToRedis()

const app = express()

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(express.static(path.join(__dirname, 'build')))

app.use('/api/polls', pollsRouter)
app.use('/api/votes', votesRouter)

app.get('/*', (request, response) => {
  response.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app