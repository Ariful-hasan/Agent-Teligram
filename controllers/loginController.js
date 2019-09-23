const passport = require('passport');

/**
 * Login For User
 */
exports.getLogin = (req, res, next) => {
    data = {}
    data.pageTitle = "Login";
    data.errors = [];
    data.type = "U";
    res.render('login-form', {data: data});
}
exports.postLogin = (req, res, next) => {
    /**
     * *working on Anonymous Login.
     */
    // passport.authenticate('local', {
    //     successRedirect: '/chat',
    //     failureRedirect: '/login',
    //     failureFlash: true
    // })(req, res, next);

    passport.authenticate('user-login', {
        successRedirect: '/chat',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
}


/**
 * Login for AGENT
 */
exports.getAgentLogin = (req, res, next) => {
    data = {}
    data.pageTitle = "Agent Login";
    data.errors = [];
    data.type = "A";
    res.render('login-form', {data: data});
}
exports.postAgentLogin = (req, res, next) => {
    passport.authenticate('agent-login', {
        successRedirect: '/chat',
        failureRedirect: '/agent/login',
        failureFlash: true
    })(req, res, next);
}


exports.getLogout = (req, res) => {
    let type = req.user.type;
    req.logout();
    req.flash('success_msg', 'You are logged out');
    if (type == "A")
        res.redirect('/agent/login');
    res.redirect('/login');
}