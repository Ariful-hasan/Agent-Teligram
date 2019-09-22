const credentials = require('../util/credentials');

exports.chatGet = (req, res, next)=>{
    data = {}
    data.pageTitle = "Chat";
    data.errors = [];
    data.chatUrl = credentials.chatUrl;
    data.userid = req.user._id;
    data.utype = req.user.type;
    data.name = req.user.name;

    req.session.user = req.user;
    // console.log(req.user);
    // console.log(data);
    // console.log(req.user.type);
    res.render('chat-form', {data: data});
}

exports.chatPost = (req, res, next)=> {
    let userid = req.session.user;
    //next();
    res.render('chat-form', {userid: userid});  
}