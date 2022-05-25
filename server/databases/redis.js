const config = require('../utils/config')
const logger = require('../utils/logger')

const client = require('redis').createClient({
  url: `redis://${config.REDIS_USERNAME}:${config.REDIS_PASSWORD}@${config.REDIS_HOST}`
})

const connectToRedis = () => {
  client.connect()
    .then(() => logger.info('Connected to Redis'))
    .catch((error) => logger.error('error:', error.message))
}

module.exports = {
  connectToRedis,
  client,
}