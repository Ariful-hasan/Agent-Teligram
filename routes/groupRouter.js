const express = require('express');
const router = express.Router();
const path = require('path');

router.use("/", (req, res, next) => {
    //res.render(path.join(__dirname))
    console.log('group chat ....');
    next();
});

module.exports = router;