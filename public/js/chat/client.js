$("#msg_list").height($("#chat_window").height()-220);
setMsgForm($("#chat_window").height()-240);

socket.on('connect', () => {  
    //console.log('hiiiii socket connect');
    socket.emit("chat_join", user.userid, user.name);
});

socket.on('start_video', () => {
    //console.log('start_video in browser!!!!');
    //isVideoRequest = true;
    // showClientVideoContent(true);
     
    // let ringtone = new Howl({
    //     src: ['../ringtone/ringtone.mp3'],
    //     //autoplay: true,
    //     loop: true,
    //     volume: 1,
    //     onend: function() {
    //         console.log('Finished!');
    //     }
    // });

    ringtone.play();
    Swal.fire({
        title: '',
        text: "Agent Calling you",
        //type: 'warning',
        imageUrl: '../ringtone/call.gif',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Answer'
        }).then((result) => {
            if (result.value) {
                isVideoRequest = true;
                showClientVideoContent(true);          
            } else {
                socket.emit("call_busy_disconnect", room, "THANOS");
            }
            console.log('ignore call....');
            ringtone.stop();    
        });
});

let showClientVideoContent = () => {
    if ($("#v_window").hasClass('invisible')) {
        $("#v_window").removeClass('invisible');
        console.log('test_call before');
        //socket.emit("test_call", room, "THANOS");
        startVideo();     
    }
};



socket.on('start_audio', () => {
    ringtone.play();
    Swal.fire({
        title: '',
        text: "Agent Calling you",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Receive'
        }).then((result) => {
            if (result.value) {
                isAudioRequest = true;
                showClientAudioContent();
            } else {
                socket.emit("call_busy_disconnect", room, "THANOS");
            }
            console.log('ignore call....');
            ringtone.stop();
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

//$(document).ready(function(){
let ringtone = new Howl({
        src: ["../ringtone/ringtone.mp3"],
        //autoplay: true,
        loop: true,
        volume: 1,
        onend: function() {
            console.log("Finished!");
        }
    });
//})



// let ringtone = () => {
//     return new Howl({
//         src: ['../ringtone/ringtone.mp3'],
//         //autoplay: true,
//         loop: true,
//         volume: 1,
//         onend: function() {
//             console.log('Finished!');
//         }
//     });
// };


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
