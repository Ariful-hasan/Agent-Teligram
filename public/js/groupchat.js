$(document).ready(function() {
    let url = "http://localhost:4444";
    let socket = io(url);
    socket.on('connect', ()=> {
        console.log('yea! User Connected');       
    });
});