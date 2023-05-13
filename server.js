const { Socket } = require('dgram')
const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require("socket.io")
const formatMsg = require('./utils/messages')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const botName = 'admin'

//setting static folder
app.use(express.static(path.join(__dirname, 'public')))

//run when a client connects
io.on('connection', (socket) => {
    
    // welocome current user
    socket.emit('msg', formatMsg(botName,"Welcome new user"))

    //testing
    // socket.emit('testt', {
    //     "message": "hello",
    //     "index": 1
    // })
    //io.emit('msg', "hello")

    //Broadcast whne a user connects
    socket.broadcast.emit('msg', 'a new user has joined')
    
    //when user diconnects
    socket.on('disconnect', () => {
        io.emit('msg', 'A user has left')
    })

    //listen for chat message
    socket.on("chatMsg", (msg) =>{
        console.log(msg)
        io.emit('msg', formatMsg("user1",msg))
    })
})

const PORT = 3000 || process.env.PORT

server.listen(PORT, () =>{
    console.log("listenting to",PORT)
})