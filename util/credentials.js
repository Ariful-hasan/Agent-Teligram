const path = require('path');
const url = "http://localhost:4444";
const mongoKey = "mongodb://arif:arif123@ds245901.mlab.com:45901/testexp";
exports.url = url;
exports.path = path.dirname(process.mainModule.filename);
exports.mongoKey = mongoKey;