// if url empty. default is hosting server.
//const url = require('../../util/credentials').url;


let socket = io();

// socket.on("connect", (data) => {
//   socket.emit("join", "Hello server from client");
// });

// // listener for 'thread' event, which updates messages
// socket.on("thread", (data) => {
//   $("#thread").append("<li>" + data + "</li>");
// });

// // sends message to server, resets & prevents default form action
// $("form").submit(() => {
//   var message = $("#message").val();
//   socket.emit("messages", message);
//   this.reset();
//   return false;
// });