$("#msg_list").height($("#chat_window").height()-220);
setMsgForm($("#chat_window").height()-240);

socket.on('connect', () => {  
    socket.emit("chat_join", user.userid, user.name);
});

socket.on('start_video', () => {
    //console.log('start_video in browser!!!!');
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
        }).then(async (result) => {
        if (result.value) {
            //await setCLientVideoWindow();
            isVideoRequest = true;
            showClientVideoContent(true);
            //console.log("disconnect btn is called in browser");
            //console.log(room);
        }
        });
});

let showClientVideoContent = () => {
    if ($("#v_window").hasClass('invisible')) {
        $("#v_window").removeClass('invisible');
        console.log('test_call before');
        socket.emit("test_call", room, "THANOS");
        startVideo();     
    }
};



socket.on('start_audio', () => {
    Swal.fire({
        title: '',
        text: "Agent Calling you",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Receive'
        }).then(async (result) => {
        if (result.value) {
            isAudioRequest = true;
            showClientAudioContent();
        }
        });
});

let showClientAudioContent = () => {
    if ($("#v_window").hasClass('invisible')) {
        $("#v_window").removeClass('invisible');
        $("#self_video_window").addClass('invisible');
        console.log('test_call before');
        startVideo(false);     
    }
};


// let setCLientVideoWindow = () => {
//     let html = '';
//     html += '<div class="col-md-3" id="v_window">';
//     html += '<div class="card">';
//     html += '<div class="card-body">';
//     html += '<div class="col-12 d-flex justify-content-center p-0">';
//     html += '<div class="embed-responsive embed-responsive-16by9 p-0" id="self_camera">';
//     html += '<video class="embed-responsive-item p-0" muted></video>';
//     html += '</div>';
//     html += '</div>';
//     html += '</div>';
//     html += '</div>';

//     html += '<div class="card col-4" id="user_video_window">';
//     html += '<div class="card-body p-0">';
//     html += '<div class="col-12 d-flex justify-content-center p-0">';
//     html += '<div id="peerDiv" class="embed-responsive embed-responsive-16by9 p-0">';
//     html += '</div>';
//     html += '</div>';
//     html += '</div>';
//     html += '</div>';
//     html += '</div>';
//     $("#m_chat_window").removeClass('col-md-8');
//     $("#m_chat_window").addClass('col-md-7');
//     $("#main_window").append(html);
// };
