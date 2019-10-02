const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const onlieuserSchema = new Schema({
    name: {
        type: String
    },
    userid: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Y',
        required: true
    },
    date: {
        type: Date, 
        default: Date.now
    }
});

const OnlineUser = mongoose.model('OnlineUser', onlieuserSchema);
module.exports = OnlineUser;