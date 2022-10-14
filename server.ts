import express from 'express'
import { createServer } from 'http'
import socketIo from 'socket.io'

const app = express()
const server = createServer(app)
const io = new socketIo.Server(server, { transports: ['websocket'] })

io.on('connection', socket => {
  socket.on('submit', msg => {
    socket.broadcast.emit('update-chat', msg)
  })
})

server.listen(8080, () => {
  console.log('listening on *:8080')
})
