
exports.chatGet = (req, res, next)=>{
    data = {}
    data.pageTitle = "Chat";
    data.errors = [];

    let userid = req.user;
    console.log('it is called....');
    console.log(userid);
    res.render('chat-form', {userid: userid, data: data});
}

exports.chatPost = (req, res, next)=> {
    let userid = req.session.user;
    //next();
    res.render('chat-form', {userid: userid});  
}