const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    chat_id: {
        type: String
    },
    userid: {
        type: String
    },
    body: {
        type: String
    },
    name: {
        type: String
    },
    date: {
        type: Date, default: Date.now
    }
});

module.exports = mongoose.model('Chat', chatSchema);