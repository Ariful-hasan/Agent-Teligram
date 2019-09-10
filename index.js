const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const ejsLayouts = require('express-ejs-layouts');
const flash = require('connect-flash-plus');
const passport = require('passport');

const dbkey = require('./util/credentials').mongoKey;


const socketIO = require('socket.io');
const io = socketIO(server);
require('./socket/chat-engine')(app, io);
require('./util/passport')(passport);

const chatRoute = require('./routes/chatRoute');
const loginRoute = require('./routes/loginRoute');
const logoutRoute = require('./routes/logoutRoute');


app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.set('views', 'views');
/**
 * !io is declared as Global.
 * !if needed then use.
 */
app.set('socketio', io);

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session ({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
app.use(flash());

//*Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


/**
 * *Global Variables
 */
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});



/**
 * !This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
 * !This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
 */
// app.use((req, res, next) => {
//     if (req.cookies.user_sid && !req.session.user) {
//         res.clearCookie('user_sid');        
//     }
//     next();
// });

/**
 * *middleware function to check for logged-in users
 */
// let sessionChecker = (req, res, next) => {
//     if (req.session.user && req.cookies.user_sid) {
//         // res.redirect('/chat');
//         next();
//     } else {
//         //next();
//         res.redirect('/login');
//     }    
// };


app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/chat',  chatRoute);


mongoose.connect(dbkey, {useNewUrlParser: true})
.then( client => {
    console.log('mongoose connected!!');
})
.catch(err => {
    console.log(err); 
});

server.listen(4444, ()=> {
    console.log('server listen on port 4444!');
})