const express = require('express');
const path = require('path');
const app = express();
// const server = require('http').createServer(app);

const fs = require('fs');
const options = {
    key: fs.readFileSync('./key.pem', 'utf8').toString(), 
    cert: fs.readFileSync('./server.crt', 'utf8').toString() 
}
const server = require('https').createServer(options, app);


const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const ejsLayouts = require('express-ejs-layouts');
const flash = require('connect-flash-plus');
const passport = require('passport');
const dbkey = require('./util/credentials').mongoKey;
const masterRoute = require('./routes/masterRoute');
const socketIO = require('socket.io');
const io = socketIO(server);
require('./socket/chat-engine')(app, io);
require('./util/passport')(passport);



/**
 * !io is declared as Global.
 * !if needed then use.
 */
app.set('socketio', io);

app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session ({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: true,
    saveUninitialized: true,
    // cookie: {
    //     expires: 600000
    // }
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

//* Prevent back button show previous page after logout.
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});

/**
 ** All routes
 */
app.use('/', masterRoute);
app.use('/', (req, res)=> {
    let data = {};
    data.pageTitle = "page not found";
    res.render('404', {data: data});
});


//* Database connection
mongoose.connect(dbkey, {useNewUrlParser: true})
.then( client => {
    if (client)
    console.log('mongoose connected!!');
    else 
    console.log('mongoose not connected!!');
    
})
.catch(err => {
    console.log('mongo not connected!!!!'); 
    console.log(err); 
});

server.listen(4444, ()=> {
    console.log('server listen on port 4444!');
})