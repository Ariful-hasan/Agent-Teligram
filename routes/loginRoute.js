const express = require('express');
const router = express.Router();
const { forwardAuthenticated } = require('../util/auth');
const loginController = require('../controllers/loginController');

router.get('/', forwardAuthenticated, loginController.getLogin);
// router.get('/agent/', forwardAuthenticated, loginController.getAgentLogin);
router.post('/', loginController.postLogin);

module.exports = router;