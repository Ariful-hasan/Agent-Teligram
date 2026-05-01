require('dotenv').config();
const fs = require('fs');
const https = require('https');
const path = require('path');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const app = require('./app');
const dbkey = process.env.MONGO_URI;

// SSL Options
const options = {
    key: fs.readFileSync(path.resolve(__dirname, '../key.pem'), 'utf8').toString(), 
    cert: fs.readFileSync(path.resolve(__dirname, '../server.crt'), 'utf8').toString() 
};

// Create Server
const server = https.createServer(options, app);

// Socket.io Setup
const io = socketIO(server);
app.set('socketio', io);
require('./sockets/chat-engine')(app, io);

// Database connection
mongoose.connect(dbkey, {useNewUrlParser: true})
.then( client => {
    if (client)
    console.log('mongoose connected!!');
    else 
    console.log('mongoose not connected!!');
    
})
.catch(err => {
    console.log('mongo not connected!!!!'); 
    console.log(err); 
});

const PORT = process.env.PORT || 4444;
server.listen(PORT, '0.0.0.0', ()=> {
    console.log(`server listen on port ${PORT} at 0.0.0.0!`);
});
