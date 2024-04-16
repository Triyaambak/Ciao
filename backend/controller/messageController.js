const { StatusCodes } = require('http-status-codes');
const Conversation = require('../models/conversation');
const Message = require('../models/messages');
const { UpdateConversationError } = require('../errors/errors');
const { io, getReceiverSocketId } = require('../socket/socket');

const sendMessage = async (req, res) => {
    const { message } = req.body;
    const recieverId = req.params.id;
    const senderId = req.user._id;
    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, recieverId] },
    });
    //We are retrieving the conversation which contains both the senderId and recieverId in its participants array
    if (!conversation) {
        conversation = await Conversation.create({
            participants:[senderId,recieverId],
        })
    };
    //If there are no conversation between senderId and recieverId we are creating a new one
    const newMessage = await Message.create({
        senderId,
        recieverId,
        message,
    });
    //We are creating the new message between the senderId and recieverId
    const successfulUpdate = await conversation.updateMessage(newMessage);
    //We are updating the conversation by pushing the newMessage to the messages array
    if (!successfulUpdate)
        throw new UpdateConversationError('Conversation Not Updated');
    //We are throwing an error if the messages array was not successfully updated
    const receiverSocketId = getReceiverSocketId(recieverId);
    if (receiverSocketId) {
        // io.to(<socket_id>).emit() is used to send events to specific client
        io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(StatusCodes.CREATED).json(newMessage);
}

const getMessages = async (req, res) => {
    const recieverId = req.params.id;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
        participants: { $all: [senderId, recieverId] },
    }).populate("messages");
    //We are getting the conversation between senderId and RecieverId
    //We have used .populate("messages") since the conversation only contains the messageId and with this we will be returned each individual message along with the conversation object
    if (!conversation)
        return res.status(StatusCodes.OK).json([]);
    //If there is no conversation between the senderId and recieverId then return empty array
    res.status(StatusCodes.OK).json(conversation.messages);
    //We are returning the response only with the messages array
}

module.exports = {
    sendMessage,
    getMessages,
}