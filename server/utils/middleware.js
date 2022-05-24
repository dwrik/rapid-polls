const logger = require('./logger')
const { client } = require('../databases/redis')

const requestLogger = (request, response, next) => {
  logger.info(request.method, request.path, '-', request.body)
  next()
}

const pollRetriever = async (request, response, next) => {
  request.poll = await client.HGETALL(request.params.pollId)
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error)
  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    response.status(400).send({ error: 'invalid data' })
  }
  next(error)
}

module.exports = {
  requestLogger,
  pollRetriever,
  unknownEndpoint,
  errorHandler,
}