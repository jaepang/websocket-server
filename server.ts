import express from 'express'
import { createServer } from 'http'
import socketIo from 'socket.io'

const app = express()
const server = createServer(app)
export const io = new socketIo.Server(server, { transports: ['websocket'] })

app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Origin, X-Csrftoken, Content-Type, Accept')
  res.send('Hello World!')
})

io.on('connection', socket => {
  socket.on('submit', msg => {
    socket.broadcast.emit('update-chat', msg)
  })
})

server.listen(8080, () => {
  console.log('listening on *:8080')
})
