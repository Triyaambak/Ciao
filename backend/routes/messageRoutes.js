const express = require('express');
const router = express.Router();

const authorizeJWT = require('../middleware/authorizeJWT');
const { sendMessage, getMessages } = require('../controller/messageController');

router.post('/send/:id', authorizeJWT , sendMessage);
router.get('/:id', authorizeJWT, getMessages);
//We are using authorizeJWT as our middleware since we need to make sure the user is logged in before sending any message and to authorize the cookie token

module.exports = router;