const credentials = require('../util/credentials');
const uuidv5 = require('uuid/v5');

exports.index = (req, res, next) => {
    if (req.user.type == "A")
        return exports.chatAgent(req, res, next);
    return exports.chatUser(req, res, next);
}

exports.getUserData = (req, res) => {
    let data = {};
    data.pageTitle = "";
    data.errors = [];
    data.chatUrl = credentials.chatUrl;
    data.userid = req.user._id;
    data.type = req.user.type;
    data.name = req.user.name;
    return data;
}

/**
 * For User
 */
exports.chatUser = (req, res, next)=>{
    let now = new Date();
    let data = exports.getUserData(req, res);

    req.session.user = req.user;
    req.session.chat_id = req.session.chat_id || uuidv5(req.user._id + now.getMilliseconds, credentials.uuid_namespace);
    
    data.pageTitle = "Chat";
    data.chat_id = req.session.chat_id;
    
    console.log(data);
    res.render('chat-form', {data: data});
}

/**
 * For Agent
 */
exports.chatAgent = (req, res, next) => {
    let data = exports.getUserData(req, res);
    req.session.user = req.user;
    data.pageTitle = "Chat";
    res.render('chat-form', {data: data});
}

exports.chatPost = (req, res, next)=> {
    let userid = req.session.user;
    //next();
    res.render('chat-form', {userid: userid});  
}