import express from 'express'
import http from 'http'
import createGame from './Game.js'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

const PORT = 8080

const game = createGame()

sockets.on('connection', (socket) => {
    console.log(socket.id)
})

server.listen(PORT, () => {
    console.log(`> Server listening on port: ${PORT}`)
})