// const chatController = require('../controllers/chatController');
const useragent = require('useragent');

module.exports = (app, io) => {
    io.on("connection", (client)=> {
      let clientID = client.id;
      let client_browser_info = useragent.parse(client.handshake.headers['user-agent']);
      let user_info = {
        "id"  : "",
        "name": ""
      };

      client.on('setSocketId', function(data) {
        var userName = data.name;
        var userId = data.userId;
        //console.log(userName);
      });

        client.on("chat_join", (data) => {
          user_info.id = data.user_id;
          user_info.name = data.name;
          console.log(data);
          
          client.broadcast.emit("logged_user", user_info);
        });

        
      

        client.on("chat message", (msg) => {
            //console.log(msg);
            io.to(clientID).emit("s_msg", "Your are successfully connected !!");
        });
      });
}