const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server); 
const groupRoute = require('./routes/groupRouter');


require('./socket/groupchat')(io);
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use("/group-chat", groupRoute);


server.listen(4444, () => {
    console.log('listening on :4444');
});

