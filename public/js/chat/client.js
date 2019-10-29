$("#msg_list").height($("#chat_window").height()-220);
setMsgForm($("#chat_window").height()-240);

socket.on('connect', () => {  
    socket.emit("chat_join", user.userid, user.name);
});

socket.on('start_video', () => {
    console.log('start_video in browser!!!!');
    //isVideoRequest = true;
    // showClientVideoContent(true);
    Swal.fire({
        title: '',
        text: "Agent Calling you",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Receive'
        }).then((result) => {
            //console.log(result);
        if (result.value) {
            isVideoRequest = true;
            showClientVideoContent(true);
            console.log("disconnect btn is called in browser");
            console.log(room);
            //socket.emit('enable_disconnect_btn', room);
        }
        });
});

let showClientVideoContent = () => {
    if ($("#v_window").hasClass('invisible')) {
        $("#v_window").removeClass('invisible');
        startVideo();
    }
};
