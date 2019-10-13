const path = require('path');
const express = require('express'); 
const router = express.Router();
const {ensureAuthenticated} = require('../util/auth');
const chatController = require('../controllers/chatController');

router.get('/', ensureAuthenticated, chatController.index);
router.post('/chat-history/:uid', ensureAuthenticated, chatController.clientChatHistory);
// router.post('/chat-history/:uid', ensureAuthenticated, ()=> { console.log('it is called!!!!!!')});

module.exports = router;
