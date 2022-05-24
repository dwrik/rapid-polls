const client = require('redis').createClient()
const logger = require('../utils/logger')

const connectToRedis = () => {
  client.connect()
    .then(() => logger.info('Connected to Redis'))
    .catch((error) => logger.error('error:', error.message))
}

module.exports = {
  connectToRedis,
  client,
}