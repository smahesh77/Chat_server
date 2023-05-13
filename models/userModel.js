const moong = require('mongoose')
const db = require('../config/db')


const {Schema} = moong



const userSchema = new Schema({
    username:{
        type: String,
        
    },
    room:{
        type: String,
        required:true,
    },
})
const userModel = db.model('user', userSchema)

module.exports = userModel