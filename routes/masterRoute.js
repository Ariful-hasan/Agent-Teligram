const express = require('express');
const router = express.Router();

router.use('/login', require('./loginRoute'));
router.use('/logout', require('./logoutRoute'));
router.use('/chat',  require('./chatRoute'));
router.use('/agent',  require('./agentLoginRoute'));

module.exports = router;