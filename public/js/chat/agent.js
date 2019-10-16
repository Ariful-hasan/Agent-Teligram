function setChatWindos(element){
    room = $(element).attr('id');
    socket.emit('agent_connect', room, user.name);
    $("#msg_list").empty();
    
    if (isMsgFormSet==false){
        setMsgForm($("#chat_window").height()-220);
    }

    $.ajax({
        dataType    : "JSON",
        type        : "POST",
        url         : "/chat/chat-history/"+room,
        success     : function(res) {
            if (typeof res.response !== 'undefined' && Object.keys(res.response).length > 0) {
                console.log(res.response);
                res.response.forEach(element => {
                    appendMsg(element);
                });
            }
        }
    });
} 

let setLoggedUser = (data) => {
    $("#logged_users").empty();
    if (typeof data !== 'undefined' && data !== null){
        for (let key in data){
            if ($("#"+key).length == 0){
                let div = '<div class="col-12 pl-0 pr-0 cursor" id="'+key+'" onclick="setChatWindos(this)">';
                div += '<div class="col-10 pl-0 pr-0"><span><i class="fa fa-user-circle-o text-success" aria-hidden="true"></i></span> '+data[key]+'</div>';
                div += '</div>';
                $("#logged_users").append(div);
            }
        }
    }
};