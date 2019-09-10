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
   console.log(req.body.email);
    passport.authenticate('local', {
        successRedirect: '/chat',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
}

exports.getLogout = (req, res) => {
    // if (req.session.user && req.cookies.user_sid) {
    //     res.clearCookie('user_sid');
    //     res.redirect('/login');
    //     console.log('user exists....');
    // } else {
    //     console.log('user not exists....');
    //     res.redirect('/login');
    // }


    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
}