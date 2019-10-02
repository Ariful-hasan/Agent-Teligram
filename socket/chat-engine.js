const useragent = require('useragent');
const OnlineUser = require('../models/onlineuserModel');

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
          
          client.broadcast.emit("logged_user", user_info);

          OnlineUser.findOne({userid: data.user_id})
          .then(user => {
            //console.log(data);
            if (!user){
                new OnlineUser({
                  name: data.name,
                  userid: data.user_id,
                }).save(err => {
                  if (err){
                    console.log(err);
                  }else {
                    console.log("online data save");
                  }
                })
            }
          })
          .catch (err => {
            console.log(err);
          })
        });

        
        client.on("chat message", (msg) => {
            //console.log(msg);
            io.to(clientID).emit("s_msg", "Your are successfully connected !!");
        });
      });
}