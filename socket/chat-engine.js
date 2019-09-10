// const chatController = require('../controllers/chatController');
const useragent = require('useragent');

module.exports = (app, io) => {
    io.on("connection", (client)=> {
      let clientID = client.id;
      let client_browser_info = useragent.parse(client.handshake.headers['user-agent']);
      console.log(app);

        client.on("chat-join", (data) => {
          //console.log(data);
        });

        //client.join('some room');

        client.on("chat message", (msg) => {
            console.log(msg);
            io.to(clientID).emit("s_msg", "Your are successfully connected !!");
        });
      });
}