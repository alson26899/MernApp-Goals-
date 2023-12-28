const asyncHandler = require('express-async-handler');
const statusCode = require('../enums/statusCode')

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async( req, res ) => {
    res.status(statusCode.SUCCESS).json({message: 'get goals!'});
})

// @desc Create goals
// @route POST /api/goals
// @access Private
const createGoal = asyncHandler(async(req,res)=> {
    if(!req.body.text){
        res.status(statusCode.BAD_REQUEST)
        throw new Error('Please add the text valid')
    }
    res.status(statusCode.CREATED).json({message: 'set goals!'})
})

// @desc Update goal based on id
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async(req,res)=>{
    res.status(statusCode.SUCCESS).json({message: `update goal! ${req.params.id}`})
})

// @desc Delete goal based on id
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async(req,res)=>{
    res.status(statusCode.SUCCESS).json({message: `delete goal! ${req.params.id}`})
})

module.exports = {  
    getGoals,
    createGoal, 
    updateGoal, 
    deleteGoal 
}