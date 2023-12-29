const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
const statusCode = require('../enums/statusCode');

const protect = asyncHandler(async(req,res,next) =>{
    let token;
    if(req.headers.authorization?.startsWith('Bearer')){
        try {
            //Get token from header
            token = req.headers.authorization.split(' ')[1];

            //Verify the token
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from the token
            req.user = await User.findById(decodedToken.id).select('-password');

            next();
        } catch (error) {
            console.log(error);
            res.status(statusCode.NOT_AUTHORIZED);
            throw new Error('Not authorised');
        }
    }

    if(!token){
        res.status(statusCode.NOT_AUTHORIZED);
        throw new Error('Not authorised no token');
    }
})

module.exports = {protect}