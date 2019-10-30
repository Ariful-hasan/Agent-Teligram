let isMsgFormSet = false;
let typing = false;
let isVideoRequest = false;
let isAudioRequest = false;
const video = document.querySelector('video');
let socket = io();


socket.on('chat_message', (user) => {
    appendMsg(user);
});


socket.on('close_media_window', () => {
    Swal.fire({
        type: 'error',
        title: '',
        text: 'Call Disconnected!',
        footer: ''
      })
    $("#v_window").addClass('invisible');
});

socket.on('typing', (data) => {
    if (data){
        $("#typing").html(data);
    } else {
        $("#typing").html('');
    }
}); 

// socket.on('open_video_answer_window', () => {
//     Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         type: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!'
//       }).then((result) => {
//           console.log(result);
//         if (result.value) {
//             socket.on('proceed_video_call', room);
//         }
//       })
// });



// socket.on('show_disconnect_btn', () => {
//     console.log('enable button is called....');
//     let button = '<button type="button" class="btn btn-danger btn-vdo-close" onclick="mediaDisconnect()" >Call End</button>';
//     $("#self_camera").append(button);
// });


let sendMsg = () => {
    $('#send').click(function (e) {
        user.body = $('#message').val();
        if (typeof user.body === 'undefined' || user.body == ""){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'No text in the message box!',
            });
        } else {
            user.date = new Date();
            appendMsg(user);
            socket.emit('send_chat_message', room, user);
            socket.emit("typing", room, "");
            $('#message').val('');
        }
        return false;
    });
};


let sendTypingMsg = () => {
    $("#message").keyup(function(e){
        e.preventDefault();
        if ($(this).val() == ""){
            socket.emit("typing", room, "");
            typing = false;
        } else {
            if (!typing){
                socket.emit("typing", room, "typing...");
                typing = true;
            }
        }
    });
};

let sendDisconnect = (room) => {
    socket.emit('disconnect_chat',room);
};

let appendMsg = (element) => {
    let txt_algn = user.userid==element.userid ? "true" : "";
    let name_ary= element.name.split(" ");
    let nick = name_ary[0][0] + name_ary[1][0];

    let now = new Date();
    let utc_date = new Date(element.date);
    let server_date = utc_date.getFullYear()+":"+utc_date.getMonth()+":"+utc_date.getDate();         
    let local_date = now.getFullYear()+":"+now.getMonth()+":"+now.getDate();
    element.date = server_date == local_date ? utc_date.getHours()+":"+utc_date.getMinutes()+":"+utc_date.getSeconds() : server_date+" "+utc_date.getHours()+":"+utc_date.getMinutes()+":"+utc_date.getSeconds();
    
    let msgbox = '';
    if (txt_algn) {
        msgbox = '<div class="card bg-light-gray mb-2" id="'+element._id+'">';
        msgbox += '<div class="card-body">';
        msgbox += '<div class="row inline">';
        msgbox += '<div class="col-11 text-right">';
        msgbox += element.body;
        msgbox += '<small class="form-text text-muted mb-0">'+element.date+'</small>';
        msgbox += '</div>';
        msgbox += '<div class="col-1 text-right">';
        msgbox += '<div class="name bg-secondary text-white mtn-1">';
        msgbox += nick;
        msgbox += '</div>';
        msgbox += '</div>';
        msgbox += '</div>';
        msgbox += '</div>';
    } else {
        msgbox = '<div class="card bg-dark-gray other mb-1" id="'+element._id+'">';
        msgbox += '<div class="card-body">';
        msgbox += '<div class="row">';
        msgbox += '<div class="col-1 text-left">';
        msgbox += '<div class="name bg-info text-white">';
        msgbox += nick;
        msgbox += '</div>';
        msgbox += '</div>';
        msgbox += '<div class="col-11 text-left">';
        msgbox += element.body;
        msgbox += '<small class="form-text text-muted mb-0">'+element.date+'</small>';
        msgbox += '</div>';
        msgbox += '</div>';
        msgbox += '</div>';
    }  
    $("#msg_list").append(msgbox);  
    $("#msg_list").scrollTop($("#msg_list").prop('scrollHeight'));
};

let setMsgForm = (height) => {
    let html = "";
    html += '<div class="col-md-12 msg-field p-0">';
    html += '<form action="" method="POST">';
    html += '<small class="form-text text-muted text-right font-weight-bold" id="typing"></small>';
    html += '<div class="input-group mb-3">';
    html += '<textarea type="text" class="form-control" placeholder="message" aria-label="message" id="message" aria-describedby="basic-addon2"></textarea>';
    html += '<div class="input-group-append">';
    html += '<button class="btn btn-outline-info" type="button" id="send">Send</button>';
    html += '</div>';
    html += '</div>';
    html += '</form>';
    html += '</div>';
    
    $("#msg_list").height(height);
    $("#sub_chat_window").append(html);
    sendMsg();
    sendTypingMsg();
    return isMsgFormSet = true;
};

let startVideo = (vdo=true) => {
    navigator.mediaDevices.getUserMedia({ video: vdo, audio: true })
    .then(async stream => {
        await myExtFunction(stream);
        if (isVideoRequest){
            socket.emit('new_video_client', room, type);
        }
        if (!isVideoRequest && isAudioRequest){
            socket.emit('new_video_client', room, type);
        }
        video.srcObject = stream;
        video.play();
        //$("#self_camera").append(mediaButton);  //! use for won camera view
    })
    .catch(err => {
        console.log(err)
    });
}
