const chatController = require('../controllers/chatController');

module.exports = (app, io) => {
    io.on("connection", (client)=> {
      let clientID = client.id;
        
        client.on("join", (data) => {
          console.log(data);
        });

        //client.join('some room');

        client.on("chat message", (msg) => {
            console.log(clientID);
            console.log(msg);
            //chatController.chatPost(msg);
            io.to(clientID).emit("s_msg", "Your are successfully connected !!");
        });
      });
}