const express = require('express')
const cors = require('cors')

const {app, server} = require('./app')
const port = process.env.PORT || 5000;


var io = require('socket.io')(server,{
    cors:{
        origin: "*"
    }
});








