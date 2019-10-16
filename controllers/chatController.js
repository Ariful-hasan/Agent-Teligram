const credentials = require('../util/credentials');
const uuidv5 = require('uuid/v5');
const OnlineUsers = require('../models/onlineuserModel');
const Chat = require('../models/chatModel');

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
    data.onlineusers = [];
    return data;
}

/**
 * For User
 */
exports.chatUser = (req, res, next)=>{
    let now = new Date();
    let data = exports.getUserData(req, res);

    req.session.user = req.user;
    // req.session.chat_id = req.session.chat_id || uuidv5(req.user._id + now.getMilliseconds, credentials.uuid_namespace);
    req.session.room_id = req.session.user._id;
    
    data.pageTitle = "Chat";
    data.chat_id = req.session.chat_id;
    
    //console.log(data);
    res.render('chat-form', {data: data});
}

/**
 * For Agent
 */
exports.chatAgent =  async (req, res, next) => {
    let data = exports.getUserData(req, res);
    req.session.user = req.user;
    
    let onlineusers= await OnlineUsers.find()
    .then((ousers, err) => {
      let ou = new Array();
      if (ousers)  {
          ousers.forEach(element => {
            let obj = {
                id: element.userid,
                name: element.name
            }
            ou.push(obj);
          });
          return ou;
      }
    })
    .catch(err => console.log(err));

    data.onlineusers = onlineusers;
    data.pageTitle = "Chat";
    //console.log(data.onlineusers);
    res.render('chat-form', {data: data});
}

exports.chatPost = (req, res, next)=> {
    let userid = req.session.user;
    //next();
    res.render('chat-form', {userid: userid});  
}

exports.clientChatHistory = async (req, res, next) => {
    console.log(req.params.uid);
    let chat_id = req.params.uid;
    let response = await Chat.find(
        {"chat_id": chat_id}
    )
    .then(messages => {
        let result = [];
        if (messages){
            messages.forEach(message => {
                let obj = {};
                //obj.date = message.date.toISOString().replace(/T/, ' ').replace(/\..+/, '');;
                obj.date = message.date;
                obj.name = message.name;
                obj.userid = message.userid;
                obj._id = message._id;
                obj.chat_id = message.chat_id;
                obj.body = message.body;
                result.push(obj);
            })
        }
        return result;
    })
    .catch(err => console.log(err));
    //console.log(response);
    res.json({response});
    // process.exit;
}