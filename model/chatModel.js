const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    sender_id  : {
        type: String,
    },
    receiver_id : {
        type : String,
    },
    message : {
        type : String ,
    },
    status : {
        type : String , 
    },
    createAt : {
        type : String
    }
});

exports.chat = mongoose.model('chat' , chatSchema)