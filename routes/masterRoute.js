const express = require('express');
const router = express.Router();
const { forwardAuthenticated } = require('../util/auth');
const loginController = require('../controllers/loginController');

router.use('/login', require('./loginRoute'));
router.use('/logout', require('./logoutRoute'));
router.use('/chat',  require('./chatRoute'));
router.use('/agent',  require('./agentLoginRoute'));
router.use('/', forwardAuthenticated, loginController.getLogin);

module.exports = router;