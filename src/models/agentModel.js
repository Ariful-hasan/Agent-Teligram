const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AgentSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    userid: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    date: {
        type: Date, 
        default: Date.now
    }
});

 const Agent = mongoose.model('Agent', AgentSchema);
 module.exports = Agent;