const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    //participants is an array which holds the ids of users from the Users table
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Messages",
        default: [],
    }]
    //messages is an array which holds the ids of each individual messages from the Messages table
}, { timestamps: true });
//We are using timestamps to store the createdAt field in the table

ConversationSchema.methods.updateMessage = function(newMessage) {
    this.messages.push(newMessage._id);//To push the new message onto the messages array
    return this.save();//To save the changes 
}
//udpateMessage function is to update the messages of the conversation

module.exports = mongoose.model('Conversation', ConversationSchema);