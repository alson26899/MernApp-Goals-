const express = require('express');
const router = express.Router();
const { protect }= require('../middleware/authMiddleware');
const { 
    registerUser,
    loginUser,
    getUserData 
} = require('../controllers/userController');

router.route('/').post(registerUser);
router.route('/login').post(loginUser);
router.route('/currUser').get(protect, getUserData);


module.exports = router;