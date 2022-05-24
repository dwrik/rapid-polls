const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')

const connectMongoDB = () => {
  mongoose.connect(config.MONGO_URI)
    .then(() => logger.info('Connected to MongoDB'))
    .catch((error) => logger.error('error:', error.message))
}

module.exports = connectMongoDB