const userModel = require('../models/userModel')


class userServices {
    
//join user to chat
static async userJoin(username, room) {
    try {
     const user = new userModel({username, room})
     console.log(user['username'])
     return await user.save();
    } catch (err) {
         console.log(err)
     
    }
 }
 
 static async getUser(name) {
     try {
         const user = await userModel.findOne({username})
     } catch (err) {
         console.log(err)
         
     }
 }
}

module.exports = userServices