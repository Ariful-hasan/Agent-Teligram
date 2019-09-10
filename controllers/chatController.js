const credentials = require('../util/credentials');

exports.chatGet = (req, res, next)=>{
    data = {}
    data.pageTitle = "Chat";
    data.errors = [];
    data.chatUrl = credentials.chatUrl;

    let userid = req.user;
    // console.log('it is called....');
    // console.log(userid);
    res.render('chat-form', {userid: userid, data: data});
}

exports.chatPost = (req, res, next)=> {
    let userid = req.session.user;
    //next();
    res.render('chat-form', {userid: userid});  
}