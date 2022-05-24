const { Server } = require('socket.io')
const httpServer = require('./http')

module.exports =  new Server(httpServer)