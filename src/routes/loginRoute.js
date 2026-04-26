const express = require('express');
const router = express.Router();
const { forwardAuthenticated } = require('../middlewares/auth');
const loginController = require('../controllers/loginController');

router.get('/', forwardAuthenticated, loginController.getLogin);
// router.get('/agent/', forwardAuthenticated, loginController.getAgentLogin);
router.post('/', loginController.postLogin);

module.exports = router;