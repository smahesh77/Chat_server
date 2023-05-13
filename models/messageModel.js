const moong = require('mongoose')
const db = require('../config/db')
const userModel = require("./userModel")
const {Schema} = moong



const todoSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: userModel.modelName,
        required:true
    },
    email: {
        type: String
    },
    title:{
        type: String,
        required:true,
    },
    desc:{
        type: String,
        required:true,
    },
})

const msgModel = db.model('message', todoSchema)

module.exports = msgModel