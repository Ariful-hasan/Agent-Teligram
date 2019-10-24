const useragent = require('useragent');
// const OnlineUser = require('../models/onlineuserModel');
const Chat = require('../models/chatModel');
const rooms = { };

module.exports = (app, io) => {
    // let vclients = 0;
    io.on("connection", (client)=> {
      let clientID = client.id;
      let client_browser_info = useragent.parse(client.handshake.headers['user-agent']);
      let user_info = {
        "id"  : "",
        "name": ""
      };

      client.on('error', (error) => {
        console.log(error);
      });

      client.on('setSocketId', function(data) {
        var userName = data.name;
        var userId = data.userId;
        //console.log(userName);
      });

        client.on("chat_join", (room, name) => {
          user_info.id = room;
          // user_info.name = data.name;
          console.log(name);
          if (rooms[room] != null){
              return false;
          }
          //console.log('room id what');
          rooms[room] = name;
          //console.log(rooms);
          client.join(room);
          client.broadcast.emit("logged_user", rooms);



          // client.broadcast.emit("logged_user", user_info);
          // OnlineUser.findOne({userid: data.user_id})
          // .then(user => {
          //   if (!user){
          //       new OnlineUser({
          //         name: data.name,
          //         userid: data.user_id,
          //       }).save(err => {
          //         if (err){
          //           console.log(err);
          //         }else {
          //           console.log("online data save");
          //         }
          //       })
          //   }
          // })
          // .catch (err => {
          //   console.log(err);
          // });
        });

        
        client.on("send_chat_message", (room, user) => {
            user.date = new Date();
            client.broadcast.to(room).emit("chat_message", user);
            
            let chat = new Chat({
              chat_id: room,
              userid: user.userid,
              body: user.body,
              name: user.name
            });
            chat.save(err => {
              if (err)
              console.log();
            });
            
        });


        client.on("disconnect", () => {
          delete rooms[user_info.id];
          client.broadcast.emit("logged_user", rooms);
        });

        client.on("disconnect_chat", (room) => {
          delete rooms[room];
          client.broadcast.emit("logged_user", rooms);
        });

        client.on('get_online_users', () => {
          //console.log('get online users');
          //io.sockets.emit ('test', rooms);
          io.to(clientID).emit('online_users', rooms);
        });

        client.on('agent_connect', (room, name) => {
          //console.log(room);
          client.join(room);
          io.to(room).emit('test', 'agent connected!!!!');
        });

        client.on("typing", (room, data) => {
            client.to(room).emit('typing', data);
        });




        /**
         * Video Calll 
         */
        client.on("new_video_client", (room, type) => {
          console.log('new_video_client : '+room);
          console.log(type);
          //io.to(room).emit("CreatePeer", type);
          client.emit('CreatePeer', type);
        });
        client.on("Offer", (room, offer) => {
          console.log('OFFER : '+room);
          client.to(room).emit("BackOffer", offer)
        });
        client.on('Answer', (room, data) => {
          console.log('ANSWER : '+data);
          client.to(room).emit("BackAnswer", data);
        });
        client.on('ready_client', (room) => {
          console.log('ready_client : '+room);
          client.to(room).emit("open_video_window");
        });
        client.on('video_request', (room) => {
          console.log('video_request : '+room);
          client.to(room).emit("start_video");
        });
      
      });
}