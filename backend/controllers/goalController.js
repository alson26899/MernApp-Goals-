const asyncHandler = require('express-async-handler');
const statusCode = require('../enums/statusCode');
const Goal = require('../model/goalModel');
// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async( req, res ) => {
    const goals = await Goal.find();
    res.status(statusCode.SUCCESS).json(goals);
})

// @desc Create goals
// @route POST /api/goals
// @access Private
const createGoal = asyncHandler(async(req,res)=> {
    
    if(!req.body.text){
        res.status(statusCode.BAD_REQUEST)
        throw new Error('Please add the text valid')
    }
    const goal = await Goal.create({ text:  req.body.text});
    res.status(statusCode.CREATED).json(goal)
})

// @desc Update goal based on id
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async(req,res)=>{
    const goal = await Goal.findById(req.params.id);
    if(!goal){
        res.status(statusCode.BAD_REQUEST);
        throw new Error('Goal doesn\'t exists')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{ new : true})
    res.status(statusCode.SUCCESS).json(updatedGoal)
})

// @desc Delete goal based on id
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async(req,res)=>{
    const goal = await Goal.findById(req.params.id);
    if(!goal){
        res.status(statusCode.BAD_REQUEST);
        throw new Error('Goal doesn\'t exists')
    }
    const filter = { _id: req.params.id};
    await Goal.deleteOne(filter)
    res.status(statusCode.SUCCESS).json({id: req.params.id})
})

module.exports = {  
    getGoals,
    createGoal, 
    updateGoal, 
    deleteGoal 
}