const server = require('./servers/http')
const config = require('./utils/config')
const logger = require('./utils/logger')

server.listen(config.PORT, () => {
  logger.info('Server listening on port', config.PORT)
})