const Peer = require('simple-peer');
const Howl = require('howler');
const video = document.querySelector('video');
let client = {};
let stream = 'ami jomidar';
let user_video = '';

socket.on('CreatePeer', MakePeer);
socket.on('BackOffer', FrontAnswer);
socket.on('BackAnswer', SignalAnswer);

function error(Peer) {
    Peer.on('error', err => {
        console.log(err);
    });
}

function InitPeer(type) {
    console.log('call from titans...');
    console.log(stream);
    let peer = new Peer({ initiator: (type == 'init') ? true : false, stream: stream, trickle: false });
    
    peer.on('stream', function (stream) {
        console.log('Create video stream called....');
        CreateVideo(stream);
    });
    
    // peer.on('data', function (data) {
    //     let decodedData = new TextDecoder('utf-8').decode(data)
    //     let peervideo = document.querySelector('#peerVideo')  
    //     peervideo.style.filter = decodedData
    // });

    peer.on('close', () => {
        console.log('peer is closed....');
        socket.emit('media_closed', room);
        clearPeerVideo();
    });
    
    //console.log(peer);
    return peer
}

function MakePeer(type) {
    console.log('Make RTC Peer...');
    console.log(type);
    if (type == "U"){
        client.gotAnswer = false
        let peer = InitPeer('init');
        peer.on('signal', (data) => {
            if (!client.gotAnswer) {
                console.log('Call MakePeer...');
                socket.emit('Offer', room, data);
            }
        });
        error(peer);
        return client.peer = peer
    }
   return false; 
}

function FrontAnswer(offer) {
    socket.emit('ready_client', room);
    let peer = InitPeer('notInit');
    console.log('Back offer');
    
    peer.on('signal', (data) => {
        console.log('Back offer Signal...');
        socket.emit('Answer', room, data);
    });
    peer.signal(offer);
    error(peer);
    return client.peer = peer;
}
function SignalAnswer(answer) {
    console.log('backanswer called.....');
    console.log(stream);
    client.gotAnswer = true;
    let peer = client.peer;
    peer.signal(answer);
}

async function CreateVideo(stream) {
    await user_video_div("v_window");

    // $("#self_video_window").addClass('col-4')
    // let video = document.getElementById("peerVideo");
    // video.srcObject = stream;
    // video.play();
    // $("#peerDiv").append(mediaButton); //! use for user-camera view
    // user_video = video;

    //!! its working one...
    socket.emit('stop_ringtone', room);
    $("#self_video_window").addClass('col-4');
    let video = document.createElement('video');
    video.id = 'peerVideo';
    video.srcObject = stream;
    video.setAttribute('class', 'embed-responsive-item');
    document.querySelector('#peerDiv').appendChild(video);
    video.play();
    $("#peerDiv").append(mediaButton); //! use for user-camera view
    user_video = video;
}

function mediaDisconnect() {
    client.peer.destroy();
    console.log('peer is destroyed....');
}

function mediaMute() {
    console.log('user video data');
    console.log(user_video);
    try{
        if (user_video.volume != 0){
            user_video.volume = 0;
        } else {
            user_video.volume = 1;
        }
    } catch (e){
        console.log(e);
    }
}

let mediaButton = () => {
    let media_btn = '<div class="btn-group btn-group-sm p-5" role="group">';
    media_btn += '<button type="button" class="btn btn-danger btn-vdo-close" onclick="mediaDisconnect()" >Call End</button>';
    media_btn += '<button type="button" class="btn btn-secondary" onclick="mediaMute()" ><i class="fa fa-microphone-slash" aria-hidden="true"></i></button>';
    media_btn += '</div>';
    return media_btn;
}

let user_video_div = (apendElement) => {
    let html = '';
    html += '<div class="card" id="user_video_window">';
    html += '<div class="card-body p-0">';
    html += '<div class="col-12 d-flex justify-content-center p-0">';
    html += '<div id="peerDiv" class="embed-responsive embed-responsive-16by9 p-0">';
    //html += '<video id="peerVideo" class="embed-responsive-item"></video>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    $("#"+apendElement).append(html);
};

let clearPeerVideo = () => {
    $("#user_video_window").remove();
};

if (typeof window !== 'undefined') {
    window.myExtFunction = function(videostream) {
        stream = videostream;
    }

    window.mediaDisconnect = function () {
        return mediaDisconnect();
    }

    window.mediaMute = function () {
        return mediaMute();
    }

    window.mediaButton = function () {
        return mediaButton();
    }

    // window.ringtone = function () {
    //     return ringtone;
    // }
}

