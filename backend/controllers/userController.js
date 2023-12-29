const asyncHandler = require('express-async-handler');
const statusCode = require('../enums/statusCode');
const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/jwtHelper');

// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async(req,res)=>{
    const { name , email, password } = req.body;

    //Check for invalid user data
    if( !name || ! email || !password){
        res.status(statusCode.BAD_REQUEST);
        throw new Error('Please add all the fields')
    }

    //Check if user exists
    const userExists = await User.findOne({email});

    if(userExists){
        res.status(statusCode.BAD_REQUEST);
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await  bcrypt.hash(password,salt);

    //Create user
    const user = await User.create({
        name,
        email,
        password:hashedPassword
    });

    if(user){
        res.status(statusCode.CREATED).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    }else{
        res.status(statusCode.BAD_REQUEST);
        throw new Error('Invalid user data');
    }

})

// @desc Login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async(req,res)=>{
    const { email, password } = req.body;
    
    //check for user exists
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(statusCode.SUCCESS).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    }
    else{
        res.status(statusCode.BAD_REQUEST);
        throw new Error('Invalid user credentials');
    }
})

// @desc Get user data
// @route GET /api/users/currUser
// @access Private
const getUserData = asyncHandler(async(req,res)=>{
    const { _id,name,email } = await User.findById(req.user.id);
    res.status(statusCode.SUCCESS).json({
        name,
        email,
        id: _id
    })
})

module.exports = {
    registerUser,
    loginUser,
    getUserData
}