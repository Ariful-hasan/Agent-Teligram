const Peer = require('simple-peer');
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

function CreateVideo(stream) {
    //CreateDiv()

    let video = document.createElement('video');
    video.id = 'peerVideo';
    video.srcObject = stream;
    video.setAttribute('class', 'embed-responsive-item');
    document.querySelector('#peerDiv').appendChild(video);
    console.log(video);
    video.play();
    
    //wait for 1 sec
    //setTimeout(() => SendFilter(currentFilter), 1000)

    // video.addEventListener('click', () => {
    //     if (video.volume != 0)
    //         video.volume = 0
    //     else
    //         video.volume = 1
    // })
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

// function mediaClose() {
//     client.peer.on('close', () => {
//         console.log('peer is destroyed....');
//     });
// }

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
}

