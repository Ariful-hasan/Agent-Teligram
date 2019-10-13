const path = require('path');
const chatUrl = "http://localhost:4444";
// const mongoKey = "mongodb://arif:arif123@ds245901.mlab.com:45901/testexp";
const mongoKey = "mongodb://localhost:27017/testexp";
const uuid_namespace = '1b671a64-40d5-491e-99b0-da01ff1f3341';

exports.chatUrl = chatUrl;
exports.path = path.dirname(process.mainModule.filename);
exports.mongoKey = mongoKey;
exports.uuid_namespace = uuid_namespace;