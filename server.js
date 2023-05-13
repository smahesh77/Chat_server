const { Socket } = require('dgram')
const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require("socket.io")
const formatMsg = require('./utils/messages')
const userModel = require('./models/userModel')
const userServices = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const botName = 'admin'

//setting static folder
app.use(express.static(path.join(__dirname, 'public')))

//run when a client connects
io.on('connection', async (socket) =>  {

    socket.on('joinroom',async ({username, room}) => {
        
    console.log(username, room)
    const user =  await userServices.userJoin(username, room)// this will get user from db
    //Broadcast whne a user connects
    //socket.join(user['room'])
    socket.broadcast.emit('msg', `new user has joined`)// to only broadcast to the room user joined
        
                
       
    // welocome current user
    socket.emit('msg', formatMsg(botName,`Welcome new user `))

     
  
      //listen for chat message
      socket.on("chatMsg", (msg) =>{
          console.log(msg)
          io.emit('msg', formatMsg("user1",msg))
      })

      //when user diconnects
      socket.on('disconnect', () => {
        io.emit('msg', 'A user has left')
    })

    })
    
    

    //testing
    // socket.emit('testt', {
    //     "message": "hello",
    //     "index": 1
    // })
    //io.emit('msg', "hello")

  
})

const PORT = 3000 || process.env.PORT

server.listen(PORT, () =>{
    console.log("listenting to",PORT)
})