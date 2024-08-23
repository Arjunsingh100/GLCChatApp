const express = require('express');
const { messagesController, getAllMessages } = require('../contollers/messagesController');
const router = express.Router();

router.post('/createMessages',messagesController);
router.post('/getAllMessages',getAllMessages);

module.exports=router;