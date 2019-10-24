$("#msg_list").height($("#chat_window").height()-220);
setMsgForm($("#chat_window").height()-240);

socket.on('connect', () => {  
    socket.emit("chat_join", user.userid, user.name);
});

socket.on('start_video', () => {
    console.log('start_video in browser!!!!');
    //isVideoRequest = true;

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            console.log(result);
        if (result.value) {
            isVideoRequest = true;
            showClientVideoContent(true);
        }
        });
   
    // showClientVideoContent(true);
});

let showClientVideoContent = () => {
    if ($("#v_window").hasClass('invisible')) {
        $("#v_window").removeClass('invisible');
        startVideo();
    }
};