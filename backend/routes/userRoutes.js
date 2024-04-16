const express = require('express');
const router = express.Router();

const authorizeJWT = require('../middleware/authorizeJWT');
const { getUsersForSideBar, getSpecificUserForSidebar, getUserDetails } = require('../controller/userController');

router.get('/', authorizeJWT, getUsersForSideBar);
router.get('/userDetails',authorizeJWT, getUserDetails);
router.get('/:searchUserName', authorizeJWT, getSpecificUserForSidebar);
//route to get users
//we are using authorizeJWT to make sure it is a valid user and to verify the JWT token if present

module.exports = router;