// Import dependencies / Node.js modules.
const express = require('express');
const router = express.Router();

// Link API files.
//const APIlogin = require('./APIlogin');
const APIusers = require('./APIusers');
const APIprogress = require('./APIprogress');
const APItodo = require('./APItodo');
const APItimeblock = require('./APItimeblock');
const APItimers = require('./APItimers');

// Route API files.
//router.use('/login', APIlogin);
router.use('/users', APIusers);
router.use('/progress', APIprogress);
router.use('/todo', APItodo);
router.use('/timeblock', APItimeblock);
router.use('/timers', APItimers);

// Export our router for our app to mount.
module.exports = router;