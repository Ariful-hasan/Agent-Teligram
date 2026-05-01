const path = require('path');

exports.chatUrl = process.env.CHAT_URL || "http://localhost:4444";
exports.path = path.join(__dirname, '../../');
exports.mongoKey = process.env.MONGO_URI;
exports.uuid_namespace = process.env.UUID_NAMESPACE || '1b671a64-40d5-491e-99b0-da01ff1f3341';
