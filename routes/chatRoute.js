const path = require('path');
const express = require('express'); 
const router = express.Router();
const {ensureAuthenticated} = require('../util/auth');
const chatController = require('../controllers/chatController');

router.get('/', ensureAuthenticated, chatController.index);
router.post('/chat-history/:uid', ensureAuthenticated, chatController.clientChatHistory);
router.use('/chat-agent/', ensureAuthenticated, chatController.chatAgent);

module.exports = router;
