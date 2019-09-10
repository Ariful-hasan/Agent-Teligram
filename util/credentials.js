const path = require('path');
const chatUrl = "http://localhost:4444";
const mongoKey = "mongodb://arif:arif123@ds245901.mlab.com:45901/testexp";
exports.chatUrl = chatUrl;
exports.path = path.dirname(process.mainModule.filename);
exports.mongoKey = mongoKey;