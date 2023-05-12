const express = require('express')
const cors = require('cors')
var http = require('http')
const app = express()
var server = http.createServer(app)
const port = process.env.PORT || 5000;

var io = require('socket.io')(server,{
    cors:{
        origin: "*"
    }
});

app.use(cors)
app.use(express.json())

io.on("Connection", (socket) => {
    console.log("connected")
})

server.listen(port, () => {
    console.log("Server Started")
})

module.exports = server, app