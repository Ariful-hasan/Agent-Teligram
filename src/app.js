const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const ejsLayouts = require('express-ejs-layouts');
const flash = require('connect-flash-plus');
const passport = require('passport');
const path = require('path');
const masterRoute = require('./routes/masterRoute');

const app = express();

/**
 * Passport Configuration
 */
require('./config/passport')(passport);

app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session ({
    key: 'user_sid',
    secret: process.env.SESSION_SECRET || 'somerandonstuffs',
    resave: true,
    saveUninitialized: true
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

// 404 handler
app.use((req, res)=> {
    let data = {};
    data.pageTitle = "page not found";
    res.render('404', {data: data});
});

module.exports = app;
