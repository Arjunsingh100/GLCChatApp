const express = require('express');
const { registerController, loginController, getAllUsers,logout } = require('../contollers/authControllers');
const router = express.Router();


router.post('/register',registerController);
router.post('/login',loginController);
router.get('/getUsers/:id',getAllUsers);
router.get('/logout/:id',logout)


module.exports=router;