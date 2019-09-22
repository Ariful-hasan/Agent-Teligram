const express = require('express');
const router = express.Router();
const { forwardAuthenticated } = require('../util/auth');
const loginController = require('../controllers/loginController');

router.get('/login', forwardAuthenticated, loginController.getAgentLogin);
router.post('/login', loginController.postAgentLogin);

module.exports = router;