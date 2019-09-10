const passport = require('passport');

exports.getLogin = (req, res, next) => {
    data = {}
    data.pageTitle = "Login";
    data.errors = [];
    res.render('login-form', {data: data});
}

exports.postLogin = (req, res, next) => {
    /**
     * *working on Anonymous Login.
     */
    passport.authenticate('local', {
        successRedirect: '/chat',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
}

exports.getLogout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
}