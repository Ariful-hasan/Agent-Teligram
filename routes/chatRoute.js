const path = require('path');
const express = require('express'); 
const router = express.Router();
const {ensureAuthenticated} = require('../util/auth');
const chatController = require('../controllers/chatController');

router.get('/', ensureAuthenticated, chatController.chatGet);
// router.post('/login', chatController.chatPost);

module.exports = router;
