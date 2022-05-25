const http = require('http')
const { Server } = require('socket.io')
const config = require('./utils/config')
const logger = require('./utils/logger')
const app = require('./app')

const server = http.createServer(app)
const io = new Server(server)

server.listen(config.PORT, () => {
  logger.info('Server listening on port', config.PORT)
})

io.on('connection', (socket) => {
  socket.emit('send-poll-id')
  socket.on('poll-id-sent', (id) => socket.join(id))
})

global.io = io